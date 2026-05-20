# HTML-QRCode-Generator

[English](./README.md) | [繁體中文](./README_zh_tw.md)

## 專案簡介

這是一個前端 QR Code 產生器，可將有效網址轉換為 QR Code 圖片。  
目前支援英文與繁體中文介面、點擊下載 PNG、網址歷史操作，以及本機偏好儲存。

## 功能特色

- 輸入有效網址後約 1 秒自動產生 QR Code。
- 點擊產生出的 QR Code 圖片即可下載 PNG。
- 下載檔名格式為 `qrcode_<hostname>_<timestamp>.png`。
- 提供網址歷史清單操作：使用、刪除、清空（最多 20 筆）。
- 支援英文與繁體中文語系切換。
- 會將語系選擇與最後輸入網址儲存於 `localStorage`。

## 使用方式

1. 直接以瀏覽器開啟 `index.html`，或以靜態檔案伺服器提供此專案。
2. 輸入有效網址，例如 `https://example.com`。
3. 等待系統自動產生 QR Code。
4. 點擊 QR Code 圖片以下載 PNG 檔案。
5. 可在歷史區塊重用或管理先前輸入的網址。

## 技術棧

- HTML
- CSS
- JavaScript（ES Modules）
- 透過 CDN 載入 [`qrcode-generator`](https://www.npmjs.com/package/qrcode-generator)
- Playwright（E2E 測試）
- Docker Compose（測試執行流程）

## 測試

- 直接執行 E2E 測試：
  - `npm run test:e2e`
- 使用 Docker 測試流程：
  - `npm start`

Playwright 的基準網址為 `http://localhost:8080`。

## 專案連結

- GitHub: [https://github.com/pulipulichen/HTML-QRCode-Generator](https://github.com/pulipulichen/HTML-QRCode-Generator)
