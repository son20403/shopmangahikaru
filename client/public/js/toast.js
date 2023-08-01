function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");

  if (main) {
    const toast = document.createElement("div");

    const autoRemove = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemove);
      }
    };

    const icons = {
      success: "checkmark-circle",
      info: "information-circle",
      warning: "alert-circle",
      error: "alert-circle",
    };
    const icon = icons[type];

    toast.classList.add("toast-notify", `toast--${type}`);
    const delay = (duration / 1000).toFixed(2);
    toast.style.animation = `slideInLeft ease 0.4s, opacity linear 1s ${delay}s forwards`;

    toast.innerHTML = ` 
            <div class="toast__icon">
                <ion-icon name="${icon}"></ion-icon>
            </div>
            <div class="toast__content">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <ion-icon name="close"></ion-icon>
            </div>    
        `;
    main.appendChild(toast);
  }
}

function NotificationToast(title, message, type) {
  toast({
    title,
    message,
    type,
    duration: 5000,
  });
}

// function InfoToast(title = "Info", message = "Thông tin") {
//   toast({
//     title,
//     message,
//     type: "info",
//     duration: 5000,
//   });
// }

// function WarningToast(title = "Error", message = "Có lỗi xảy ra") {
//   toast({
//     title,
//     message,
//     type: "error",
//     duration: 5000,
//   });
// }

// function SuccessToast(
//   title = "Success",
//   message = "Thành công",
//   type = "success",
//   duration = 5000
// ) {
//   toast({
//     title,
//     message,
//     type,
//     duration: 5000,
//   });
// }
