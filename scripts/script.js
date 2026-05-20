import { initI18n, onLanguageChange, t } from "./modules/i18n.js";

let urlHistory = [];
let inputTimer = null;

const URL_STORAGE_KEY = "urlInput";

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function setupInputEvents() {
    const urlInput = document.getElementById("urlInput");

    urlInput.value = localStorage.getItem(URL_STORAGE_KEY) || "";

    if (urlInput.value.trim() !== "") {
        generateQR();
    }

    urlInput.addEventListener("focus", function () {
        this.select();
    });

    urlInput.addEventListener("click", function () {
        this.select();
    });

    urlInput.addEventListener("input", function () {
        if (inputTimer) {
            clearTimeout(inputTimer);
        }

        inputTimer = setTimeout(() => {
            const url = this.value.trim();
            if (url) {
                generateQR();
            }
        }, 1000);
    });

    urlInput.addEventListener("change", function () {
        localStorage.setItem(URL_STORAGE_KEY, this.value);
    });
}

function generateQR() {
    const url = document.getElementById("urlInput").value.trim();

    if (!url) {
        return;
    }

    try {
        new URL(url);
    } catch (_error) {
        return;
    }

    if (typeof qrcode === "undefined") {
        console.log("QRCode library is loading...");
        setTimeout(() => generateQR(), 500);
        return;
    }

    try {
        const qrCodeDiv = document.getElementById("qrcode");
        qrCodeDiv.innerHTML = "";

        const qr = qrcode(0, "M");
        qr.addData(url);
        qr.make();

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = 512;
        const moduleCount = qr.getModuleCount();
        const cellSize = size / moduleCount;

        canvas.width = size;
        canvas.height = size;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = "#000000";
        for (let row = 0; row < moduleCount; row += 1) {
            for (let col = 0; col < moduleCount; col += 1) {
                if (qr.isDark(row, col)) {
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        }

        qrCodeDiv.appendChild(canvas);

        canvas.style.cursor = "pointer";
        canvas.style.transition = "transform 0.3s ease";
        canvas.addEventListener("click", function () {
            downloadQR(canvas, url);
        });

        canvas.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.02)";
        });

        canvas.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });

        const hint = document.getElementById("downloadHint");
        hint.classList.add("show");
        hint.textContent = t("download.hint");

        addToHistory(url);
    } catch (error) {
        console.error("QR generation error:", error);
        setTimeout(() => generateQR(), 1000);
    }
}

function downloadQR(canvas, url) {
    try {
        const link = document.createElement("a");
        const timestamp = new Date().getTime();
        const hostname = new URL(url).hostname.replace(/\./g, "_");
        link.download = `qrcode_${hostname}_${timestamp}.png`;

        const dataURL = canvas.toDataURL("image/png");
        link.href = dataURL;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showDownloadSuccess();
    } catch (error) {
        console.error("Download failed:", error);
        alert(t("download.failedAlert"));
    }
}

function showDownloadSuccess() {
    const hint = document.getElementById("downloadHint");
    const originalText = t("download.hint");
    hint.textContent = t("download.success");
    hint.style.color = "#4CAF50";

    setTimeout(() => {
        hint.textContent = originalText;
        hint.style.color = "#666";
    }, 2000);
}

function addToHistory(url) {
    if (!urlHistory.includes(url)) {
        urlHistory.unshift(url);

        if (urlHistory.length > 20) {
            urlHistory = urlHistory.slice(0, 20);
        }

        updateHistoryDisplay();
    }
}

function updateHistoryDisplay() {
    const historyList = document.getElementById("historyList");

    if (urlHistory.length === 0) {
        historyList.innerHTML = `<div class="empty-history">${t("history.empty")}</div>`;
        return;
    }

    historyList.innerHTML = urlHistory
        .map((url, index) => {
            const escapedUrl = escapeHtml(url);
            const encodedUrl = encodeURIComponent(url);
            return `
                <div class="history-item">
                    <div class="history-url">${escapedUrl}</div>
                    <div class="history-actions">
                        <button class="use-btn" data-action="use" data-url="${encodedUrl}">${t("history.use")}</button>
                        <button class="delete-btn" data-action="delete" data-index="${index}">${t("history.delete")}</button>
                    </div>
                </div>
            `;
        })
        .join("");
}

function useUrl(url) {
    document.getElementById("urlInput").value = url;
    if (inputTimer) {
        clearTimeout(inputTimer);
    }
    generateQR();
}

function deleteUrl(index) {
    urlHistory.splice(index, 1);
    updateHistoryDisplay();
}

function clearHistory() {
    if (confirm(t("history.confirmClear"))) {
        urlHistory = [];
        updateHistoryDisplay();
    }
}

function setupHistoryEvents() {
    const historyList = document.getElementById("historyList");
    historyList.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const { action } = target.dataset;
        if (action === "use" && target.dataset.url) {
            useUrl(decodeURIComponent(target.dataset.url));
        }

        if (action === "delete" && target.dataset.index) {
            deleteUrl(Number(target.dataset.index));
        }
    });

    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    clearHistoryBtn.addEventListener("click", clearHistory);
}

window.addEventListener("DOMContentLoaded", () => {
    initI18n();
    setupInputEvents();
    setupHistoryEvents();
    updateHistoryDisplay();

    onLanguageChange(() => {
        updateHistoryDisplay();
    });
});
