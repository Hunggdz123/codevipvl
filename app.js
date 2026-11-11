const form = document.querySelector("#convert-form");
const usernameInput = document.querySelector("#username");
const pointsInput = document.querySelector("#points");
const formMessage = document.querySelector("#form-message");
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

  showError("Không thể chuyển điểm: hệ thống xử lý chưa được kết nối.");
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
