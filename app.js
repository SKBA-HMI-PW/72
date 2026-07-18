const p4=document.getElementById("password4");
const p7=document.getElementById("password7");
const timeEl=document.getElementById("currentTime");
const statusEl=document.getElementById("status");
const pad=n=>String(n).padStart(2,"0");
const last4=n=>String(((n%10000)+10000)%10000).padStart(4,"0");

function updateNow(){
  const now=new Date();
  const base=now.getFullYear()-now.getDate()+now.getHours();
  p4.textContent=last4(base*4);
  p7.textContent=last4(base*7);
  timeEl.textContent=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

async function copyValue(id,btn){
  const value=document.getElementById(id).textContent;
  try{await navigator.clipboard.writeText(value)}
  catch{
    const t=document.createElement("textarea");
    t.value=value;t.style.position="fixed";t.style.opacity="0";
    document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();
  }
  const old=btn.textContent;btn.textContent="완료";statusEl.textContent=`${value} 복사됨`;
  setTimeout(()=>{btn.textContent=old;statusEl.textContent=""},1300);
}

document.querySelectorAll(".copy-btn").forEach(btn=>{
  btn.addEventListener("click",()=>copyValue(btn.dataset.copyTarget,btn));
});

updateNow();
setInterval(updateNow,1000);

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
}