<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Puppeteer-Automation-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PDF-Generator-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Stable-success?style=for-the-badge" />
</p>



# 📄 PortfolioOffer Generator

A multilingual PDF generator for creating professional website-offer documents (DE/EN/RU) using **HTML templates**, **JSON localization**, **Puppeteer**, and dynamic **QR-code** injection.

This tool allows freelancers and developers to quickly generate stylish, branded PDF offers — fully localized and ready to send to clients.

---

## 🚀 Features

### Localization

- 🇩🇪 German (**de**)
- 🇬🇧 English (**en**)
- 🇷🇺 Russian (**ru**)

Each language has its own JSON file with text content and language-specific CSS.

### Template-based PDF

- Single `index.html` template with `{{placeholders}}`
- Text, headings, lists, contacts, and discount blocks taken from JSON
- Language-specific body styles injected from JSON (`cssBody`)
- Automatic QR-code injection for WhatsApp & Telegram

### Puppeteer PDF rendering

- High-quality **A4** PDF output
- Full background rendering
- Stable typography & layout
- Automatic local file access for images (QR codes)

### Total flexibility

- Update translation JSON files
- Customize the HTML layout
- Replace QR images
- Adjust CSS per language
- Add new languages with minimal effort

---

## 📁 Project Structure

```text
PortfolioOffer_Generator
│
├─ index.html                  # Main HTML template with {{placeholders}}
├─ index.js                    # (optional) JS entry
│
├─ resources/
│   ├─ i18n/                   # Localization files
│   │   ├─ de.json             # German locale
│   │   ├─ en.json             # English locale
│   │   └─ ru.json             # Russian locale
│   │
│   └─ qr_imgs/                # QR-code images
│       ├─ qr_whatsapp_gold.png
│       └─ qr_telegram_gold.png
│
├─ scripts/
│   └─ makepdf.js              # Core PDF generator script
│
└─ storage/
    ├─ pdf/                    # Generated PDFs
    │   ├─ Oleksandr_Stanov_de.pdf
    │   ├─ Oleksandr_Stanov_en.pdf
    │   └─ Oleksandr_Stanov_ru.pdf
    │
    └─ temp_render.html        # Temporary rendered HTML before PDF
```

---

## 🛠 Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your_repo>/PortfolioOffer_Generator.git
cd PortfolioOffer_Generator

npm install

# German
node scripts/makepdf.js de

# English
node scripts/makepdf.js en

# Russian
node scripts/makepdf.js ru
```

## 🌐 Localization Details

- Every language file inside resources/i18n contains:
- All text blocks
- Section titles
- List items
- Contact info
- Discount text

Example: resources/i18n/de.json
```json
{
  "lang": "de",
  "title": "Angebot – Website-Visitenkarte",

  "specialPrice": "Sonderpreis",
  "promoText": "Dieses Promo-Angebot wurde zur Erweiterung meines Portfolios erstellt.",
  "marketPrice": "Der reale Marktwert einer solchen Website liegt bei",
  "marketRange": "2000–3000 €",

  "included": "Was im Angebot enthalten ist",
  "design": "Design",
  "design_1": "Modernes, individuelles Interface",
  "design_2": "Responsives Layout (PC, Tablet, Smartphone)",
  "design_3": "Visuell harmonische Struktur",
  "design_4": "Moderne UI-Patterns und Typografie",
  "design_5": "Verwendung der Markenfarben des Kunden",

  "cssBody": "body { margin:0; padding:0; background:#0b111d; font-family:'DejaVu Sans',Arial,sans-serif; font-size:18px; line-height:1.49; }"
}
```
Any key defined in JSON can be placed inside HTML:

```html
{{design_1}}
{{promoText}}
{{marketPrice}}
{{cssBody}}
```

## 🧩 Template Rendering Logic
```html
<h2>{{specialPrice}}: 600 €</h2>

<p>
    {{promoText}}<br>
    {{marketPrice}} <b>{{marketRange}}</b>.
</p>

<p>{{whatsapp}}</p>
<img src="{{qr_whatsapp}}" />

```

## 🖼 QR Code System
```bash
resources/qr_imgs/
  ├─ qr_whatsapp_gold.png
  └─ qr_telegram_gold.png
```
Available inside template as:
```html
{{qr_whatsapp}}
{{qr_telegram}}

```
## 🔧 Requirements

- Node.js 18+
- npm
- Internet access (for Puppeteer’s Chromium download)

## 🤝 Contributing

- Pull requests are welcome!
- You can contribute by:
- Adding more languages
- Improving translations
- Extending PDF layout
- Adding pricing tables / timelines
- Supporting multipage export
- Adding dark/light themes

## 📜 License

This project is licensed under the MIT License.
Free for personal and commercial use.