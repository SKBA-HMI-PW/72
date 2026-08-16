const timeEl =
  document.getElementById("currentTime");

const statusEl =
  document.getElementById("status");


const multiplier1 =
  document.getElementById("multiplier1");

const multiplier2 =
  document.getElementById("multiplier2");

const multiplier3 =
  document.getElementById("multiplier3");


const formula1 =
  document.getElementById("formula1");

const formula2 =
  document.getElementById("formula2");

const formula3 =
  document.getElementById("formula3");


const password1 =
  document.getElementById("password1");

const password2 =
  document.getElementById("password2");

const password3 =
  document.getElementById("password3");



const pad = n =>
  String(n).padStart(2, "0");


const last4 = n =>
  String(
    ((n % 10000) + 10000) % 10000
  ).padStart(4, "0");



function getMultiplier(input) {

  const value =
    parseInt(
      input.value,
      10
    );

  if (isNaN(value)) {
    return 0;
  }

  return value;

}



function updateNow() {

  const now =
    new Date();


  const year =
    now.getFullYear();

  const day =
    now.getDate();

  const hour =
    now.getHours();


  const base =
    year - day + hour;


  const m1 =
    getMultiplier(multiplier1);

  const m2 =
    getMultiplier(multiplier2);

  const m3 =
    getMultiplier(multiplier3);


  password1.textContent =
    last4(
      base * m1
    );

  password2.textContent =
    last4(
      base * m2
    );

  password3.textContent =
    last4(
      base * m3
    );


  formula1.textContent =
    `(YYYY − DD + HH) × ${m1}`;

  formula2.textContent =
    `(YYYY − DD + HH) × ${m2}`;

  formula3.textContent =
    `(YYYY − DD + HH) × ${m3}`;


  timeEl.textContent =
    `${year}-${pad(now.getMonth() + 1)}-${pad(day)} `
    + `${pad(hour)}:${pad(now.getMinutes())}`;

}



// 배율 변경 즉시 계산
multiplier1.addEventListener(
  "input",
  updateNow
);

multiplier2.addEventListener(
  "input",
  updateNow
);

multiplier3.addEventListener(
  "input",
  updateNow
);



// 복사
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


  const oldText =
    button.textContent;


  button.textContent =
    "완료";


  statusEl.textContent =
    `${value} 복사됨`;


  setTimeout(() => {

    button.textContent =
      oldText;

    statusEl.textContent =
      "";

  }, 1300);

}



document
  .querySelectorAll(".copy-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        copyValue(
          button.dataset.copyTarget,
          button
        );

      }
    );

  });



// 처음 열었을 때 계산
updateNow();


// 시간 자동 갱신
setInterval(
  updateNow,
  1000
);
