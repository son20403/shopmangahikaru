import BookService from "../../services/BookService/index.js";
import API from "../../config/API.js";
import Cookie from "../services/Cookies.js";
import ratingCount from "../services/Rating.js";
import Toast from "../services/Toast.js";
const bookService = new BookService(API);
const token = Cookie.getCookie("token");

window.addEventListener("DOMContentLoaded", () => {
  const outputSearch = document.querySelector(".outputSearch");
  const output = document.querySelector(".outputSearch .output");
  const inputValue = document.querySelector("#searchText");
  const miniLoading = document.querySelector("#loader");
  const messageError = document.querySelector(".message-error");
  const formSearch = document.querySelector("#search");
  messageError.classList.add("show");

  window.addEventListener("click", (e) => {
    outputSearch.classList.remove("show");
  });
  outputSearch.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  inputValue.addEventListener("click", (e) => {
    e.stopPropagation();
    outputSearch.classList.toggle("show");
  });

  let debounceTimeout;
  inputValue.addEventListener("keydown", (e) => {
    outputSearch.classList.add("show");
    miniLoading.classList.add("show");
    messageError.classList.remove("show");
    output.innerHTML = "";
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      const key = inputValue.value || "?<?<?";
      bookService.search(token, key).then((data) => {
        miniLoading.classList.remove("show");
        if (!data.length) {
          messageError.classList.add("show");
        } else {
          messageError.classList.remove("show");
          data.forEach((item) => createItem(item, output));
        }
      });
    }, 700);
  });
  // formSearch.addEventListener("submit", (e) => {
  //     if (!inputValue.value) {
  //         e.preventDefault();
  //         Toast("Vui lòng nhập dữ liệu tìm kiếm", "red");
  //     }
  // });
});
const createItem = (item, element) => {
  const rate = +ratingCount(item.average_score);
  element.insertAdjacentHTML(
    "beforeend",
    `
          <a href="./detail.html?id=${item._id}" class="linkItem">
              <div class="formItem row align-items-center">
                  <div class="col-lg-3">
                      <img src="${item.image}" alt="" class="imgItem">
                  </div>
                  <div class="infoItem col-lg-9">
                      <h4 class="titleItem ">
                      ${item.title}
                      </h4>
                      <p class="authorItem">${item.author}</p>
  
                      <div class="d-flex align-items-center justify-content-between" id="count">
                          <span class="review_count">${
                            item.review_count
                          } lượt xem</i></span>
                          <div class="position-relative mr-2">
                              <small class="fa fa-star text-primary"></small>
                              <small class="fa fa-star text-primary"></small>
                              <small class="fa fa-star text-primary"></small>
                              <small class="fa fa-star text-primary"></small>
                              <small class="fa fa-star text-primary"></small>
                              <div id="ratingSearch" class="overlay" style="width: ${
                                100 - rate
                              }%;"></div>
                          </div>
                      </div>
                  </div>
              </div>
          </a>
      `
  );
};
