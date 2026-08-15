const p4 = document.getElementById("password4");
const p7 = document.getElementById("password7");

const formula4 = document.getElementById("formula4");
const formulaX = document.getElementById("formulaX");

const multiplier = document.getElementById("multiplier");

const timeEl = document.getElementById("currentTime");
const statusEl = document.getElementById("status");


const pad = n =>
  String(n).padStart(2, "0");


const last4 = n =>
  String(
    ((n % 10000) + 10000) % 10000
  ).padStart(4, "0");



function updateNow() {

  const now = new Date();

  const year = now.getFullYear();
  const day = now.getDate();
  const hour = now.getHours();


  const base =
    year
    - day
    + hour;


  // 입력한 배율
  let m =
    parseInt(
      multiplier.value,
      10
    );


  if (isNaN(m)) {
    m = 0;
  }


  // 첫 번째 비밀번호 ×4
  p4.textContent =
    last4(
      base * 4
    );


  // 두 번째 비밀번호 ×입력값
  p7.textContent =
    last4(
      base * m
    );


  // 계산식 표시
  formula4.textContent =
    "(YYYY − DD + HH) × 4";


  formulaX.textContent =
    `(YYYY − DD + HH) × ${m}`;


  // 현재 시간 표시
  timeEl.textContent =
    `${year}-${pad(now.getMonth() + 1)}-${pad(day)} `
    + `${pad(hour)}:${pad(now.getMinutes())}`;

}



// 배율 입력 즉시 계산
multiplier.addEventListener(
  "input",
  updateNow
);



// 복사 기능
async function copyValue(
  id,
  button
) {

  const value =
    document
      .getElementById(id)
      .textContent;


  try {

    await navigator
      .clipboard
      .writeText(value);

  }

  catch {

    const t =
      document
        .createElement("textarea");

    t.value = value;

    document
      .body
      .appendChild(t);

    t.select();

    document
      .execCommand("copy");

    t.remove();

  }


  const old =
    button.textContent;


  button.textContent =
    "완료";


  statusEl.textContent =
    `${value} 복사됨`;


  setTimeout(() => {

    button.textContent =
      old;

    statusEl.textContent =
      "";

  }, 1300);

}



document
  .querySelectorAll(".copy-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () =>
        copyValue(
          button.dataset.copyTarget,
          button
        )
    );

  });



// 시작하자마자 계산
updateNow();


// 시간 자동 갱신
setInterval(
  updateNow,
  1000
);
