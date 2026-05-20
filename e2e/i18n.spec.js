import { expect, test } from "@playwright/test";

test.describe("i18n behavior", () => {
    test("loads with a consistent initial language state", async ({ page }) => {
        const consoleErrors = [];
        page.on("console", (msg) => {
            if (msg.type() === "error") {
                consoleErrors.push(msg.text());
            }
        });

        await page.goto("/");

        const htmlLang = page.locator("html");
        const languageSelect = page.locator("#language-select");
        const heading = page.locator("h1");

        await expect(languageSelect).toBeVisible();
        await expect(htmlLang).toHaveAttribute("lang", "en");
        await expect(languageSelect).toHaveValue("en");
        await expect(heading).toContainText("QR Code Generator");

        await page.waitForLoadState("networkidle");
        expect(consoleErrors).toHaveLength(0);
    });

    test("switches language to zh-TW immediately", async ({ page }) => {
        const consoleErrors = [];
        page.on("console", (msg) => {
            if (msg.type() === "error") {
                consoleErrors.push(msg.text());
            }
        });

        await page.goto("/");

        await page.selectOption("#language-select", "zh-TW");

        await expect(page.locator("html")).toHaveAttribute("lang", "zh-TW");
        await expect(page.locator("h1")).toContainText("QR碼生成器");
        await expect(page.locator("#downloadHint")).toContainText("點擊QR碼即可下載");

        await page.waitForLoadState("networkidle");
        expect(consoleErrors).toHaveLength(0);
    });

    test("persists selected language in localStorage after reload", async ({ page }) => {
        const consoleErrors = [];
        page.on("console", (msg) => {
            if (msg.type() === "error") {
                consoleErrors.push(msg.text());
            }
        });

        await page.goto("/");
        await page.selectOption("#language-select", "zh-TW");

        const storedLanguage = await page.evaluate(() => localStorage.getItem("qrcodeGenerator_language"));
        expect(storedLanguage).toBe("zh-TW");

        await page.reload();

        await expect(page.locator("html")).toHaveAttribute("lang", "zh-TW");
        await expect(page.locator("#language-select")).toHaveValue("zh-TW");
        await expect(page.locator("h1")).toContainText("QR碼生成器");

        await page.waitForLoadState("networkidle");
        expect(consoleErrors).toHaveLength(0);
    });
});
