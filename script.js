
const $ = id => document.getElementById(id);

// LIVE CLOCK
function tick() {
    const d = new Date();

    $("clock").textContent = d.toLocaleTimeString();
    $("localtime").textContent = d.toLocaleTimeString();
}

tick();
setInterval(tick, 1000);

// SYSTEM INFORMATION
$("platform").textContent = navigator.platform || "Browser device";
$("language").textContent = navigator.language || "Unknown";

$("screen").textContent =
    `${screen.width} × ${screen.height}`;

// PUBLIC IP LOOKUP
$("ipBtn").addEventListener("click", async () => {

    const el = $("ipResult");

    el.textContent = "Fetching public IP details...";

    try {
        const response = await fetch("https://ipwho.is/");
        const data = await response.json();

        if (!data.success) {
            throw new Error("Lookup failed");
        }

        el.textContent =
            `IP: ${data.ip}\n` +
            `City: ${data.city || "Unknown"}\n` +
            `Region: ${data.region || "Unknown"}\n` +
            `Country: ${data.country || "Unknown"}\n` +
            `ISP: ${data.connection?.isp || "Unknown"}\n\n` +
            "Location is approximate.";

    } catch (error) {

        el.textContent =
            "Lookup failed. Check internet and retry.";
    }
});

// RADAR SIMULATION
$("radarBtn").addEventListener("click", () => {

    const button = $("radarBtn");
    const status = $("radarStatus");

    const active = button.dataset.active === "yes";

    button.dataset.active = active ? "no" : "yes";

    button.textContent = active
        ? "START SIMULATION"
        : "STOP SIMULATION";

    status.textContent = active
        ? "SIMULATED RADAR // STANDBY"
        : "SIMULATED RADAR // SWEEPING";
});

// MATRIX ANIMATION
const canvas = $("matrix");
const ctx = canvas.getContext("2d");

let drops = [];
const fontSize = 14;

function resizeMatrix() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / fontSize);

    drops = Array(columns).fill(1);
}

window.addEventListener("resize", resizeMatrix);

resizeMatrix();

const characters =
    "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function drawMatrix() {

    ctx.fillStyle = "rgba(2, 8, 5, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4dff9a";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {

        const character =
            characters[Math.floor(Math.random() * characters.length)];

        ctx.fillText(character, i * fontSize, y * fontSize);

        if (
            y * fontSize > canvas.height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }

        drops[i]++;
    });
}

setInterval(drawMatrix, 55);

// TERMINAL SIMULATOR
const output = $("output");

function print(message) {

    output.innerHTML += "<br>" + message;

    output.scrollTop = output.scrollHeight;
}

$("termForm").addEventListener("submit", event => {

    event.preventDefault();

    const command = $("cmd").value.trim().toLowerCase();

    $("cmd").value = "";

    print(
        `<span style="color:#b6c9be">guest@shadow:~$ ${command.replace(/[&<>"]/g, "")}</span>`
    );

    if (command === "help") {

        print("Commands: help, date, whoami, about, status, scan, clear");

    } else if (command === "date") {

        print(new Date().toString());

    } else if (command === "whoami") {

        print("guest — simulated terminal user");

    } else if (command === "about") {

        print("SHADOW OS v2.0 — educational cyber dashboard.");

    } else if (command === "status") {

        print("UI: ONLINE | RADAR: SIMULATED | MATRIX: RUNNING");

    } else if (command === "scan") {

        print("Demo scan complete: no real devices or networks were scanned.");

    } else if (command === "clear") {

        output.textContent = "Terminal cleared.";

    } else if (command !== "") {

        print("Command not found: " + command);
    }
});
