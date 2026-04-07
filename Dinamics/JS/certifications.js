const THEME_KEY = "portfolio-theme";
const LANG_KEY = "portfolio-lang";
const mobileMenuMediaQuery = window.matchMedia("(max-width: 640px)");

const translations = {
    en: {
        pageTitle: "Certifications | Erick Cedillo",
        navBack: "Back",
        langLabel: "Language:",
        themeText: "Dark Mode",
        heroTitle: "Official Certifications",
        heroSubtitle: "Verified documents and awards.",
        backHome: "Back to home",
        listTitle: "Certificates",
        cert1Name: "Desarrollo de Proyectos Web con JavaScript",
        cert1Institution: "Institution: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
        cert2Name: "Procesamiento de Datos y Creación de Macros con Excel",
        cert2Institution: "Institution: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
        cert3Name: "Automatización de Tareas en Sistemas Linux con Programación Bash",
        cert3Institution: "Institution: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
        cert1Aria: "Open Desarrollo de Proyectos Web con JavaScript PDF",
        cert2Aria: "Open Procesamiento de Datos y Creación de Macros con Excel PDF",
        cert3Aria: "Open Automatización de Tareas en Sistemas Linux con Programación Bash PDF",
        cert1Alt: "Certificate preview: Desarrollo de Proyectos Web con JavaScript",
        cert2Alt: "Certificate preview: Procesamiento de Datos y Creación de Macros con Excel",
        cert3Alt: "Certificate preview: Automatización de Tareas en Sistemas Linux con Programación Bash"
    },
    es: {
        pageTitle: "Constancias | Erick Cedillo",
        navBack: "Volver",
        langLabel: "Idioma:",
        themeText: "Modo oscuro",
        heroTitle: "Constancias oficiales",
        heroSubtitle: "Documentos verificados y reconocimientos.",
        backHome: "Volver al inicio",
        listTitle: "Constancias",
        cert1Name: "Desarrollo de Proyectos Web con JavaScript",
        cert1Institution: "Institución: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
        cert2Name: "Procesamiento de Datos y Creación de Macros con Excel",
        cert2Institution: "Institución: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
        cert3Name: "Automatización de Tareas en Sistemas Linux con Programación Bash",
        cert3Institution: "Institución: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
        cert1Aria: "Abrir PDF: Desarrollo de Proyectos Web con JavaScript",
        cert2Aria: "Abrir PDF: Procesamiento de Datos y Creación de Macros con Excel",
        cert3Aria: "Abrir PDF: Automatización de Tareas en Sistemas Linux con Programación Bash",
        cert1Alt: "Vista previa: Desarrollo de Proyectos Web con JavaScript",
        cert2Alt: "Vista previa: Procesamiento de Datos y Creación de Macros con Excel",
        cert3Alt: "Vista previa: Automatización de Tareas en Sistemas Linux con Programación Bash"
    }
};

const elements = {
    nav: document.querySelector("nav"),
    menuToggle: document.getElementById("menuToggle"),
    buttons: document.getElementById("buttons"),
    navBack: document.getElementById("navBack"),
    langLabel: document.getElementById("langLabel"),
    themeText: document.getElementById("themeText"),
    themeToggle: document.getElementById("themeToggle"),
    enBtn: document.getElementById("enBtn"),
    esBtn: document.getElementById("esBtn"),
    backHomeBtn: document.getElementById("backHomeBtn"),
    pageTitle: document.getElementById("pageTitle"),
    pageSubtitle: document.getElementById("pageSubtitle"),
    certificationsListTitle: document.getElementById("certificationsListTitle"),
    cert1Name: document.getElementById("cert1Name"),
    cert1Institution: document.getElementById("cert1Institution"),
    cert2Name: document.getElementById("cert2Name"),
    cert2Institution: document.getElementById("cert2Institution"),
    cert3Name: document.getElementById("cert3Name"),
    cert3Institution: document.getElementById("cert3Institution"),
    cert1Card: document.getElementById("cert1Card"),
    cert2Card: document.getElementById("cert2Card"),
    cert3Card: document.getElementById("cert3Card"),
    cert1Image: document.getElementById("cert1Image"),
    cert2Image: document.getElementById("cert2Image"),
    cert3Image: document.getElementById("cert3Image"),
    navLinks: document.querySelectorAll("#buttons .navLink")
};

function setCookie(name, value, days = 365)
{
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name)
{
    const prefix = `${name}=`;
    const found = document.cookie
        .split(";")
        .map((item) => item.trim())
        .find((item) => item.startsWith(prefix));
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

    return browserLanguages
        .filter(Boolean)
        .map((lang) => lang.toLowerCase())
        .some((lang) => lang.startsWith("es"))
        ? "es"
        : "en";
}

function applyTheme(theme)
{
    document.body.setAttribute("data-theme", theme);
    elements.themeToggle.checked = theme === "dark";
    setPreference(THEME_KEY, theme);
}

function closeMobileMenu()
{
    elements.buttons.classList.remove("isOpen");
    elements.menuToggle.setAttribute("aria-expanded", "false");
    elements.menuToggle.textContent = "☰";
}

function toggleMobileMenu()
{
    const isOpen = elements.buttons.classList.toggle("isOpen");
    elements.menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    elements.menuToggle.textContent = isOpen ? "✕" : "☰";
}

function setLanguage(lang)
{
    const copy = translations[lang] || translations.en;

    document.documentElement.lang = lang;
    document.title = copy.pageTitle;
    elements.navBack.textContent = copy.navBack;
    elements.langLabel.textContent = copy.langLabel;
    elements.themeText.textContent = copy.themeText;
    elements.pageTitle.textContent = copy.heroTitle;
    elements.pageSubtitle.textContent = copy.heroSubtitle;
    elements.backHomeBtn.textContent = copy.backHome;
    elements.certificationsListTitle.textContent = copy.listTitle;
    elements.cert1Name.textContent = copy.cert1Name;
    elements.cert1Institution.textContent = copy.cert1Institution;
    elements.cert2Name.textContent = copy.cert2Name;
    elements.cert2Institution.textContent = copy.cert2Institution;
    elements.cert3Name.textContent = copy.cert3Name;
    elements.cert3Institution.textContent = copy.cert3Institution;

    elements.cert1Card.setAttribute("aria-label", copy.cert1Aria);
    elements.cert2Card.setAttribute("aria-label", copy.cert2Aria);
    elements.cert3Card.setAttribute("aria-label", copy.cert3Aria);
    elements.cert1Image.alt = copy.cert1Alt;
    elements.cert2Image.alt = copy.cert2Alt;
    elements.cert3Image.alt = copy.cert3Alt;

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

    elements.menuToggle.addEventListener("click", toggleMobileMenu);
    elements.navLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
        if (!mobileMenuMediaQuery.matches)
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

document.addEventListener("DOMContentLoaded", init);
