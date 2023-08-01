import BookService from "../../services/BookService/index.js";
import CategoryService from "../../services/CategoryService/index.js";
import API from "../../config/API.js";
import Cookie from "../../functions/services/Cookies.js";
import Toast from "../../functions/services/Toast.js";

const bookService = new BookService(API);
const categoryService = new CategoryService(API);
let token = Cookie.getCookie("token");
window.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#product").classList.add("active", "open");
  document.querySelector("#product-add").classList.add("active");

  const Loading = document.querySelector("#Loading");
  const category = document.querySelector(".category");
  try {
    const dataCate = await categoryService.view(token);
    if (dataCate) {
      dataCate.forEach((cate) => {
        createItem(cate);
      });
    } else {
      Toast(`${dataCate.message}`, "red");
    }
  } catch (error) {
    console.error(error);
    Toast(`${error.response.data.message || "Có lỗi xảy ra"}`, "red");
  }

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
      Validator.isRequired(".image"),
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
      Loading.classList.add("show");
      try {
        const prodData = await bookService.create(product, token);
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
