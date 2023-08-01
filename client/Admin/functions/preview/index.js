const ipnFileElement = document.querySelector("#image");
const resultElement = document.querySelector(".preview");
const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

ipnFileElement.addEventListener("change", function (e) {
  const files = e.target.files;
  const file = files[0];
  const fileType = file["type"];

  if (!validImageTypes.includes(fileType)) {
    resultElement.innerHTML = "";
    resultElement.insertAdjacentHTML(
      "beforeend",
      '<span class="badge bg-danger">Vui Lòng Chọn Ảnh</span>'
    );
    return;
  }

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.onload = function () {
    const url = fileReader.result;
    resultElement.innerHTML = "";
    resultElement.insertAdjacentHTML(
      "beforeend",
      `<span class="badge bg-success">Ảnh Mới</span>
      <img src="${url}" alt="${file.name}" class="preview-img" />`
    );
  };
});
