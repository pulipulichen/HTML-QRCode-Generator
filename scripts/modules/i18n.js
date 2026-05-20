import { en } from "./i18n/en.js";
import { zhTW } from "./i18n/zh-TW.js";

const STORAGE_KEY = "qrcodeGenerator_language";
const DEFAULT_LANGUAGE = "en";

const TRANSLATIONS = {
    en,
    "zh-TW": zhTW,
};

export const SUPPORTED_LANGUAGES = Object.keys(TRANSLATIONS);

let currentLanguage = DEFAULT_LANGUAGE;

function getNestedValue(source, path) {
    return path.split(".").reduce((accumulator, segment) => {
        if (accumulator && Object.prototype.hasOwnProperty.call(accumulator, segment)) {
            return accumulator[segment];
        }
        return undefined;
    }, source);
}

function detectBrowserLanguage() {
    const browserLanguages = [
        ...(navigator.languages || []),
        navigator.language || "",
    ];

    for (const lang of browserLanguages) {
        if (SUPPORTED_LANGUAGES.includes(lang)) {
            return lang;
        }

        const normalized = lang.split("-")[0];
        const matched = SUPPORTED_LANGUAGES.find((candidate) => candidate.split("-")[0] === normalized);
        if (matched) {
            return matched;
        }
    }

    return DEFAULT_LANGUAGE;
}

function resolveInitialLanguage() {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);
    if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
        return storedLanguage;
    }

    return detectBrowserLanguage();
}

export function t(key) {
    const languagePack = TRANSLATIONS[currentLanguage] || TRANSLATIONS[DEFAULT_LANGUAGE];
    const translated = getNestedValue(languagePack, key);

    if (typeof translated === "string") {
        return translated;
    }

    const fallback = getNestedValue(TRANSLATIONS[DEFAULT_LANGUAGE], key);
    return typeof fallback === "string" ? fallback : key;
}

function applyDocumentTranslations() {
    document.documentElement.lang = currentLanguage;
    document.title = t("app.pageTitle");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (key) {
            element.textContent = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        if (key) {
            element.setAttribute("placeholder", t(key));
        }
    });
}

export function setLanguage(language, options = { persist: true }) {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
        return;
    }

    currentLanguage = language;

    if (options.persist) {
        localStorage.setItem(STORAGE_KEY, currentLanguage);
    }

    applyDocumentTranslations();
    window.dispatchEvent(
        new CustomEvent("i18n:languageChanged", {
            detail: { language: currentLanguage },
        }),
    );
}

export function getLanguage() {
    return currentLanguage;
}

export function initI18n() {
    currentLanguage = resolveInitialLanguage();
    applyDocumentTranslations();

    const languageSelect = document.getElementById("language-select");
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener("change", (event) => {
            setLanguage(event.target.value);
        });
    }
}

export function onLanguageChange(callback) {
    window.addEventListener("i18n:languageChanged", (event) => {
        callback(event.detail.language);
    });
}
