const https = require("https");
const http = require("http");

const BOT_TOKEN = "8333016105:AAHj5sM10f3pG5qPVEscdd02_rojC41I6eM";
const CHAT_ID = "-1003759263483";
const SITE_URL = "http://localhost:3000/api/health";

let offset = 0;

function tgRequest(method, params) {
  return new Promise((resolve) => {
    const body = JSON.stringify(params);
    const req = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${BOT_TOKEN}/${method}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(JSON.parse(data)));
      }
    );
    req.on("error", () => resolve(null));
    req.write(body);
    req.end();
  });
}

function sendMessage(chatId, text) {
  return tgRequest("sendMessage", { chat_id: chatId, text });
}

function checkHealth() {
  return new Promise((resolve) => {
    const req = http.get(SITE_URL, { timeout: 10000 }, (res) => {
      resolve({ ok: res.statusCode === 200, code: res.statusCode });
    });
    req.on("error", () => resolve({ ok: false, code: "no response" }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ ok: false, code: "timeout" });
    });
  });
}

let siteWasDown = false;

setInterval(async () => {
  const { ok, code } = await checkHealth();
  if (!ok && !siteWasDown) {
    siteWasDown = true;
    await sendMessage(
      CHAT_ID,
      "🚨 lkz-site УПАЛ\nКод: " +
        code +
        "\nВремя: " +
        new Date().toLocaleString("ru") +
        "\n\nПроверь: pm2 logs lkz-site --err"
    );
  } else if (ok && siteWasDown) {
    siteWasDown = false;
    await sendMessage(
      CHAT_ID,
      "✅ lkz-site ВОССТАНОВЛЕН\nВремя: " + new Date().toLocaleString("ru")
    );
  }
}, 5 * 60 * 1000);

async function poll() {
  while (true) {
    const res = await tgRequest("getUpdates", {
      offset,
      timeout: 60,
      allowed_updates: ["message"],
    });
    if (!res || !res.result) {
      await new Promise((r) => setTimeout(r, 5000));
      continue;
    }

    for (const update of res.result) {
      offset = update.update_id + 1;
      const text = update.message && update.message.text;
      const chatId = update.message && update.message.chat && update.message.chat.id;
      if (!text || !chatId) continue;

      if (text.startsWith("/health")) {
        const { ok, code } = await checkHealth();
        const msg = ok
          ? "✅ Сайт работает\nКод: " + code + "\nВремя: " + new Date().toLocaleString("ru")
          : "🚨 Сайт НЕ ОТВЕЧАЕТ\nКод: " + code + "\nВремя: " + new Date().toLocaleString("ru");
        await sendMessage(chatId, msg);
      }
    }
  }
}

poll();
console.log("Bot started. Monitoring every 5 min. Commands: /health");
