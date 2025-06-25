const validPasswords = ["vip001", "test001", "demo123"];
const adminPassword = "admin123";

function checkPassword() {
  const input = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (validPasswords.includes(input)) {
    // Xóa mật khẩu dùng 1 lần sau khi dùng
    validPasswords.splice(validPasswords.indexOf(input), 1);
    showCamera();
  } else if (input === adminPassword) {
    showCamera(); // admin dùng không giới hạn
  } else {
    error.textContent = "❌ Sai mật khẩu hoặc đã dùng rồi.";
  }
}

function showCamera() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("camera").classList.remove("hidden");
  openCamera();
}

function openCamera() {
  const video = document.getElementById("video");
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      alert("Không mở được camera: " + err);
    });
}

function takePhoto() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  const imgData = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "photo.png";
  link.click();
}
