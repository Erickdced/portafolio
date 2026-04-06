const THEME_KEY = "portfolio-theme";
const LANG_KEY = "portfolio-lang";

function setCookie(name, value, days = 365)
{
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name)
{
    const prefix = `${name}=`;
    const found = document.cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith(prefix));
    return found ? decodeURIComponent(found.substring(prefix.length)) : null;
}

function setPreference(key, value)
{
    setCookie(key, value);
    localStorage.setItem(key, value);
}

function getPreference(key)
{
    return getCookie(key) || localStorage.getItem(key);
}

function getDefaultLanguageFromBrowser()
{
    const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || "en"];

    const hasSpanish = browserLanguages
        .filter(Boolean)
        .map((lang) => lang.toLowerCase())
        .some((lang) => lang.startsWith("es"));

    return hasSpanish ? "es" : "en";
}

const elements = {
    themeToggle: document.getElementById("themeToggle"),
    enBtn: document.getElementById("enBtn"),
    esBtn: document.getElementById("esBtn"),
    langLabel: document.getElementById("langLabel"),
    themeText: document.getElementById("themeText"),
    nameLink: document.getElementById("nameLink"),
    navBack: document.getElementById("navBack"),
    pageTitle: document.getElementById("pageTitle"),
    pageSubtitle: document.getElementById("pageSubtitle"),
    backHomeBtn: document.getElementById("backHomeBtn"),
    sectionOverviewTitle: document.getElementById("sectionOverviewTitle"),
    sectionOverviewText: document.getElementById("sectionOverviewText"),
    sectionStackTitle: document.getElementById("sectionStackTitle"),
    stackList: document.getElementById("stackList"),
    sectionImpactTitle: document.getElementById("sectionImpactTitle"),
    impactList: document.getElementById("impactList")
};

function applyTheme(theme)
{
    document.body.setAttribute("data-theme", theme);
    elements.themeToggle.checked = theme === "dark";
    setPreference(THEME_KEY, theme);
}

function fillList(listElement, values)
{
    listElement.innerHTML = "";
    values.forEach((value) => {
        const li = document.createElement("li");
        li.textContent = value;
        listElement.appendChild(li);
    });
}

function setLanguage(lang)
{
    const copy = (window.PROJECT_PAGE && window.PROJECT_PAGE[lang]) || window.PROJECT_PAGE.en;

    document.documentElement.lang = lang;
    document.title = copy.pageTitle;
    elements.nameLink.textContent = copy.name;
    elements.navBack.textContent = copy.navBack;
    elements.langLabel.textContent = lang === "es" ? "Idioma:" : "Language:";
    elements.themeText.textContent = copy.themeText;
    elements.pageTitle.textContent = copy.projectTitle;
    elements.pageSubtitle.textContent = copy.projectSubtitle;
    elements.backHomeBtn.textContent = copy.backHome;
    elements.sectionOverviewTitle.textContent = copy.sectionOverviewTitle;
    elements.sectionOverviewText.textContent = copy.sectionOverviewText;
    elements.sectionStackTitle.textContent = copy.sectionStackTitle;
    elements.sectionImpactTitle.textContent = copy.sectionImpactTitle;

    fillList(elements.stackList, copy.stackItems);
    fillList(elements.impactList, copy.impactItems);

    elements.enBtn.classList.toggle("isActive", lang === "en");
    elements.esBtn.classList.toggle("isActive", lang === "es");
    setPreference(LANG_KEY, lang);
}

function init()
{
    const savedTheme = getPreference(THEME_KEY) || "dark";
    const savedLang = getPreference(LANG_KEY);
    const initialLang = savedLang === "es" || savedLang === "en"
        ? savedLang
        : getDefaultLanguageFromBrowser();

    applyTheme(savedTheme);
    setLanguage(initialLang);

    elements.themeToggle.addEventListener("change", () => {
        applyTheme(elements.themeToggle.checked ? "dark" : "light");
    });
    elements.enBtn.addEventListener("click", () => setLanguage("en"));
    elements.esBtn.addEventListener("click", () => setLanguage("es"));
}

document.addEventListener("DOMContentLoaded", init);
