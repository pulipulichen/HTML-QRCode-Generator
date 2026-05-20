# HTML-QRCode-Generator

## 專案簡介 | Overview

**中文：**  
這是一個純前端 QR Code 產生器，可將有效網址即時轉換為 QR Code 圖片。  
目前支援中英雙語介面、點擊 QR Code 下載 PNG、以及網址歷史清單操作。

**English:**  
This is a frontend QR code generator that converts valid URLs into QR code images in real time.  
It currently supports bilingual UI (English/Traditional Chinese), click-to-download PNG, and URL history actions.

## 功能特色 | Features

- **中文：** 輸入有效網址後（約 1 秒）自動產生 QR Code。  
  **English:** Automatically generates a QR code for a valid URL (about 1 second after input).
- **中文：** 點擊 QR Code 可下載 PNG 檔，檔名包含網域與時間戳。  
  **English:** Click the QR code to download a PNG file named with hostname and timestamp.
- **中文：** 提供網址歷史清單（最多 20 筆），可「使用 / 刪除 / 清空」。  
  **English:** Provides URL history (up to 20 entries) with Use / Delete / Clear actions.
- **中文：** 支援英文與繁體中文切換，並記住語言偏好。  
  **English:** Supports English and Traditional Chinese, and remembers language preference.
- **中文：** 會記住最後一次輸入的網址並於下次開啟時帶入。  
  **English:** Remembers the last entered URL and restores it on next visit.

## 使用方式 | How to Use

1. **中文：** 開啟網站頁面。  
   **English:** Open the web page.
2. **中文：** 在輸入欄位貼上或輸入有效網址（例如 `https://example.com`）。  
   **English:** Paste or type a URL into the input field.
3. **中文：** 等待自動產生 QR Code，點擊圖片即可下載。  
   **English:** Wait for the QR code to appear, then click it to download.
4. **中文：** 可在歷史清單重用網址，或切換介面語言。  
   **English:** Reuse URLs from history or switch the interface language.

## 技術棧 | Tech Stack

- **HTML**：頁面結構與表單元件  
  **HTML**: Page structure and form elements
- **CSS**：版面配置與視覺樣式  
  **CSS**: Layout and visual styling
- **JavaScript (ES Modules)**：輸入處理、歷史清單、i18n 與下載流程  
  **JavaScript (ES Modules)**: Input handling, history, i18n, and download flow
- **qrcode-generator**：QR Code 產生函式庫（透過 CDN 載入）  
  **qrcode-generator**: QR code generation library loaded via CDN

## 測試 | Testing

- **中文：** 專案包含 Playwright E2E 測試設定，基準網址為 `http://localhost:8080`。  
  **English:** The project includes Playwright E2E configuration with `http://localhost:8080` as base URL.
- **中文：** 可使用 `npm run test:e2e` 執行測試。  
  **English:** Run tests with `npm run test:e2e`.

## 專案連結 | Project Link

- GitHub: [https://github.com/pulipulichen/HTML-QRCode-Generator](https://github.com/pulipulichen/HTML-QRCode-Generator)