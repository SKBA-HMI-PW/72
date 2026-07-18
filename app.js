const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const password4 = document.getElementById("password4");
const password7 = document.getElementById("password7");
const statusEl = document.getElementById("status");

function pad2(value) {
  return String(value).padStart(2, "0");
}

function setNow() {
  const now = new Date();
  dateInput.value = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
  timeInput.value = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
  calculate();
}

function calculate() {
  if (!dateInput.value || !timeInput.value) {
    password4.textContent = "—";
    password7.textContent = "—";
    return;
  }

  const [year, , day] = dateInput.value.split("-").map(Number);
  const [hour] = timeInput.value.split(":").map(Number);

  const base = year - day + hour;
  password4.textContent = String(base * 4);
  password7.textContent = String(base * 7);
  statusEl.textContent = "";
}

async function copyPassword(targetId, button) {
  const value = document.getElementById(targetId).textContent;
  if (!value || value === "—") return;

  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const area = document.createElement("textarea");
    area.value = value;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }

  const original = button.textContent;
  button.textContent = "완료";
  statusEl.textContent = `${value} 복사됨`;
  setTimeout(() => {
    button.textContent = original;
    statusEl.textContent = "";
  }, 1500);
}

document.getElementById("nowBtn").addEventListener("click", setNow);
document.getElementById("refreshBtn").addEventListener("click", calculate);
dateInput.addEventListener("change", calculate);
timeInput.addEventListener("change", calculate);

document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", () => copyPassword(button.dataset.copyTarget, button));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

setNow();
