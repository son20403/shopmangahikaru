import CategoryService from "../../services/CategoryService/index.js";
import UrlHelper from "../../functions/services/UrlHelper.js";
import API from "../../config/API.js";
import Cookie from "../../functions/services/Cookies.js";
import Toast from "../../functions/services/Toast.js";

window.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#category").classList.add("active", "open");
  document.querySelector("#category-list").classList.add("active");
  const id = new UrlHelper().readParam(location.href, "id");
  const name = document.querySelector(".name");
  const resultElement = document.querySelector(".preview");
  const Loading = document.querySelector("#Loading");
  let token = Cookie.getCookie("token");

  const categoryService = new CategoryService(API);
  Loading.classList.add("show");
  const dataCate = await categoryService.findById(id, token);
  name.setAttribute("value", dataCate.name);
  resultElement.insertAdjacentHTML(
    "beforeend",
    `
    <span>Ảnh củ</span>
    <img src="${dataCate.image}" class="preview-img" />`
  );
  Loading.classList.remove("show");

  Validator({
    form: "#formCreateCategory",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [Validator.isRequired(".name"), Validator.minLength(".name")],
    onSubmit: async (category) => {
      Loading.classList.add("show");
      try {
        const cateData = await categoryService.update(token, id, category);
        if (cateData) {
          Toast(`${cateData.message}`, "green");
        } else {
          Toast(`${cateData.message}`, "red");
        }
      } catch (error) {
        console.error(error);
        Toast(`${error.response.data.message}`, "red");
      }
      Loading.classList.remove("show");
    },
  });
});
