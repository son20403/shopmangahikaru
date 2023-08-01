const Toast = (content = "", color = "") => {
  return Toastify({
    text: content,
    backgroundColor: color,
    className: "toastify",
  }).showToast();
};
export default Toast;
