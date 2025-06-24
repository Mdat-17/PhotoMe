const used = localStorage.getItem('used');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const captureBtn = document.getElementById('captureBtn');
const deleteBtn = document.getElementById('deleteBtn');
const passwordForm = document.getElementById('passwordForm');
const cameraArea = document.getElementById('cameraArea');

const ALLOW_PASSWORD = '123456';
const allowMulti = /iPhone/i.test(navigator.userAgent);

if (used === 'yes' && !allowMulti) {
  document.body.innerHTML = '<h2>❌ Dịch vụ này chỉ dùng được 1 lần!</h2>';
}

passwordForm.onsubmit = async (e) => {
  e.preventDefault();
  const inputPass = document.getElementById('password').value;
  if (inputPass === ALLOW_PASSWORD || !used || allowMulti) {
    passwordForm.style.display = 'none';
    cameraArea.classList.remove('hidden');

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      captureBtn.style.display = 'inline-block';
    };
  } else {
    alert("Sai mật khẩu hoặc bạn đã dùng rồi.");
  }
};

captureBtn.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.translate(canvas.width, 0); // flip horizontal
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  deleteBtn.style.display = 'inline-block';
  captureBtn.style.display = 'none';
  if (!allowMulti) localStorage.setItem('used', 'yes');
};

deleteBtn.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  captureBtn.style.display = 'inline-block';
  deleteBtn.style.display = 'none';
};
