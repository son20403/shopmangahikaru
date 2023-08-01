import Toast from "./Toast.js";
export default function addToCart(id, name, price, image, quantity = 1) {
  const cartCount = document.querySelector("#cartCount");
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  if (!cart) {
    cart = [];
    pushCart(cart, id, name, price, image, quantity);
    Toast("Đã thêm vào giỏ hàng", "green");
  } else {
    let item = cart.find((item) => item.id === id);
    if (item) {
      Toast("Sản phẩm đã tồn tại trong giỏ hàng", "red");
    } else {
      pushCart(cart, id, name, price, image, quantity);
      Toast("Đã thêm vào giỏ hàng", "green");
    }
  }
  sessionStorage.setItem("cart", JSON.stringify(cart));

  const total = totalCart();
  cartCount.innerHTML = total;
  return true;
}

export function totalCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart"));
  let total = 0;
  if (cart) {
    cart.forEach((item) => {
      total += item.quantity;
    });
  }
  return total;
}

function pushCart(cart, id, name, price, image, quantity) {
  cart.push({
    id,
    name,
    price,
    image,
    quantity,
  });
}

export function addCart(btnAddCarts) {
  btnAddCarts.forEach((btnAdd) => {
    btnAdd.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const title = this.getAttribute("data-title");
      const price = this.getAttribute("data-price");
      const image = this.getAttribute("data-image");
      if (id && title && price && image) {
        addToCart(id, title, price, image);
      }
    });
  });
}
