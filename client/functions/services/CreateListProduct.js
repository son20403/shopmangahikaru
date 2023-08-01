import VND from "../services/NumberFormat.js";
import ratingCount from "./Rating.js";
export default function createItemListProd(item, element) {
    const rate = +ratingCount(item.average_score);

    document.querySelector(`${element}`).insertAdjacentHTML(
        "beforeend",
        `
<div class="col-lg-3 col-md-6 col-sm-6 pb-1 mb-4">
    <div class="product-item bg-light mb-4 h-100">
        <div class="product-img position-relative overflow-hidden">
            <img style="width:100%" class="img-fluid" src="${
              item.image
            }" alt="">
            <div class="product-action">
                <a name="addCart" class="btn btn-outline-dark btn-square"
                 data-id="${item._id}"
                 data-title="${item.title}"
                 data-price="${item.price}"
                 data-image="${item.image}">
                <i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href="./detail.html?id=${
                  item._id
                }"><i class="fa fa-eye"></i></a>
            </div>
        </div>
        <div style="" class="text-center py-4 pr-2 pl-2">
            <a class="h6 text-decoration-none" href="">${item.title}</a>
        </div>
        <div class="d-flex align-items-center justify-content-center mt-2">
            <h5 style="color:#dc3545" >${VND.format(item.price)}</h5>
        </div>
        <div class="d-flex align-items-center justify-content-center pb-2">
            <div class="position-relative mr-2">
                <small class="fa fa-star text-primary"></small>
                <small class="fa fa-star text-primary"></small>
                <small class="fa fa-star text-primary"></small>
                <small class="fa fa-star text-primary"></small>
                <small class="fa fa-star text-primary"></small>
                <div class="overlay" style="width: ${100 - rate}%;"></div>
            </div>
            <small class="mt-1">(${item.review_count})</small>
        </div>
    </div>
</div>`
    );
}