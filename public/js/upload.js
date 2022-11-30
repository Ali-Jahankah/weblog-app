document.getElementById("imageUpload").onclick = function () {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.status === 200) {
      document.getElementById("imageStatus").innerHTML = this.responseText;
    } else {
      document.getElementById("imageStatus").innerHTML =
        "An error from the server!";
    }
  };
  xhttp.open("POST", "/dashboard/upload-image");
  const formData = new FormData();
  formData.append("image", document.getElementById("selectedImage").files[0]);
  xhttp.send(formData);
};
