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
        menuLabelClosed: "Open navigation menu",
        menuLabelOpen: "Close navigation menu",
        certificates: [
            {
                name: "Desarrollo de Proyectos Web con JavaScript",
                institution: "Institution: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
                aria: "Open Desarrollo de Proyectos Web con JavaScript PDF",
                alt: "Certificate preview: Desarrollo de Proyectos Web con JavaScript"
            },
            {
                name: "Procesamiento de Datos y Creación de Macros con Excel",
                institution: "Institution: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
                aria: "Open Procesamiento de Datos y Creación de Macros con Excel PDF",
                alt: "Certificate preview: Procesamiento de Datos y Creación de Macros con Excel"
            },
            {
                name: "Automatización de Tareas en Sistemas Linux con Programación Bash",
                institution: "Institution: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
                aria: "Open Automatización de Tareas en Sistemas Linux con Programación Bash PDF",
                alt: "Certificate preview: Automatización de Tareas en Sistemas Linux con Programación Bash"
            }
        ]
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
        menuLabelClosed: "Abrir menú de navegación",
        menuLabelOpen: "Cerrar menú de navegación",
        certificates: [
            {
                name: "Desarrollo de Proyectos Web con JavaScript",
                institution: "Institución: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
                aria: "Abrir PDF: Desarrollo de Proyectos Web con JavaScript",
                alt: "Vista previa: Desarrollo de Proyectos Web con JavaScript"
            },
            {
                name: "Procesamiento de Datos y Creación de Macros con Excel",
                institution: "Institución: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
                aria: "Abrir PDF: Procesamiento de Datos y Creación de Macros con Excel",
                alt: "Vista previa: Procesamiento de Datos y Creación de Macros con Excel"
            },
            {
                name: "Automatización de Tareas en Sistemas Linux con Programación Bash",
                institution: "Institución: Escuela Nacional Preparatoria Plantel 6 (UNAM)",
                aria: "Abrir PDF: Automatización de Tareas en Sistemas Linux con Programación Bash",
                alt: "Vista previa: Automatización de Tareas en Sistemas Linux con Programación Bash"
            }
        ]
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
    navLinks: document.querySelectorAll("#buttons .navLink")
};

const certElements = [
    {
        card: document.getElementById("cert1Card"),
        image: document.getElementById("cert1Image"),
        name: document.getElementById("cert1Name"),
        institution: document.getElementById("cert1Institution")
    },
    {
        card: document.getElementById("cert2Card"),
        image: document.getElementById("cert2Image"),
        name: document.getElementById("cert2Name"),
        institution: document.getElementById("cert2Institution")
    },
    {
        card: document.getElementById("cert3Card"),
        image: document.getElementById("cert3Image"),
        name: document.getElementById("cert3Name"),
        institution: document.getElementById("cert3Institution")
    }
];

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

function setMenuToggleState(isOpen)
{
    const lang = document.documentElement.lang === "es" ? "es" : "en";
    const copy = translations[lang] || translations.en;

    elements.menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    elements.menuToggle.setAttribute("aria-label", isOpen ? copy.menuLabelOpen : copy.menuLabelClosed);
    elements.menuToggle.textContent = isOpen ? "✕" : "☰";
}

function closeMobileMenu()
{
    elements.buttons.classList.remove("isOpen");
    setMenuToggleState(false);
}

function toggleMobileMenu()
{
    const isOpen = elements.buttons.classList.toggle("isOpen");
    setMenuToggleState(isOpen);
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
    copy.certificates.forEach((cert, index) => {
        const certElement = certElements[index];
        if (!certElement)
        {
            return;
        }

        certElement.name.textContent = cert.name;
        certElement.institution.textContent = cert.institution;
        certElement.card.setAttribute("aria-label", cert.aria);
        certElement.image.alt = cert.alt;
    });

    setMenuToggleState(elements.buttons.classList.contains("isOpen"));

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
