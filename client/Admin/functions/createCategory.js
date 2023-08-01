import CategoryService from "../../services/CategoryService/index.js";
import API from "../../config/API.js";
import Cookie from "../../functions/services/Cookies.js";
import Toast from "../../functions/services/Toast.js";

document.querySelector("#category").classList.add("active", "open");
document.querySelector("#category-add").classList.add("active");
const categoryService = new CategoryService(API);
let token = Cookie.getCookie("token");
const Loading = document.querySelector("#Loading");
Validator({
  form: "#formCreateCategory",
  formGroupSelector: ".form-group",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired(".name"),
    Validator.isRequired(".image"),
    Validator.minLength(".name"),
  ],
  onSubmit: async (category) => {
    Loading.classList.add("show");
    try {
      const cateData = await categoryService.create(category, token);
      if (cateData) {
        Toast(`${cateData.message}`, "green");
      } else {
        Toast(`${cateData.message}`, "red");
      }
    } catch (error) {
      console.error(error);
      Toast(`${error.response.data.message || "Có lỗi xảy ra"}`, "red");
    }
    Loading.classList.remove("show");
  },
});
