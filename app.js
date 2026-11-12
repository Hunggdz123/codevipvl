const form = document.querySelector("#convert-form");
const usernameInput = document.querySelector("#username");
const pointsInput = document.querySelector("#points");
const humanCheck = document.querySelector("#human-check");
const formMessage = document.querySelector("#form-message");
const result = document.querySelector("#result");
const resultTitle = document.querySelector("#result-title");
const resultTime = document.querySelector("#result-time");
const resultUsername = document.querySelector("#result-username");
const resultPoints = document.querySelector("#result-points");
const backButton = document.querySelector("#back-button");
const convertCard = document.querySelector(".convert-card");
const soundToggle = document.querySelector("#sound-toggle");
const audio = document.querySelector("#background-audio");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  const username = usernameInput.value.trim();
  const normalizedPoints = pointsInput.value.trim().replace(/[.,\s]/g, "");

  if (!username) {
    showError("Vui lòng nhập tên tài khoản.");
    usernameInput.focus();
    return;
  }

  if (!/^\d+$/.test(normalizedPoints)) {
    showError("Vui lòng nhập số điểm hợp lệ.");
    pointsInput.focus();
    return;
  }

  const points = Number(normalizedPoints);
  if (!Number.isSafeInteger(points) || points <= 0) {
    showError("Số điểm phải lớn hơn 0.");
    pointsInput.focus();
    return;
  }

  if (!humanCheck.checked) {
    showError("Vui lòng xác nhận bạn là người thật.");
    humanCheck.focus();
    return;
  }

  resultUsername.textContent = username;
  resultPoints.textContent = points.toLocaleString("vi-VN");
  const transferredAt = new Date();
  resultTime.dateTime = transferredAt.toISOString();
  resultTime.textContent = formatTransferTime(transferredAt);
  form.hidden = true;
  result.hidden = false;
  convertCard.classList.add("is-success");
  resultTitle.focus();
});

backButton.addEventListener("click", () => {
  result.hidden = true;
  form.hidden = false;
  convertCard.classList.remove("is-success");
  form.reset();
  usernameInput.focus();
});

soundToggle.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      soundToggle.setAttribute("aria-pressed", "true");
      soundToggle.setAttribute("aria-label", "Tắt âm thanh");
    } catch (error) {
      showError("Không thể phát âm thanh trên trình duyệt này.");
    }
    return;
  }

  audio.pause();
  soundToggle.setAttribute("aria-pressed", "false");
  soundToggle.setAttribute("aria-label", "Bật âm thanh");
});

document.querySelectorAll(".widget-close").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".promo-widget").hidden = true;
  });
});

function showError(text) {
  formMessage.textContent = text;
}

function formatTransferTime(date) {
  const pad = (value) => String(value).padStart(2, "0");
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  const day = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

  return `${time} ${day}`;
}
