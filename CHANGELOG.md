## 2026-05-20

### Added
- 新增 i18n 架構與語系字典拆分：
  - `scripts/modules/i18n.js`
  - `scripts/modules/i18n/en.js`
  - `scripts/modules/i18n/zh-TW.js`
- 新增 Playwright E2E 測試與設定：
  - `e2e/i18n.spec.js`
  - `playwright.config.js`
- 新增 Docker 測試基礎設施：
  - `Dockerfile.test`
  - `docker-compose.yml`
  - `package.json`（`start`、`test:e2e` scripts）
- 新增 GitHub Actions 自動化測試流程：
  - `.github/workflows/e2e.yml`
- 新增 `.gitignore` 以忽略測試輸出與相依套件目錄。

### Changed
- `index.html` 改為 i18n 綁定格式（`data-i18n`、`data-i18n-placeholder`），新增語系切換選單。
- `script.js` 改為 module 並接入 `t()` 翻譯流程，支援語系切換後動態文案即時更新與 localStorage 語系記憶。
- `style.css` 新增語系切換器樣式。
- `index.html` 的 QRCode 腳本來源改為 CDN，避免缺少本地檔案造成錯誤。
- 專案結構重整：`script.js` 移至 `scripts/script.js`，`style.css` 移至 `styles/style.css`。
- `index.html` 的靜態資源引用路徑已同步更新為新目錄結構。
