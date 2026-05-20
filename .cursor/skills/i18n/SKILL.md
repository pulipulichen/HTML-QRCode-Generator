---
name: i18n
description: 規劃與實作前端多語系（i18n）重構，包含語系字典拆分、瀏覽器語系偵測、手動切換與 localStorage 記憶，並補齊 Playwright E2E 驗證。當使用者提到 i18n、多語系、語系切換、localStorage 語系記憶、國際化或翻譯檔拆分時使用。
---

# i18n Workflow

## 目標

把單語系頁面重構為可維護的多語系架構，並以 E2E 測試驗證語系行為。

## 目錄與檔案規範

1. 語系資料集中在 `scripts/modules/i18n/`。
2. 每種語系獨立一個檔案，例如：
   - `scripts/modules/i18n/en.js`
   - `scripts/modules/i18n/zh-TW.js`
3. `scripts/modules/i18n.js` 僅保留：
   - 語系選擇邏輯
   - `t()` 取字串邏輯
   - DOM 套用翻譯流程
   - 語系變更通知機制
4. `SUPPORTED_LANGUAGES` 由翻譯來源自動推導（例如 `Object.keys(TRANSLATIONS)`）。

## 行為規範

語系初始化順序必須是：

1. `localStorage` 已儲存語系（最高優先）
2. 瀏覽器語系（`navigator.language` / `navigator.languages`）
3. 預設語系（建議 `en`）

同時必須支援：

- 使用者手動切換語系（例如 `<select id="language-select">`）
- 切換後即時更新靜態與動態文字
- 將選擇寫入 `localStorage`（例如 `pdfMerger_language`）

## E2E 必測清單（Playwright）

至少包含以下情境：

1. **頁面載入語系檢查**
   - 驗證 `html[lang]` 與語系選單值一致
   - 驗證標題或主要標頭文案符合當前語系
2. **手動切換語系**
   - 切到 `zh-TW`（或目標語系）後，UI 文案立即變更
3. **持久化驗證**
   - 切換語系後，`localStorage` 有對應 key/value
   - `reload` 後語系仍維持先前選擇
4. **穩定性檢查**
   - 無 console error（可收集 `page.on('console')` 驗證）

## 完成定義

完成此類需求前，確認：

- [ ] 語系字典已拆分到 `i18n/` 語系檔
- [ ] `i18n.js` 不再內嵌大型翻譯物件
- [ ] 支援瀏覽器語系 + 手動切換 + localStorage 記憶
- [ ] E2E 已覆蓋語系載入、切換、持久化
- [ ] 測試可在專案既有測試流程中通過（如 Docker Playwright）
