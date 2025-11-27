const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Язык передаётся в CLI
const lang = process.argv[2] || "de";

// Пути
const i18nPath = path.resolve(__dirname, "../resources/i18n", `${lang}.json`);
const htmlTemplatePath = path.resolve(__dirname, "../index.html");
const qrBasePath = path.resolve(__dirname, "../resources/qr_imgs");
const cssPath = "file://" + path.resolve(__dirname, "../styles/index.css");

const tempHtmlPath = path.resolve(__dirname, "../storage/temp_render.html");
const outputPdfPath = path.resolve(
    __dirname,
    `../storage/pdf/Oleksandr_Stanov_${lang}.pdf`
);

// Проверяем JSON
if (!fs.existsSync(i18nPath)) {
    console.error("❌ Нет файла локализации:", i18nPath);
    process.exit(1);
}

// Загружаем локализацию
const dict = JSON.parse(fs.readFileSync(i18nPath, "utf8"));

// Читаем HTML
let html = fs.readFileSync(htmlTemplatePath, "utf8");

// Подставляем {{ключи}}
html = html.replace(/{{(\w+)}}/g, (match, key) => dict[key] || match);

// Абсолютные пути к QR
const qrWhatsapp = "file://" + path.resolve(qrBasePath, "qr_whatsapp_gold.png");
const qrTelegram = "file://" + path.resolve(qrBasePath, "qr_telegram_gold.png");

// Заменяем плейсхолдеры qr_whatsapp / qr_telegram
html = html
    .replace("{{qr_whatsapp}}", qrWhatsapp)
    .replace("{{qr_telegram}}", qrTelegram);

// Подставляем CSS для языка
html = html.replace("{{cssBody}}", dict.cssBody || "");

// Добавляем абсолютный CSS
html = html.replace("{{absoluteCss}}", `<link rel="stylesheet" href="${cssPath}">`);

// Сохраняем итоговый HTML
fs.writeFileSync(tempHtmlPath, html, "utf8");

// Генерация PDF
(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--allow-file-access-from-files"]
    });

    const page = await browser.newPage();
    await page.goto("file://" + tempHtmlPath, { waitUntil: "networkidle0" });

    await page.pdf({
        path: outputPdfPath,
        format: "A4",
        printBackground: true,
        margin: {
            top: "10mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm"
        }
    });

    await browser.close();

    console.log("🎉 PDF Done:", outputPdfPath);
})();
