# HTML-QRCode-Generator

[English](./README.md) | [繁體中文](./README_zh_tw.md)

## Overview

This project is a frontend QR code generator that converts valid URLs into QR code images.  
It includes bilingual UI support (English and Traditional Chinese), click-to-download PNG output, URL history actions, and local preference persistence.

## Features

- Automatically generates a QR code about 1 second after valid URL input.
- Downloads the generated QR code as a PNG when the image is clicked.
- Uses a filename format of `qrcode_<hostname>_<timestamp>.png` for downloads.
- Provides URL history actions: Use, Delete, and Clear (up to 20 entries).
- Supports language switching between English and Traditional Chinese.
- Persists selected language and last input URL in `localStorage`.

## Usage

1. Open `index.html` in a browser, or serve the project with a static file server.
2. Enter a valid URL, for example `https://example.com`.
3. Wait for the QR code to be generated automatically.
4. Click the QR code image to download it as a PNG file.
5. Reuse or manage past URLs from the history section.

## Tech Stack

- HTML
- CSS
- JavaScript (ES Modules)
- [`qrcode-generator`](https://www.npmjs.com/package/qrcode-generator) via CDN
- Playwright (for E2E tests)
- Docker Compose (test runner workflow)

## Testing

- Run E2E tests directly with:
  - `npm run test:e2e`
- Run the Docker-based test workflow with:
  - `npm start`

The Playwright base URL is `http://localhost:8080`.

## Project Link

- GitHub: [https://github.com/pulipulichen/HTML-QRCode-Generator](https://github.com/pulipulichen/HTML-QRCode-Generator)
