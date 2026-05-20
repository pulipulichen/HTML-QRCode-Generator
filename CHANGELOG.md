# Changelog

## 2026-05-20

### Added

- Added i18n architecture and split language dictionaries:
  - `scripts/modules/i18n.js`
  - `scripts/modules/i18n/en.js`
  - `scripts/modules/i18n/zh-TW.js`
- Added Playwright E2E tests and configuration:
  - `e2e/i18n.spec.js`
  - `playwright.config.js`
- Added Docker-based test infrastructure:
  - `Dockerfile.test`
  - `docker-compose.yml`
  - `package.json` (`start`, `test:e2e` scripts)
- Added GitHub Actions workflow for automated E2E testing:
  - `.github/workflows/e2e.yml`
- Added `.gitignore` rules for test outputs and dependency directories.
- Added Traditional Chinese README:
  - `README_zh_tw.md`

### Changed

- Updated `index.html` with i18n bindings (`data-i18n`, `data-i18n-placeholder`) and added a language switcher.
- Refactored `script.js` into module-based translation flow with `t()`, including live text updates on language change and localStorage language persistence.
- Updated `style.css` with language switcher styles.
- Switched the QRCode script source in `index.html` to CDN to avoid missing local file errors.
- Restructured project assets: moved `script.js` to `scripts/script.js` and `style.css` to `styles/style.css`.
- Updated static asset references in `index.html` to match the new directory structure.
- Rewrote `README.md` in English and aligned bilingual links and working test commands with the current project state.
