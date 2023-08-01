import BookService from "../../services/BookService/index.js";
import UrlHelper from "../services/UrlHelper.js";
import API from "../../config/API.js";
import Cookie from "../services/Cookies.js";
import AuthService from "../../services/AuthService/index.js";
import { Logout, NotToken } from "../auth/logout.js";
const bookService = new BookService(API);
const authService = new AuthService(API);
const token = Cookie.getCookie("token");
if (!token) NotToken();

window.addEventListener("DOMContentLoaded", async () => {
  const dataCustomer = await authService.getCustomer(token);
  const btnLogout = document.querySelector("#btnLogout");
  const listProduct = document.querySelector("#listProduct");

  const key = new UrlHelper().readParam(location.href, "searchKeyword");
  document.querySelector("#keySearch").innerHTML = ` ${key}`;

  if (btnLogout) Logout(btnLogout);

  document.querySelector("#nameCustomer").innerHTML =
    dataCustomer.customer.username;
  try {
    const searchBooks = await bookService.search(token, key);
    if (searchBooks.length < 1)
      return (listProduct.innerHTML = `<p>Không có dữ liệu</p>`);
    searchBooks.forEach((item) => {
      createElement(item, listProduct);
    });
  } catch (error) {
    console.log(error);
  }
});

function createElement(item, element) {
  element.insertAdjacentHTML(
    "beforeend",
    `
      <div class="col-lg-3 col-sm-6">
        <div class="item">
            <a href="./details.html?id=${item._id}">
                <img src="../public/images/${item.image}" alt="">
                <h4>${item.title.substr(0, 20)}<br>
                <span>${item.author}</span></h4>
            </a>
            <ul>
                <li><i class="fa fa-star"></i> ${item.average_score}</li>
            </ul>
        </div>
      </div>`
  );
}
