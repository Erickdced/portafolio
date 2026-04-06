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

const mobileMenuMediaQuery = window.matchMedia("(max-width: 640px)");

const elements = {
    nav: document.querySelector("nav"),
    menuToggle: document.getElementById("menuToggle"),
    buttons: document.getElementById("buttons"),
    navLinks: document.querySelectorAll("#buttons .navLink"),
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
        const colonIndex = value.indexOf(":");
        const dashIndex = value.indexOf("—");
        const splitIndex = colonIndex > -1
            ? colonIndex
            : dashIndex;

        if (splitIndex > -1)
        {
            const lead = value.slice(0, splitIndex + 1);
            const rest = value.slice(splitIndex + 1).trimStart();
            const leadStrong = document.createElement("strong");
            leadStrong.className = "bulletLead";
            leadStrong.textContent = lead;
            li.appendChild(leadStrong);
            if (rest)
            {
                li.appendChild(document.createTextNode(` ${rest}`));
            }
        }
        else
        {
            li.textContent = value;
        }

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

    if (typeof window.afterProjectLanguageSet === "function")
    {
        window.afterProjectLanguageSet(lang, copy);
    }

    elements.enBtn.classList.toggle("isActive", lang === "en");
    elements.esBtn.classList.toggle("isActive", lang === "es");
    setPreference(LANG_KEY, lang);
}

function closeMobileMenu()
{
    if (!elements.buttons)
    {
        return;
    }

    elements.buttons.classList.remove("isOpen");
    if (elements.menuToggle)
    {
        elements.menuToggle.setAttribute("aria-expanded", "false");
        elements.menuToggle.textContent = "☰";
    }
}

function toggleMobileMenu()
{
    if (!elements.buttons || !elements.menuToggle)
    {
        return;
    }

    const isOpen = elements.buttons.classList.toggle("isOpen");
    elements.menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    elements.menuToggle.textContent = isOpen ? "✕" : "☰";
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

    if (elements.menuToggle)
    {
        elements.menuToggle.addEventListener("click", toggleMobileMenu);
        elements.navLinks.forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", (event) => {
            if (!mobileMenuMediaQuery.matches || !elements.buttons || !elements.nav)
            {
                return;
            }

            if (!elements.buttons.classList.contains("isOpen"))
            {
                return;
            }

            if (!elements.nav.contains(event.target))
            {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (!mobileMenuMediaQuery.matches)
            {
                closeMobileMenu();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", init);
