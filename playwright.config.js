import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "e2e",
    timeout: 60000,
    fullyParallel: true,
    outputDir: "playwright-report-videos",
    reporter: [["html", { open: "never", outputFolder: "playwright-report" }]],
    use: {
        baseURL: "http://localhost:8080",
        trace: "retain-on-failure",
        video: "retain-on-failure",
    },
});
