import Cookie from "../../functions/services/Cookies.js";

function Logout(element) {
  if (element)
    element.addEventListener("click", () => {
      NotToken();
    });
}

function NotToken() {
  sessionStorage.clear();
  Cookie.deleteCookie("token");
  window.location = "../pages/auth/login.html";
}
export { Logout, NotToken };
