console.log(document.getElementById("imageUpload"));
document.getElementById("imageUpload").onclick = function () {
  const xhttp = new XMLHttpRequest();
  const selectedImage = document.getElementById("selectedImage");
  const imageStatus = document.getElementById("imageStatus");
  xhttp.onreadystatechange = function () {
    imageStatus.innerHTML = this.responseText;
  };
  xhttp.open("POST", "/dashboard/upload-image");
  const formData = new FormData();
  if (selectedImage.files.length > 0) {
    formData.append("image", selectedImage.files[0]);
    xhttp.send(formData);
  } else {
    imageStatus.innerHTML = "Please choose an image first!";
  }
};
