const modal = document.querySelector(".modal-frame");
const overlay = document.querySelector(".modal-overlay");
const closeModal = document.querySelector(".close");
const cancelModal = document.querySelector(".cancel");

// Hàm xử lý khi kết thúc animation
function handleAnimationEnd(e) {
  if (modal.classList.contains("state-leave")) {
    modal.classList.remove("state-leave");
  }
}

// Thêm event listener cho sự kiện kết thúc animation
modal.addEventListener("webkitAnimationEnd", handleAnimationEnd);
modal.addEventListener("oanimationend", handleAnimationEnd);
modal.addEventListener("msAnimationEnd", handleAnimationEnd);
modal.addEventListener("animationend", handleAnimationEnd);

// Thêm event listener cho button đóng modal
closeModal.addEventListener("click", removeModal);
cancelModal.addEventListener("click", removeModal);

function removeModal() {
  overlay.classList.remove("state-show");
  modal.classList.remove("state-appear");
  modal.classList.add("state-leave");
}
