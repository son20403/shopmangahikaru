import AuthService from "../../services/AuthService/index.js";
import API from "../../config/API.js";
import Cookie from "../../functions/services/Cookies.js";
import { NotToken } from "../../functions/auth/logout.js";
const token = Cookie.getCookie("token");
const authService = new AuthService(API);
if (!token) {
  NotToken();
  window.location = "../../../client/pages/auth/login.html";
} else {
  const dataCustomer = await authService.getCustomer(token);
  const isAdmin = dataCustomer.customer.admin;
  if (!isAdmin) {
    window.location = "../../../client/pages/index.html";
  }
}
