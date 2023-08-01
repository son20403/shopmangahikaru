import BookService from "../../services/BookService/index.js";
import CategoryService from "../../services/CategoryService/index.js";
import API from "../../config/API.js";
import Cookie from "../services/Cookies.js";
import createItemListProd from "../services/CreateListProduct.js";
import { addCart } from "../services/addCart.js";
const bookService = new BookService(API);
const categoryService = new CategoryService(API);
const token = Cookie.getCookie("token");
window.addEventListener("DOMContentLoaded", async() => {
    document.querySelector("#home").classList.add("active");
    const Loading = document.querySelector("#Loading");
    Loading.classList.add("show");
    try {
        const books = await bookService.view(token);
        const shuffledArr = _.shuffle([...books]);
        const bookReverse = [...books].reverse();
        shuffledArr
            .slice(0, 8)
            .forEach((item) => createItemListProd(item, "#listProduct"));

        bookReverse
            .slice(0, 8)
            .forEach((item) => createItemListProd(item, "#listNewProduct"));
        const categories = await categoryService.view(token);
        if (categories) {
            categories.forEach((item) => {
                createListCate(item);
            });
        }
        const btnAddCarts = document.querySelectorAll("a[name='addCart']");
        addCart(btnAddCarts);
    } catch (error) {
        console.log(error);
    }
    Loading.classList.remove("show");

    function createListCate(item) {
        document.querySelector("#listCate").insertAdjacentHTML(
            "beforeend",
            `<div class="col-lg-4 col-md-4 col-sm-6 pb-1">
      <a class="text-decoration-none" href="shop.html?id=${item._id}">
          <div class="cat-item d-flex align-items-center mb-4">
              <div class="overflow-hidden" style="height: 100px; display:flex; padding: 10px;
              ">
                  <img class="img-fluid" src="${item.image}" alt="">
              </div>
              <div class="flex-fill pl-3">
                  <h6>${item.name}</h6>
              </div>
          </div>
      </a>
  </div>
      `
        );
    }
});