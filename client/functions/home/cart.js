import VND from "../services/NumberFormat.js";
import { totalCart } from "../services/addCart.js";
let cart = JSON.parse(sessionStorage.getItem("cart"));
const renderListCart = document.querySelector("#renderCart");
const showTotal = document.querySelector("#showTotal");
const quantity = document.querySelector("#quantity");
const Total = document.querySelector("#Total");
const checkout = document.querySelector("#checkout");
window.addEventListener("DOMContentLoaded", () => {
  renderCart(cart, renderListCart);
});

function createItem(item, element) {
  let count = item.price * item.quantity;
  element.insertAdjacentHTML(
    "beforeend",
    `  <tr>
    <td class="align-middle d-flex align-items-center"><img src="${
      item.image
    }" alt="" style="width: 70px;"> <span class="pl-3 pr-3 text-start">${
      item.name
    }</span>
    </td>
    <td class="align-middle">${VND.format(item.price)}</td>
    <td class="align-middle user-select-none">
        <div class="input-group quantity mx-auto" style="width: 100px;">
            <div class="input-group-btn">
                <button name="btnMinus" data-id="${
                  item.id
                }" class="btn btn-sm btn-primary btn-minus">
                    <i class="fa fa-minus"></i>
                </button>
            </div>
            <input  style="cursor: default;" type="text" class="form-control form-control-sm bg-secondary border-0 text-center cu" value="${
              item.quantity
            }" readonly>
            <div class="input-group-btn">
                <button name="btnPlus" data-id="${
                  item.id
                }" class="btn btn-sm btn-primary btn-plus">
                    <i class="fa fa-plus"></i>
                </button>
            </div>
        </div>
    </td>
    <td class="align-middle">${VND.format(count)}</td>
    <td class="align-middle"><button name="btnRemove" data-id="${
      item.id
    }" class="btn btn-sm btn-danger"><i
                class="fa fa-times"></i></button></td>
</tr>`
  );
}

function renderCart(cart, element) {
  if (cart && cart.length > 0) {
    checkout.classList.remove("d-none");
    element.innerHTML = "";
    cart.forEach((item) => {
      createItem(item, element);
    });
    const TotalPrice = totalPrice(cart);
    showTotal.innerHTML = VND.format(TotalPrice);
    Total.innerHTML = VND.format(TotalPrice);
    const TotalItem = totalItem(cart);
    quantity.innerHTML = TotalItem;
  } else {
    element.innerHTML = "";
    showTotal.innerHTML = 0;
    Total.innerHTML = 0;
    quantity.innerHTML = 0;
    checkout.classList.add("d-none");
    element.insertAdjacentHTML(
      "beforeend",
      `<th class"m-auto mb-10" colspan="5"><p class="h5">Chưa có sản phẩm nào</p>
            <a href="shop.html" class="btn btn-primary">Mua ngay</a>
            </th>
            `
    );
  }
  const btnPlus = document.querySelectorAll("button[name='btnPlus']");
  const btnMinus = document.querySelectorAll("button[name='btnMinus']");
  const btnRemove = document.querySelectorAll("button[name='btnRemove']");
  btnPlus.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      plusCart(id);
    });
  });
  btnMinus.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      minusCart(id);
    });
  });
  btnRemove.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      removeCart(id);
    });
  });
}

function totalPrice(cart) {
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
}

function totalItem(cart) {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
}

function resetCountCart() {
  const cartCount = document.querySelector("#cartCount");
  const total = totalCart();
  cartCount.innerHTML = total;
}

function updateStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function removeCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateStorage();
  resetCountCart();
  renderCart(cart, renderListCart);
}

function minusCart(id) {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      removeCart(id);
    }
  }
  updateStorage();
  resetCountCart();
  renderCart(cart, renderListCart);
}

function plusCart(id) {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity++;
  }
  updateStorage();
  resetCountCart();
  renderCart(cart, renderListCart);
}
