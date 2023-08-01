import CategoryService from "../../services/CategoryService/index.js";
import API from "../../config/API.js";
import Cookie from "../services/Cookies.js";
import AuthService from "../../services/AuthService/index.js";
import { Logout, NotToken } from "../auth/logout.js";
import Toast from "../services/Toast.js";
import { totalCart } from "../services/addCart.js";
const categoryService = new CategoryService(API);
const authService = new AuthService(API);
const token = Cookie.getCookie("token");
if (!token) NotToken();
const dataCustomer = await authService.getCustomer(token);
const customer = dataCustomer.customer;
const cartCount = document.querySelector("#cartCount");
const total = totalCart();
window.addEventListener("load", async () => {
  cartCount.innerHTML = total;
  const btnLogout = document.querySelector("#btnLogout");
  if (btnLogout) Logout(btnLogout);
  if (customer) {
    document.querySelector("#nameUser").innerHTML = customer.username;
    if (customer.admin) {
      createMyAdmin();
    } else {
      document.querySelector("#admin").innerHTML = "User";
    }
    document.querySelector("#Avatar").setAttribute("src", customer.avatar);
  }

  try {
    const categories = await categoryService.view(token);
    if (categories) {
      categories.forEach((item) => {
        createItemCate(item);
      });
    } else {
      console.log(categories);
      Toast("Có lỗi xảy ra", "red");
    }
  } catch (error) {
    console.log(error);
    Toast("Có lỗi xảy ra", "red");
  }
});

function createItemCate(item) {
  document.querySelector("#showCategory").insertAdjacentHTML(
    "beforeend",
    `
      <a href="./shop.html?id=${item._id}" class="nav-item nav-link">${item.name}</a>`
  );
}

function createMyAdmin() {
  document.querySelector("#admin").innerHTML = "Admin";
  document.querySelector("#MyAdmin").insertAdjacentHTML(
    "beforeend",
    `
        <li>
            <a class="dropdown-item" href="../../../client/Admin/index.html">
                <i class="bx bx-cog me-2"></i>
                <span class="align-middle">Dashboard</span>
            </a>
        </li>`
  );
}
