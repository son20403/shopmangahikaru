import CategoryService from "../../services/CategoryService/index.js";
import API from "../../config/API.js";
import Cookie from "../../functions/services/Cookies.js";
import Toast from "../../functions/services/Toast.js";

const categoryService = new CategoryService(API);
let token = Cookie.getCookie("token");
const listCategories = document.querySelector("#listCategories");
const Loading = document.querySelector("#Loading");
const modal = document.querySelector(".modal-frame");
const overlay = document.querySelector(".modal-overlay");

let idCate;
window.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#category").classList.add("active", "open");
  document.querySelector("#category-list").classList.add("active");
  const deleteCategory = document.querySelector("#deleteCategory");
  await getDataCate();
  deleteCategory.addEventListener("click", () => {
    deteteDataCate(idCate, token);
  });
});

function buttonDelete() {
  const deletes = document.querySelectorAll(".delete");
  deletes.forEach((item) => {
    item.addEventListener("click", () => {
      idCate = item.getAttribute("data-id");
      showModal();
    });
  });
}

async function deteteDataCate(id, token) {
  Loading.classList.add("show");
  try {
    const deleteCate = await categoryService.delete(id, token);
    if (deleteCate) {
      Toast(`${deleteCate.message}`, "green");
      await getDataCate();
    } else {
      Toast(`${deleteCate.message}`, "red");
    }
  } catch (error) {
    console.error(error);
    Toast(`${error.response.data.message || "Có lỗi xảy ra"}`, "red");
  }
  Loading.classList.remove("show");
  removeModal();
}
async function getDataCate() {
  Loading.classList.add("show");
  listCategories.innerHTML = "";
  try {
    const cateData = await categoryService.view(token);
    if (cateData) {
      cateData.forEach((item) => {
        createElement(item);
      });
    }
  } catch (error) {
    console.error(error);
    Toast(`${error.response.data.message || "Có lỗi xảy ra"}`, "red");
  }
  Loading.classList.remove("show");
  buttonDelete();
}

function createElement(item) {
  listCategories.insertAdjacentHTML(
    "beforeend",
    `<tr>
        <td>
            <strong>
                <span title="${item._id}" class="badge bg-label-primary me-1">${item._id}</span>

            </strong>
        </td>
        <td> <span title="${item.name}">
                ${item.name}
            </span></td>
        <td>
            <ul
                class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                <li class="" title="">
                    <img src="${item.image}" width="120px">
                </li>

            </ul>
        </td>
        <td>
            <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu" style="">
                    <a class="dropdown-item" href="./updateCategories.html?id=${item._id}"><i
                            class="bx bx-edit-alt me-1  bx-tada bx-rotate-90"></i> Edit</a>
                    <a class="dropdown-item delete" data-id="${item._id}"><i
                            class="bx bx-trash me-2  bx-tada bx-rotate-90"></i>Delete</a>
                </div>
            </div>
        </td>
    </tr>`
  );
}

function removeModal() {
  overlay.classList.remove("state-show");
  modal.classList.remove("state-appear");
  modal.classList.add("state-leave");
}

function showModal() {
  overlay.classList.add("state-show");
  modal.classList.remove("state-leave");
  modal.classList.add("state-appear");
}
