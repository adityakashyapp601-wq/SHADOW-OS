
const $ = (id) => document.getElementById(id);

let activity = 0;
let currentTool = "";

// PAGE NAVIGATION
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active-page"));
  document.querySelectorAll(".nav").forEach(n => n.classList.remove("active"));

  $(page)?.classList.add("active-page");

  document.querySelector(`[data-page="${page}"]`)?.classList.add("active");

  const titles = {
    dashboard: "Dashboard",
    osint: "OSINT Tools",
    security: "Security Lab",
    utilities: "Cyber Utilities",
    terminal: "Terminal",
    learn: "Learning Lab"
  };

  $("pageTitle").textContent = titles[page] || "SHADOW OS";
}

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

// CLOCK
function updateClock() {
  $("clock").textContent = new Date().toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// THEME
$("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// TOOL MODAL
function openTool(tool) {
  currentTool = tool;
  activity++;
  $("activityCount").textContent = activity;

  const names = {
    dns: "DNS Lookup",
    ip: "Public IP Lookup",
    ssl: "SSL Certificate Checker",
    headers: "Security Headers Analyzer",
    whois: "Domain Information",
    subdomain: "Subdomain Discovery",
    uptime: "Website Status",
    meta: "Metadata Viewer",
    password: "Password Strength Analyzer",
    url: "URL Safety Checker",
    hash: "SHA-256 Hash Generator",
    base64: "Base64 Encoder / Decoder",
    jwt: "JWT Decoder",
    json: "JSON Formatter",
    regex: "Regex Tester",
    quiz: "Cyber Quiz",
    linux: "Linux Command Reference",
    roadmap: "Cybersecurity Roadmap"
  };

  $("toolTitle").textContent = names[tool] || "Cyber Tool";
  $("toolContent").innerHTML = getToolHTML(tool);
  $("toolModal").classList.add("show");
}

function closeTool() {
  $("toolModal").classList.remove("show");
}

$("toolModal").addEventListener("click", e => {
  if (e.target.id === "toolModal") closeTool();
});

// TOOL UI
function getToolHTML(tool) {
  const domainInput = `
    <input id="domainInput" placeholder="example.com">
  `;

  const textInput = `
    <textarea id="textInput" rows="4" placeholder="Enter text here..."></textarea>
  `;

  switch (tool) {
    case "dns":
      return domainInput + `
        <button onclick="runDNS()">Lookup DNS</button>
        <div id="result" class="result"></div>`;

    case "ip":
      return `<button onclick="runIP()">Get Public IP Information</button>
        <div id="result" class="result"></div>`;

    case "whois":
      return domainInput + `
        <button onclick="runWHOIS()">Domain Info</button>
        <div id="result" class="result"></div>`;

    case "subdomain":
      return domainInput + `
        <button onclick="runSubdomains()">Find Public Subdomains</button>
        <div id="result" class="result"></div>`;

    case "ssl":
      return domainInput + `
        <button onclick="runSSL()">Check Certificate Data</button>
        <div id="result" class="result"></div>`;

    case "headers":
      return domainInput + `
        <button onclick="runHeaders()">Analyze Headers</button>
        <div id="result" class="result"></div>`;

    case "uptime":
      return domainInput + `
        <button onclick="runUptime()">Check Website</button>
        <div id="result" class="result"></div>`;

    case "meta":
      return domainInput + `
        <button onclick="runMetadata()">Get Metadata</button>
        <div id="result" class="result"></div>`;

    case "password":
      return textInput + `
        <button onclick="runPassword()">Analyze Password</button>
        <div id="result" class="result"></div>`;

    case "url":
      return `<input id="urlInput" placeholder="https://example.com">
        <button onclick="runURL()">Analyze URL</button>
        <div id="result" class="result"></div>`;

    case "hash":
      return textInput + `
        <button onclick="runHash()">Generate SHA-256</button>
        <div id="result" class="result"></div>`;

    case "base64":
      return textInput + `
        <button onclick="runBase64Encode()">Encode</button>
        <button onclick="runBase64Decode()">Decode</button>
        <div id="result" class="result"></div>`;

    case "jwt":
      return textInput + `
        <button onclick="runJWT()">Decode JWT</button>
        <div id="result" class="result"></div>`;

    case "json":
      return textInput + `
        <button onclick="runJSON()">Format JSON</button>
        <div id="result" class="result"></div>`;

    case "regex":
      return `<input id="regexInput" placeholder="Regex pattern">
        <textarea id="regexText" rows="4" placeholder="Test text"></textarea>
        <button onclick="runRegex()">Test Regex</button>
        <div id="result" class="result"></div>`;

    case "quiz":
      return `<p>Which protocol securely encrypts web traffic?</p>
        <button onclick="quizAnswer('HTTP')">HTTP</button>
        <button onclick="quizAnswer('HTTPS')">HTTPS</button>
        <button onclick="quizAnswer('FTP')">FTP</button>
        <div id="result" class="result"></div>`;

    case "linux":
      return `<div class="result">
        <b>Linux Commands</b><br><br>
        ls — List files<br>
        pwd — Current directory<br>
        cd — Change directory<br>
        mkdir — Create directory<br>
        cat — Read file<br>
        grep — Search text<br>
        whoami — Current user<br>
        chmod — Change permissions<br>
        sudo — Run authorized admin command
        </div>`;

    case "roadmap":
      return `<div class="result">
        <b>Cybersecurity Learning Roadmap</b><br><br>
        1. Computer & Internet Basics<br>
        2. Networking Fundamentals<br>
        3. Linux Basics<br>
        4. HTML, CSS & JavaScript<br>
        5. Cybersecurity Fundamentals<br>
        6. Web Security & OWASP Top 10<br>
        7. Practice on legal CTF labs<br>
        8. Defensive Security
        </div>`;

    default:
      return `<div class="result">Tool not found.</div>`;
  }
}

// VALIDATE DOMAIN
function getDomain() {
  let value = $("domainInput").value.trim().toLowerCase();

  value = value.replace(/^https?:\/\//, "");
  value = value.split("/")[0];

  if (!/^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(value)) {
    throw new Error("Enter a valid public domain name.");
  }

  return value;
}

function displayResult(data) {
  $("result").textContent = typeof data === "string"
    ? data
    : JSON.stringify(data, null, 2);
}

async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("API request failed: " + response.status);
  }

  return response.json();
}

async function safeRun(callback) {
  try {
    $("result").textContent = "Loading...";
    await callback();
  } catch (error) {
    displayResult("Error: " + error.message);
  }
}

// DNS LOOKUP
async function runDNS() {
  safeRun(async () => {
    const domain = getDomain();
    const types = ["A", "AAAA", "MX", "NS", "TXT", "CNAME"];
    let output = {};

    for (const type of types) {
      try {
        const data = await fetchJSON(
          `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`
        );

        output[type] = (data.Answer || []).map(record => record.data);
      } catch {
        output[type] = ["Lookup unavailable"];
      }
    }

    displayResult(output);
  });
}

// PUBLIC IP LOOKUP
async function runIP() {
  safeRun(async () => {
    const data = await fetchJSON("https://ipwho.is/");
    displayResult(data);
  });
}

// DOMAIN INFO — RDAP
async function runWHOIS() {
  safeRun(async () => {
    const domain = getDomain();
    const data = await fetchJSON(
      `https://rdap.org/domain/${encodeURIComponent(domain)}`
    );

    displayResult({
      domain: data.ldhName,
      status: data.status,
      events: data.events,
      nameservers: data.nameservers?.map(n => n.ldhName)
    });
  });
}

// PUBLIC CERTIFICATE TRANSPARENCY RECORDS
async function runSubdomains() {
  safeRun(async () => {
    const domain = getDomain();
    const response = await fetch(
      `https://crt.sh/?q=%25.${encodeURIComponent(domain)}&output=json`
    );

    if (!response.ok) throw new Error("Certificate lookup unavailable.");

    const data = await response.json();

    const names = [...new Set(
      data.flatMap(item => item.name_value.split("\n"))
        .map(name => name.replace(/^\*\./, ""))
        .filter(name => name.endsWith(domain))
    )];

    displayResult(names.length ? names : "No public records found.");
  });
}

// SSL INFO VIA CERTIFICATE TRANSPARENCY
async function runSSL() {
  safeRun(async () => {
    const domain = getDomain();
    const data = await fetchJSON(
      `https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`
    );

    const records = data.slice(0, 10).map(item => ({
      issuer: item.issuer_name,
      commonName: item.common_name,
      notBefore: item.not_before,
      notAfter: item.not_after
    }));

    displayResult(records);
  });
}

// SECURITY HEADERS
async function runHeaders() {
  safeRun(async () => {
    const domain = getDomain();
    const url = `https://${domain}`;

    try {
      const response = await fetch(url, { method: "HEAD" });

      const headers = [
        "content-security-policy",
        "strict-transport-security",
        "x-content-type-options",
        "x-frame-options",
        "referrer-policy",
        "permissions-policy"
      ];

      const report = {};

      headers.forEach(header => {
        report[header] = response.headers.get(header) || "Not exposed to browser";
      });

      displayResult(report);
    } catch {
      displayResult(
        "Browser CORS restrictions prevent reading these headers. " +
        "This is not proof that the website is insecure."
      );
    }
  });
}

// WEBSITE STATUS
async function runUptime() {
  safeRun(async () => {
    const domain = getDomain();

    try {
      await fetch(`https://${domain}`, {
        mode: "no-cors",
        signal: AbortSignal.timeout(8000)
      });

      displayResult(
        "A request was sent. Browser opaque responses cannot confirm " +
        "the website's actual HTTP status."
      );
    } catch {
      displayResult(
        "Request failed or timed out. This does not conclusively mean " +
        "the website is offline."
      );
    }
  });
}

// PAGE METADATA
async function runMetadata() {
  safeRun(async () => {
    const domain = getDomain();

    try {
      const response = await fetch(`https://${domain}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      displayResult({
        title: doc.title,
        description: doc.querySelector('meta[name="description"]')?.content,
        keywords: doc.querySelector('meta[name="keywords"]')?.content
      });
    } catch {
      displayResult(
        "The target blocks browser access through CORS. " +
        "Metadata could not be retrieved."
      );
    }
  });
}

// PASSWORD ANALYZER — LOCAL ONLY
function runPassword() {
  const password = $("textInput").value;

  if (!password) {
    displayResult("Enter a password to analyze.");
    return;
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const labels = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
    "Excellent"
  ];

  displayResult(
    "Strength: " + labels[score] +
    "\nLength: " + password.length +
    "\n\nThis analysis runs locally. Password is not transmitted."
  );
}

// URL SAFETY INDICATORS
function runURL() {
  const value = $("urlInput").value.trim();

  try {
    const url = new URL(value);
    const warnings = [];

    if (url.protocol !== "https:") warnings.push("Not HTTPS");
    if (url.username || url.password) warnings.push("URL contains user credentials");
    if (url.hostname.includes("xn--")) warnings.push("Punycode hostname");
    if (/^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)) warnings.push("IP address used as hostname");
    if (url.hostname.split(".").length > 5) warnings.push("Many subdomain levels");

    displayResult({
      hostname: url.hostname,
      protocol: url.protocol,
      indicators: warnings.length ? warnings : ["No basic indicators detected"],
      note: "This is a heuristic check, not a definitive reputation verdict."
    });
  } catch {
    displayResult("Enter a valid URL.");
  }
}

// SHA-256
async function runHash() {
  const text = $("textInput").value;

  if (!text) {
    displayResult("Enter text.");
    return;
  }

  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", bytes);

  const hex = [...new Uint8Array(hash)]
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");

  displayResult(hex);
}

// BASE64 ENCODE
function runBase64Encode() {
  try {
    const bytes = new TextEncoder().encode($("textInput").value);
    let binary = "";

    bytes.forEach(byte => binary += String.fromCharCode(byte));

    displayResult(btoa(binary));
  } catch {
    displayResult("Encoding failed.");
  }
}

// BASE64 DECODE
function runBase64Decode() {
  try {
    const binary = atob($("textInput").value.trim());
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));

    displayResult(new TextDecoder().decode(bytes));
  } catch {
    displayResult("Invalid Base64 input.");
  }
}

// JWT DECODER — DOES NOT VERIFY SIGNATURE
function runJWT() {
  try {
    const token = $("textInput").value.trim();
    const parts = token.split(".");

    if (parts.length !== 3) throw new Error("Invalid JWT format.");

    function decodePart(part) {
      const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
      return JSON.parse(atob(padded));
    }

    displayResult({
      header: decodePart(parts[0]),
      payload: decodePart(parts[1]),
      note: "Decoded only. Signature has not been verified."
    });
  } catch (error) {
    displayResult(error.message);
  }
}

// JSON FORMATTER
function runJSON() {
  try {
    const value = JSON.parse($("textInput").value);
    displayResult(JSON.stringify(value, null, 2));
  } catch {
    displayResult("Invalid JSON.");
  }
}

// REGEX TESTER
function runRegex() {
  try {
    const pattern = $("regexInput").value;
    const text = $("regexText").value;
    const regex = new RegExp(pattern, "g");

    displayResult(text.match(regex) || "No matches found.");
  } catch (error) {
    displayResult("Regex error: " + error.message);
  }
}

// QUIZ
function quizAnswer(answer) {
  displayResult(
    answer === "HTTPS"
      ? "Correct! HTTPS encrypts web traffic using TLS."
      : "Incorrect. Try again!"
  );
}

// TERMINAL
const terminalCommands = {
  help: "Commands: help, date, whoami, about, status, tools, clear",
  whoami: "User: SHADOW Operator",
  about: "SHADOW OS V3 — Cybersecurity learning toolkit",
  status: "System status: ONLINE",
  tools: "OSINT | Security Lab | Cyber Utilities | Learning Lab"
};

$("terminalInput").addEventListener("keydown", event => {
  if (event.key !== "Enter") return;

  const command = event.target.value.trim().toLowerCase();
  const output = $("terminalOutput");

  if (!command) return;

  if (command === "clear") {
    output.innerHTML = "";
  } else if (command === "date") {
    output.textContent += "\n" + new Date().toString();
  } else if (terminalCommands[command]) {
    output.textContent += "\n" + terminalCommands[command];
  } else {
    output.textContent += "\nCommand not found. Type help.";
  }

  output.textContent += "\n\n";
  event.target.value = "";
  output.scrollTop = output.scrollHeight;
});

showPage("dashboard");
