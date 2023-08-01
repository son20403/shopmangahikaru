import BookService from "../../services/BookService/index.js";
import CategoryService from "../../services/CategoryService/index.js";
import API from "../../config/API.js";
import UrlHelper from "../services/UrlHelper.js";
import Cookie from "../services/Cookies.js";
import createItemListProd from "../services/CreateListProduct.js";
import Toast from "../services/Toast.js";
import { addCart } from "../services/addCart.js";

const bookService = new BookService(API);
const categoryService = new CategoryService(API);
const token = Cookie.getCookie("token");
const id = new UrlHelper().readParam(location.href, "id");
const MaxNumberDefault = 9999999999999;
const MinNumberDefault = 0;
const CategoryDefault = "";
let min = 0;
let max = 0;
let cate = "";
let perPage = 4;
let currentPage = 1;
let start = 0;
let end = perPage;
let totalPages;
const listProduct = document.querySelector("#listProduct");
const Loading = document.querySelector("#Loading");
const Pages = document.querySelector("#Pages");
const listPage = document.querySelector("#listPages");
const btnNext = document.querySelector("li[name='BtnNext']");
const btnPrev = document.querySelector("li[name='BtnPrev']");
document.querySelector("#shop").classList.add("active");
window.addEventListener("DOMContentLoaded", async() => {
    Loading.classList.add("show");
    try {
        const dataCate = await categoryService.view(token);
        if (dataCate) {
            let number = 1;
            dataCate.forEach((cate) => {
                ListFilterCate(cate, number);
                number++;
            });
        }

        if (id) {
            cate = id;
            filterProd(min, max, cate);
        } else {
            filterProd(min, max, cate);
        }

        const formFilterPrice = document.querySelectorAll(
            "input[name='filterPrice']"
        );
        const formFilterCate = document.querySelectorAll(
            "input[name='filterCate']"
        );

        formFilterPrice.forEach((filter) => {
            filter.addEventListener("change", () => {
                [min, max] = filter.value.split(",").map(Number) || [
                    MinNumberDefault,
                    MaxNumberDefault,
                ];
                resertPage();
                filterProd(min, max, cate);
            });
        });

        formFilterCate.forEach((filter) => {
            filter.addEventListener("change", () => {
                cate = filter.value || CategoryDefault;
                resertPage();
                filterProd(min, max, cate);
            });
        });

        btnNext.addEventListener("click", async() => {
            btnPrev.classList.remove("disabled");
            currentPage++;
            if (currentPage >= totalPages) {
                currentPage = totalPages;
            }
            $(`#listPages li`).removeClass("active");
            $(`#listPages li:eq(${currentPage - 1})`).addClass("active");
            getCurrentPages(currentPage, totalPages);
            renderProd();
        });

        btnPrev.addEventListener("click", async() => {
            btnNext.classList.remove("disabled");
            currentPage--;
            if (currentPage <= 1) {
                currentPage = 1;
            }
            $(`#listPages li`).removeClass("active");
            $(`#listPages li:eq(${currentPage - 1})`).addClass("active");
            getCurrentPages(currentPage);
            renderProd();
        });
    } catch (error) {
        console.log(error);
    }

    Loading.classList.remove("show");
});

async function filterProd(min, max, cate) {
    Loading.classList.add("show");
    const dataProd = await bookService.filter(token, min, max, cate);
    const dataLength = dataProd.length;

    if (dataLength > 0) {
        Pages.classList.remove("d-none");
        totalPages = Math.ceil(dataLength / perPage);
        renderListPages();
        changeListPages();

        if (totalPages == 1) {
            btnNext.classList.add("d-none");
            btnPrev.classList.add("d-none");
        } else {
            btnNext.classList.remove("d-none");
            btnPrev.classList.remove("d-none");
        }

        renderProd();
    } else {
        Pages.classList.add("d-none");
        listProduct.innerHTML = "";
        listProduct.insertAdjacentHTML(
            "beforeend",
            `<h1 class="text-center">Không có sản phẩm</h1>`
        );
    }

    Loading.classList.remove("show");
}

async function renderProd() {
    const dataProd = await bookService.filter(token, min, max, cate);
    listProduct.innerHTML = "";
    const bookReverse = [...dataProd].reverse();
    bookReverse.forEach((item, index) => {
        if (index >= start && index < end) {
            createItemListProd(item, "#listProduct");
        }
    });
    const btnAddCarts = document.querySelectorAll("a[name='addCart']");
    addCart(btnAddCarts);
}

function ListFilterCate(item, number) {
    document.querySelector("#filterByCategory").insertAdjacentHTML(
        "beforeend",
        `
    <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
        <input type="radio" value="${item._id}" name="filterCate" class="custom-control-input" id="cate-${number}">
        <label class="custom-control-label" for="cate-${number}">${item.name}</label>
    </div>
    `
    );
}

function renderListPages() {
    listPage.innerHTML = "";
    let template = `<li class="page-item active ml-1" data-value="${1}"><a class="page-link">${1}</a></li>`;
    for (let i = 2; i <= totalPages; i++) {
        template += `<li class="page-item" data-value="${i}"><a class="page-link">${i}</a></li>`;
    }
    listPage.insertAdjacentHTML("beforeend", template);
}

function getCurrentPages(currentPage, totalPages) {
    if (currentPage <= 1) {
        btnPrev.classList.add("disabled");
    } else {
        btnPrev.classList.remove("disabled");
    }

    if (currentPage >= totalPages) {
        btnNext.classList.add("disabled");
    } else {
        btnNext.classList.remove("disabled");
    }

    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
}

function changeListPages() {
    const listPages = $("#listPages li");

    listPages.click(async(e) => {
        const valuePage = $(e.currentTarget).attr("data-value");
        $(`#listPages li`).removeClass("active");
        $(e.currentTarget).addClass("active");
        currentPage = valuePage;
        getCurrentPages(currentPage, totalPages);
        renderProd();
    });
}

function resertPage() {
    perPage = 4;
    currentPage = 1;
    start = 0;
    end = perPage;
    btnNext.classList.remove("disabled");
}