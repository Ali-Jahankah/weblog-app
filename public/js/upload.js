document.getElementById("imageUpload").onclick = function () {
  const xhttp = new XMLHttpRequest();
  const selectedImage = document.getElementById("selectedImage");
  const imageStatus = document.getElementById("imageStatus");
  const progressBarDiv = document.getElementById("progressDiv");
  const progressBar = document.getElementById("progressBar");
  const imageLink = document.getElementById("imageLink");
  xhttp.onreadystatechange = function () {
    if (xhttp.status === 200) {
      imageLink.innerHTML = this.responseText;
    }
    imageStatus.innerHTML = this.responseText;
  };
  xhttp.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const result = Math.round((e.loaded / e.total) * 100);
      if (result !== 100) {
        progressBar.innerHTML = result + "%";
        progressBar.style = "width:" + result + "%";
      } else {
        progressBarDiv.style.display = "none";
      }
    }
  };
  xhttp.open("POST", "/dashboard/upload-image");
  const formData = new FormData();
  if (selectedImage.files.length > 0) {
    progressBarDiv.style.display = "block";
    formData.append("image", selectedImage.files[0]);
    xhttp.send(formData);
  } else {
    imageStatus.innerHTML = "Please choose an image first!";
  }
};
