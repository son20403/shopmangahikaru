import BookService from "../../services/BookService/index.js";
import CategoryService from "../../services/CategoryService/index.js";
import VND from "../../functions/services/NumberFormat.js";

import API from "../../config/API.js";
import Cookie from "../../functions/services/Cookies.js";
import Toast from "../../functions/services/Toast.js";
const bookService = new BookService(API);
const categoryService = new CategoryService(API);
let token = Cookie.getCookie("token");
let idProd;

const listProduct = document.querySelector("#listProduct");
const Loading = document.querySelector("#Loading");
const modal = document.querySelector(".modal-frame");
const overlay = document.querySelector(".modal-overlay");

window.addEventListener("DOMContentLoaded", async() => {
    document.querySelector("#product").classList.add("active", "open");
    document.querySelector("#product-list").classList.add("active");
    const deleteProd = document.querySelector("#deleteProd");

    await getDataProd();
    deleteProd.addEventListener("click", () => {
        deteteDataCate(idProd, token);
    });
    tippy("#myContent", {
        content(reference) {
            const id = reference.getAttribute("data-content");
            return id;
        },
        allowHTML: true,
        animation: "fade",
        followCursor: true,
    });
});

async function getDataProd() {
    listProduct.innerHTML = "";
    Loading.classList.add("show");
    try {
        const prodData = await bookService.view(token);
        const cateData = await categoryService.view(token);
        if (prodData) {
            prodData.reverse().forEach((dataProd) => {
                const { category, ...productData } = dataProd;
                const { name } = cateData.find((cate) => cate._id === category) || {};
                createElement(name, productData);
            });
        } else {
            listProduct.insertAdjacentHTML("beforeend", `<p>Không có dữ liệu</p>`);
        }
    } catch (error) {
        console.error(error);
        Toast(`${error.response.data.message || "Có lỗi xảy ra"}`, "red");
    }
    Loading.classList.remove("show");
    buttonDelete();
}
async function deteteDataCate(id, token) {
    Loading.classList.add("show");
    try {
        const deleteProd = await bookService.delete(id, token);
        if (deleteProd) {
            Toast(`${deleteProd.message}`, "green");
            await getDataProd();
        } else {
            Toast(`${deleteProd.message}`, "red");
        }
    } catch (error) {
        console.error(error);
        Toast(`${error.response.data.message || "Có lỗi xảy ra"}`, "red");
    }
    Loading.classList.remove("show");
    removeModal();
}

function createElement(nameCate, item) {
    listProduct.insertAdjacentHTML(
        "beforeend",
        `
    <tr>
        <td>
            <strong >
                <span id="myContent" 
                    data-content="${
                      item._id
                    }" class="badge bg-label-primary me-1">
                ${item._id.substr(0, 10)}...</span>
            </strong>
        </td>
        <td> <span id="myContent" data-content="${item.title}">
        ${
          item.title.length > 40 ? item.title.substr(0, 39) + "..." : item.title
        }
            </span>
        </td>
        <td>
            <ul
                class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                <li class="avatar avatar-xs pull-up">
                    <img src="${item.image}"
                        alt="Avatar" class="rounded-circle">
                </li>
            </ul>
        </td>
        <td> <span id="myContent" data-content="${nameCate}">
                ${nameCate}
            </span>
        </td>
        <td> <span id="myContent" data-content=" ${VND.format(item.price)}">
        ${VND.format(item.price)}
            </span>
        </td>
        <td> <span id="myContent" data-content="${item.quantity || 0}">
                ${item.quantity || 0}
            </span>
        </td>
        <td > <span id="myContent" data-content="${item.author}">
                ${item.author}
            </span>
        </td>
        <td>
            <div id="myContent" data-content='${item.description}' >
                <span class="badge bg-info" >Mô tả</span>
            </div>
        </td>
        <td>
            <span id="myContent" data-content="${item.year}">
                ${item.year}
            </span>
        </td>
        <td>
            <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu" style="">
                    <a class="dropdown-item" href="./updateProduct.html?id=${
                      item._id
                    }"><i
                            class="bx bx-edit-alt me-1  bx-tada bx-rotate-90"></i> Edit</a>
                    <a class="dropdown-item delete" data-id="${item._id}"><i
                            class="bx bx-trash me-2  bx-tada bx-rotate-90"></i>Delete</a>
                </div>
            </div>
        </td>
    </tr>
    `
    );
}

function buttonDelete() {
    const deletes = document.querySelectorAll(".delete");
    deletes.forEach((item) => {
        item.addEventListener("click", () => {
            idProd = item.getAttribute("data-id");
            showModal();
        });
    });
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