import UrlHelper from "../services/UrlHelper.js";
import CommentService from "../../services/CommentService/index.js";
import CustomerService from "../../services/CustomerService/index.js";
import AuthService from "../../services/AuthService/index.js";
import BookService from "../../services/BookService/index.js";
import API from "../../config/API.js";
import Cookie from "../services/Cookies.js";
import getDate from "../services/GetDate.js";
import Toast from "../services/Toast.js";
import ratingCount from "../services/Rating.js";

const commentService = new CommentService(API);
const customerService = new CustomerService(API);
const bookService = new BookService(API);
const authService = new AuthService(API);

const token = Cookie.getCookie("token");
const id = new UrlHelper().readParam(location.href, "id");

const commentForm = document.querySelector("#commentForm");
const showComment = document.querySelector("#showComment");
const commentCounts = document.querySelectorAll(".commentCount");
window.addEventListener("DOMContentLoaded", async() => {
    const dataCustomer = await authService.getCustomer(token);
    const customer = dataCustomer.customer;
    commentForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        const idUser = customer.id;
        const inputRate = document.querySelector("[name='rating']:checked");
        const inputComment = document.querySelector("#commentContent").value;
        const listComments = await commentService.getById(token, id);

        if (inputRate && inputComment && id) {
            const entity = {
                rating: inputRate.value,
                content: inputComment,
                productId: id,
                dateComment: getDate(),
            };
            const isComment = await listComments.find(
                (customer) => customer.customerId == idUser
            );
            if (isComment) {
                return Toast("Bạn đã bình luận và đánh giá truyện này", "red");
            }
            let { status } = await commentService.create(token, entity);
            status && createComment();
            Toast("Cảm ơn bạn đã bình luận", "green");
        } else {
            Toast("Nhập nội dung và đánh giá trước khi bình luận", "red");
        }
    });
});
createComment();

async function createComment() {
    showComment.innerHTML = "";
    const [listComments, listCustomers] = await Promise.all([
        commentService.getById(token, id),
        customerService.view(token),
    ]);
    let rateCount = 0;
    if (listComments.length > 0) {
        listComments.reverse().forEach((comment) => {
            const { customerId, ...commentProps } = comment;
            rateCount += +commentProps.rating;
            const { name, image } =
            listCustomers.find((customer) => customer._id === customerId) || {};
            name && createCommentItem(name, image, commentProps);
        });
        const commentLength = listComments.length;
        commentCounts.forEach((item) => (item.innerHTML = commentLength));
        const averageRate = +(+rateCount / +commentLength).toFixed(3);
        await bookService.update(id, token, {
            average_score: averageRate || 0,
        });
        const rate = +ratingCount(averageRate);
        document.querySelector(".overlayDetail").style = `width: ${100 - rate}%`;
    } else {
        await bookService.update(id, token, {
            average_score: 0,
        });
        showComment.insertAdjacentHTML("beforeend", `<p>Chưa có bình luận nào</p>`);
    }
}

const createCommentItem = (
    customer,
    image, { content, rating, dateComment }
) => {
    const rate = ratingCount(rating);
    showComment.insertAdjacentHTML(
        "beforeend",
        `
    <div class="media mb-4">
        <img src="${image}"class="img-fluid mr-3 mt-1"
            style="width: 45px;">
        <div class="media-body">
            <h6>${customer}<small> - <i>${dateComment}</i></small></h6>
            <div class="d-flex align-items-center justify-content-between">
                <div class="position-relative mb-2">
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <div id="ratingSearch" class="overlay" style="width: ${
                      100 - +rate
                    }%;"></div>
                </div>
            </div>
            <p>${content}
            </p>
        </div>
    </div>
`
    );
};