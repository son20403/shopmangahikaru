import UrlHelper from "../../functions/services/UrlHelper.js";
import BookService from "../../services/BookService/index.js";
import CategoryService from "../../services/CategoryService/index.js";
import API from "../../config/API.js";
import Cookie from "../../functions/services/Cookies.js";
import Toast from "../../functions/services/Toast.js";

const bookService = new BookService(API);
const categoryService = new CategoryService(API);
let token = Cookie.getCookie("token");
const id = new UrlHelper().readParam(location.href, "id");
window.addEventListener("DOMContentLoaded", async () => {
  const Loading = document.querySelector("#Loading");
  document.querySelector("#product").classList.add("active", "open");
  document.querySelector("#product-list").classList.add("active");
  const resultElement = document.querySelector(".preview");
  const title = document.querySelector(".title");
  const description = document.querySelector(".description");
  const quantity = document.querySelector(".quantity");
  const price = document.querySelector(".price");
  const author = document.querySelector(".author");
  const year = document.querySelector(".year");
  const category = document.querySelector(".category");
  Loading.classList.add("show");
  try {
    const dataCate = await categoryService.view(token);
    const dataProd = await bookService.findById(id, token);
    if (dataCate) {
      dataCate.forEach((cate) => {
        createItem(cate);
      });
    } else {
      Toast(`${dataCate.message}`, "red");
    }
    if (dataProd) {
      resultElement.insertAdjacentHTML(
        "beforeend",
        `<span class="badge bg-warning">Ảnh củ</span>
        <img src="${dataProd.image}" class="preview-img" />`
      );
      title.value = dataProd.title;
      description.value = dataProd.description;
      quantity.value = dataProd.quantity;
      price.value = dataProd.price;
      author.value = dataProd.author;
      year.value = dataProd.year;
      category.value = dataProd.category;
    } else {
      Toast(`${dataProd.message}`, "red");
    }
  } catch (error) {
    console.error(error);
    Toast(`${error.response.data.message || "Có lỗi xảy ra"}`, "red");
  }
  Loading.classList.remove("show");

  function createItem(item) {
    category.insertAdjacentHTML(
      "beforeend",
      `<option value="${item._id}">${item.name}</option>`
    );
  }
  Validator({
    form: "#formCreateBook",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired(".title"),
      Validator.minLength(".title"),
      Validator.isRequired(".description"),
      Validator.isRequired(".category"),
      Validator.isRequired(".quantity"),
      Validator.isNumber(".quantity"),
      Validator.isRequired(".price"),
      Validator.isNumber(".price"),
      Validator.isRequired(".author"),
      Validator.isRequired(".year"),
      Validator.isNumber(".year"),
    ],
    onSubmit: async (product) => {
      try {
        Loading.classList.add("show");
        const prodData = await bookService.update(id, token, product);
        if (prodData) {
          Toast(`${prodData.message}`, "green");
        } else {
          Toast(`${prodData.message}`, "red");
        }
      } catch (error) {
        console.error(error);
        Toast(`${error.response.data.message || "Có lỗi xảy ra"}`, "red");
      }
      Loading.classList.remove("show");
    },
  });
});
