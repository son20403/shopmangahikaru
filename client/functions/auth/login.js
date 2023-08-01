import AuthService from "../../services/AuthService/index.js";
import API from "../../config/API.js";
import Cookie from "../services/Cookies.js";

const authService = new AuthService(API);
window.addEventListener("DOMContentLoaded", () => {
  let token = Cookie.getCookie("token");
  if (token) return (window.location = "../index.html");
  //Form register
  Validator({
    form: "#form-register",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired(".name"),
      Validator.isRequired(".user_name"),
      Validator.minLength(".user_name"),
      Validator.isRequired(".password"),
      Validator.minLength(".password"),
      Validator.isRequired(".password_again"),
      Validator.isConfirmed(
        ".password_again",
        function () {
          return document.querySelector("#form-register .password");
        },
        "mật khẩu đã nhập"
      ),
      Validator.isRequired(".email"),
      Validator.isEmail(".email"),
    ],
    onSubmit: (auth) => {
      register(auth);
    },
  });

  //Form Login
  Validator({
    form: "#form-login",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired(".user_name"),
      Validator.minLength(".user_name"),
      Validator.isRequired(".password"),
      Validator.minLength(".password"),
    ],
    onSubmit: (auth) => {
      login(auth);
    },
  });

  async function login(auth) {
    try {
      const customer = await authService.login(auth);
      const { accessToken } = customer;
      Cookie.setCookie("token", accessToken, "1");

      NotificationToast("SUCCESS!!!!", "Đăng nhập thành công!!!", "success");
      setTimeout(() => {
        window.location = "../index.html";
      }, 1200);
    } catch (error) {
      NotificationToast("ERROR!!!!", `${error.response.data.message}`, "error");
    }
  }

  async function register(auth) {
    try {
      const dataAuth = await authService.register(auth);
      if (!dataAuth) {
        return NotificationToast("ERROR!!!!", `${dataAuth.message}`, "error");
      }
      return NotificationToast("SUCCESS!!!!", `${dataAuth.message}`, "success");
    } catch (error) {
      console.log(error);
      NotificationToast("ERROR!!!!", `${error.response.data.message}`, "error");
    }
  }
});
