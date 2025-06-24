const correctPassword = "123456"; // Mật khẩu dùng nhiều lần
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("password");
const cameraArea = document.getElementById("cameraArea");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const deleteBtn = document.getElementById("deleteBtn");

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passwordInput.value === correctPassword) {
    passwordForm.classList.add("hidden");
    cameraArea.classList.remove("hidden");
    startCamera();
  } else {
    alert("Sai mật khẩu!");
  }
});

function startCamera() {
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" }, // Cam trước
    audio: false
  }).then(stream => {
    video.srcObject = stream;
  }).catch(err => {
    alert("Không thể mở camera: " + err);
  });
}

captureBtn.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");
  context.translate(canvas.width, 0); // lật ngược ảnh tránh bị "mirror"
  context.scale(-1, 1);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.classList.remove("hidden");
  deleteBtn.classList.remove("hidden");
});

deleteBtn.addEventListener("click", () => {
  canvas.classList.add("hidden");
  deleteBtn.classList.add("hidden");
});
