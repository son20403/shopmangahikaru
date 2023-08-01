import UrlHelper from "../services/UrlHelper.js";
import BookService from "../../services/BookService/index.js";
import API from "../../config/API.js";
import Cookie from "../services/Cookies.js";
import VND from "../services/NumberFormat.js";
import createItemListProd from "../services/CreateListProduct.js";
import ratingCount from "../services/Rating.js";
import addToCart from "../services/addCart.js";
import { addCart } from "../services/addCart.js";
const bookService = new BookService(API);
const token = Cookie.getCookie("token");
const id = new UrlHelper().readParam(location.href, "id");

const Elements = {
  imgProduct: document.querySelector("#imgProduct"),
  titleProduct: document.querySelector("#titleProduct"),
  descriptionProduct: document.querySelector("#descriptionProduct"),
  view: document.querySelector("#view"),
  authorProduct: document.querySelector("#authorProduct"),
  priceProduct: document.querySelector("#priceProduct"),
};
window.addEventListener("DOMContentLoaded", async () => {
  const dataProd = await bookService.findById(id, token);
  if (dataProd) {
    LoadDetailProduct(dataProd);
    ShowByCategory(dataProd.category);
  }
});
async function ShowByCategory(id) {
  const dataProd = await bookService.findByCategory(id, token);
  const shuffledArr = _.shuffle([...dataProd]);
  shuffledArr.slice(0, 4).forEach((item) => {
    createItemListProd(item, "#listProductByCategory");
  });
  const btnAddCarts = document.querySelectorAll("a[name='addCart']");
  addCart(btnAddCarts);
}
async function LoadDetailProduct(dataProd) {
  try {
    await bookService.update(id, token, {
      review_count: dataProd.review_count + 1,
    });
    const {
      imgProduct,
      titleProduct,
      descriptionProduct,
      view,
      authorProduct,
      priceProduct,
    } = Elements;
    imgProduct.setAttribute(
      "src",
      `${dataProd.image || "../public/images/default.jpg"}`
    );
    const rate = ratingCount(dataProd.average_score);
    document
      .querySelectorAll(".nameTitle")
      .forEach((item) => (item.innerHTML = dataProd.title));
    titleProduct.innerHTML = dataProd.title || "Chưa cập nhật";
    descriptionProduct.innerHTML = dataProd.description || "Chưa cập nhật";
    view.innerHTML = dataProd.review_count;
    authorProduct.innerHTML = dataProd.author || "Chưa cập nhật";
    priceProduct.innerHTML = VND.format(dataProd.price) || "Chưa cập nhật";
    document.querySelector(".overlayDetail").style = `width: ${100 - rate}%`;
    document.querySelector("#addCart").addEventListener("click", () => {
      const quantity = +document.querySelector("#quantityProd").value;
      addToCart(
        dataProd._id,
        dataProd.title,
        dataProd.price,
        dataProd.image,
        quantity
      );
    });
  } catch (err) {
    console.log(err);
  }
}
