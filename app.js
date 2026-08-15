const password =
  document.getElementById("password");

const formula =
  document.getElementById("formula");

const multiplier =
  document.getElementById("multiplier");

const timeEl =
  document.getElementById("currentTime");

const statusEl =
  document.getElementById("status");


const pad = n =>
  String(n).padStart(2, "0");


const last4 = n =>
  String(
    ((n % 10000) + 10000) % 10000
  ).padStart(4, "0");



function updateNow() {

  const now = new Date();

  const year =
    now.getFullYear();

  const day =
    now.getDate();

  const hour =
    now.getHours();


  const base =
    year - day + hour;


  let m =
    parseInt(
      multiplier.value,
      10
    );


  if (isNaN(m)) {
    m = 0;
  }


  // 비밀번호 계산
  password.textContent =
    last4(
      base * m
    );


  // 계산식 표시
  formula.textContent =
    `(YYYY − DD + HH) × ${m}`;


  // 현재 시간
  timeEl.textContent =
    `${year}-${pad(now.getMonth() + 1)}-${pad(day)} `
    + `${pad(hour)}:${pad(now.getMinutes())}`;

}



// 배율 변경 즉시 계산
multiplier.addEventListener(
  "input",
  updateNow
);



// 복사
async function copyValue() {

  const value =
    password.textContent;


  try {

    await navigator
      .clipboard
      .writeText(value);

  }

  catch {

    const t =
      document.createElement("textarea");

    t.value = value;

    document.body.appendChild(t);

    t.select();

    document.execCommand("copy");

    t.remove();

  }


  statusEl.textContent =
    `${value} 복사됨`;


  setTimeout(() => {

    statusEl.textContent = "";

  }, 1300);

}



document
  .querySelector(".copy-btn")
  .addEventListener(
    "click",
    copyValue
  );



// 처음 열었을 때 계산
updateNow();


// 시간 자동 갱신
setInterval(
  updateNow,
  1000
);
