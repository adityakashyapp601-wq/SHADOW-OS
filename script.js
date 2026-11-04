
const $ = id => document.getElementById(id);

function tick() {
  const d = new Date();
  $("clock").textContent = d.toLocaleTimeString();
  $("localtime").textContent = d.toLocaleTimeString();
}

tick();
setInterval(tick, 1000);

$("platform").textContent = navigator.platform || "Browser device";
$("language").textContent = navigator.language || "Unknown";
$("screen").textContent = `${screen.width} × ${screen.height}`;

$("ipBtn").addEventListener("click", async () => {
  const el = $("ipResult");
  el.textContent = "Fetching public IP details…";

  try {
    const r = await fetch("https://ipwho.is/");
    const d = await r.json();

    if (!d.success) throw Error();

    el.textContent =
      `IP: ${d.ip}\n` +
      `City: ${d.city || "Unknown"}\n` +
      `Region: ${d.region || "Unknown"}\n` +
      `Country: ${d.country || "Unknown"}\n` +
      `ISP: ${d.connection?.isp || "Unknown"}\n\n` +
      "Location is approximate.";
  } catch {
    el.textContent = "Lookup failed. Check internet and retry.";
  }
});

const output = $("output");

function print(s) {
  output.innerHTML += "<br>" + s;
  output.scrollTop = output.scrollHeight;
}

$("termForm").addEventListener("submit", e => {
  e.preventDefault();

  const c = $("cmd").value.trim().toLowerCase();
  $("cmd").value = "";

  print(`<span style="color:#b6c9be">guest@shadow:~$ ${c.replace(/[&<>"]/g, "")}</span>`);

  if (c === "help") {
    print("Commands: help, date, whoami, clear, about");
  } else if (c === "date") {
    print(new Date().toString());
  } else if (c === "whoami") {
    print("guest — simulated terminal user");
  } else if (c === "about") {
    print("SHADOW OS is an educational dashboard.");
  } else if (c === "clear") {
    output.innerHTML = "Terminal cleared.";
  } else if (c) {
    print(`Command not found: ${c}`);
  }
});
