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

	const hasSpanish = browserLanguages
		.filter(Boolean)
		.map((lang) => lang.toLowerCase())
		.some((lang) => lang.startsWith("es"));

	return hasSpanish ? "es" : "en";
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FORCE_ANIMATIONS = true;
const animationsEnabled = FORCE_ANIMATIONS || !prefersReducedMotion;
let skillsAnimationRunId = 0;
const mobileMenuMediaQuery = window.matchMedia("(max-width: 640px)");

const translations = {
	en: {
		pageTitle: "Portfolio",
		navAbout: "About",
		navSkills: "Skills",
		navProjects: "Projects",
		navContact: "Contact",
		menuLabelClosed: "Open navigation menu",
		menuLabelOpen: "Close navigation menu",
		langLabel: "Language:",
		themeText: "Dark Mode",
		heroQuote: "I don't wait to be taught — I build.",
		heroSubtitle: "Engineering student by day. Self-taught builder since 3 years. Full stack, embedded systems, and cybersecurity — from Mexico City.",
		cvDownloadBtn: "Download CV (PDF)",
		cvDownloadFile: "Media/PDFs/CV_ErickCedillo_EN.pdf",
		cvDownloadName: "CV_ErickCedillo_EN.pdf",
		skillsLanguages: "Languages",
		skillsEmbedded: "Embedded",
		skillsInfrastructure: "Infrastructure",
		skillsTooling: "Tooling",
		certificationsTitle: "Official Certifications",
		certificationsText: "Official documents direct download links",
		certificationsBtn: "View Certifications Page",
		project1ImageText: "Project 1 image",
		project1Title: "Swords and laser",
		project1Tag1: "Procedural C",
		project1Tag2: "Allegro 4",
		project1Tag3: "Pixel Collision",
		project1Tag4: "Double Buffering",
		project1Description: "A fully playable RPG built from scratch — no engine, no framework, just C and raw logic.",
		project2ImageText: "Project 2 image",
		project2Title: "Sistema de control de puente movil",
		project2Tag1: "🥇 1st Place",
		project2Tag2: "DC motors",
		project2Tag3: "Servo",
		project2Tag4: "Distance sensor",
		project2Tag5: "NeoPixel LEDs",
		project2Tag6: "Pygame GUI",
		project2Tag7: "PWM control",
		project2Description: "A physically built, laser-cut drawbridge controlled by a Raspberry Pi 5 — winner of the Interprepas competition.",
		project3ImageText: "Project 3 image",
		project3Title: "Curso de JavaScript - ENP 6",
		project3Tag1: "JavaScript",
		project3Tag2: "HTML",
		project3Tag3: "CSS",
		project3Tag4: "Curriculum Design",
		project3Tag5: "Team Mentoring",
		project3Description: "Designed and taught a full web development course from scratch. 43 students, 9 teams, one month — all shipped a working project.",
		project4ImageText: "Project 4 image",
		project4Title: "Cybersecurity Audit — Legal Firm",
		project4Tag1: "ISO 27001",
		project4Tag2: "Risk Assessment",
		project4Tag3: "Security Policies",
		project4Tag4: "Vulnerability Analysis",
		project4Tag5: "Technical Report",
		project4Description: "Solo audit of a legal firm's information security infrastructure. 7 findings, 7 new policies, full ISO 27001 compliance report — delivered alone at 17.",
		project5ImageText: "Project 5 image",
		project5Title: "Administrative Web System — [REDACTED]",
		project5Tag1: "PHP",
		project5Tag2: "MySQL",
		project5Tag3: "Apache",
		project5Tag4: "Linux",
		project5Tag5: "Deployed",
		project5Tag6: "Active Users",
		project5Description: "A full production web system, actively used by real staff. Client and details are confidential — but it ships, it runs, and it works.",
		contactMail: "mail",
		contactLinkedin: "linkedin",
		contactGithub: "github",
		contactVisit: "Visit",
		contactCopy: "Copy",
		contactCopied: "Copied"
	},
	es: {
		pageTitle: "Portafolio",
		navAbout: "Sobre mí",
		navSkills: "Habilidades",
		navProjects: "Proyectos",
		navContact: "Contacto",
		menuLabelClosed: "Abrir menú de navegación",
		menuLabelOpen: "Cerrar menú de navegación",
		langLabel: "Idioma:",
		themeText: "Modo oscuro",
		heroQuote: "No espero a que me enseñen — construyo.",
		heroSubtitle: "Estudiante de ingeniería de día. Constructor autodidacta desde hace 3 años. Full stack, sistemas embebidos y ciberseguridad — desde Ciudad de México.",
		cvDownloadBtn: "Descargar CV (PDF)",
		cvDownloadFile: "Media/PDFs/CV_ErickCedillo_ES.pdf",
		cvDownloadName: "CV_ErickCedillo_ES.pdf",
		skillsLanguages: "Lenguajes",
		skillsEmbedded: "Embebidos",
		skillsInfrastructure: "Infraestructura",
		skillsTooling: "Herramientas",
		certificationsTitle: "Constancias oficiales",
		certificationsText: "Enlaces directos de descarga de documentos oficiales",
		certificationsBtn: "Ver página de constancias",
		project1ImageText: "Imagen del proyecto 1",
		project1Title: "Swords and laser",
		project1Tag1: "C procedimental",
		project1Tag2: "Allegro 4",
		project1Tag3: "Colisión por píxel",
		project1Tag4: "Doble búfer",
		project1Description: "Un RPG totalmente jugable construido desde cero: sin motor, sin framework, solo C y lógica pura.",
		project2ImageText: "Imagen del proyecto 2",
		project2Title: "Sistema de control de puente movil",
		project2Tag1: "🥇 1er lugar",
		project2Tag2: "Motores DC",
		project2Tag3: "Servo",
		project2Tag4: "Sensor de distancia",
		project2Tag5: "LEDs NeoPixel",
		project2Tag6: "Interfaz Pygame",
		project2Tag7: "Control PWM",
		project2Description: "Un puente levadizo físico, cortado en láser y controlado por una Raspberry Pi 5: ganador del concurso Interprepas.",
		project3ImageText: "Imagen del proyecto 3",
		project3Title: "Curso de JavaScript - ENP 6",
		project3Tag1: "JavaScript",
		project3Tag2: "HTML",
		project3Tag3: "CSS",
		project3Tag4: "Diseño curricular",
		project3Tag5: "Mentoría de equipos",
		project3Description: "Diseñé e impartí un curso completo de desarrollo web desde cero. 43 estudiantes, 9 equipos y un mes: todos entregaron un proyecto funcional.",
		project4ImageText: "Imagen del proyecto 4",
		project4Title: "Auditoría de ciberseguridad — firma legal",
		project4Tag1: "ISO 27001",
		project4Tag2: "Evaluación de riesgos",
		project4Tag3: "Políticas de seguridad",
		project4Tag4: "Análisis de vulnerabilidades",
		project4Tag5: "Reporte técnico",
		project4Description: "Auditoría individual de la infraestructura de seguridad de la información de una firma legal. 7 hallazgos, 7 políticas nuevas y reporte completo de cumplimiento ISO 27001 — entregado en solitario a los 17.",
		project5ImageText: "Imagen del proyecto 5",
		project5Title: "Sistema web administrativo — [CONFIDENCIAL]",
		project5Tag1: "PHP",
		project5Tag2: "MySQL",
		project5Tag3: "Apache",
		project5Tag4: "Linux",
		project5Tag5: "Desplegado",
		project5Tag6: "Usuarios activos",
		project5Description: "Un sistema web de producción completo, usado activamente por personal real. El cliente y los detalles son confidenciales, pero está desplegado, funciona y cumple.",
		contactMail: "correo",
		contactLinkedin: "linkedin",
		contactGithub: "github",
		contactVisit: "Visitar",
		contactCopy: "Copiar",
		contactCopied: "Copiado"
	}
};

const skillItems = {
	en: {
		languages: ["Python", "JavaScript", "Java", "C/C++", "PHP", "VB", "Bash"],
		embedded: [
			"PWM & motor control",
			"Sensor interfacing (digital / ADC)",
			"Communication protocols (I2C, UART, SPI)",
			"WiFi / Bluetooth (ESP32)",
			"GPIO control & signal handling",
			"Real-time logic (state machines / timing)"
		],
		infrastructure: [
			"Linux (daily use, system management)",
			"Windows",
			"Networking (LAN setup, diagnostics)",
			"Remote access (SSH, remote desktop)"
		],
		tooling: ["Git", "Visual Studio Code", "Autodesk Inventor", "FreeCAD", "Figma", "Nmap"]
	},
	es: {
		languages: ["Python", "JavaScript", "Java", "C/C++", "PHP", "VB", "Bash"],
		embedded: [
			"PWM y control de motores",
			"Interfaz de sensores (digital / ADC)",
			"Protocolos de comunicación (I2C, UART, SPI)",
			"WiFi / Bluetooth (ESP32)",
			"Control GPIO y manejo de señales",
			"Lógica en tiempo real (máquinas de estado / temporización)"
		],
		infrastructure: [
			"Linux (uso diario, administración de sistemas)",
			"Windows",
			"Redes (configuración LAN, diagnóstico)",
			"Acceso remoto (SSH, escritorio remoto)"
		],
		tooling: ["Git", "Visual Studio Code", "Autodesk Inventor", "FreeCAD", "Figma", "Nmap"]
	}
};

const elements = {
	nav: document.querySelector("nav"),
	name: document.getElementById("name"),
	menuToggle: document.getElementById("menuToggle"),
	buttons: document.getElementById("buttons"),
	navLinks: document.querySelectorAll("#buttons .navLink"),
	themeToggle: document.getElementById("themeToggle"),
	enBtn: document.getElementById("enBtn"),
	esBtn: document.getElementById("esBtn"),
	themeText: document.getElementById("themeText"),
	langLabel: document.getElementById("langLabel"),
	abtBtn: document.getElementById("abtBtn"),
	sklsBtn: document.getElementById("sklsBtn"),
	prjBtn: document.getElementById("prjBtn"),
	cntBtn: document.getElementById("cntBtn"),
	heroName: document.querySelector("#hero .heroText h1"),
	heroQuote: document.getElementById("heroQuote"),
	heroSubtitle: document.getElementById("heroSubtitle"),
	cvDownloadBtn: document.getElementById("cvDownloadBtn"),
	languagesTitle: document.querySelector("#languages h2"),
	languagesList: document.querySelector("#languages ul"),
	embeddedTitle: document.querySelector("#embedded h2"),
	embeddedList: document.querySelector("#embedded ul"),
	infrastructureTitle: document.querySelector("#infrastructure h2"),
	infrastructureList: document.querySelector("#infrastructure ul"),
	toolingTitle: document.querySelector("#tooling h2"),
	toolingList: document.querySelector("#tooling ul"),
	project1ImageText: document.getElementById("project1ImageText"),
	project1Title: document.getElementById("project1Title"),
	project1Tag1: document.getElementById("project1Tag1"),
	project1Tag2: document.getElementById("project1Tag2"),
	project1Tag3: document.getElementById("project1Tag3"),
	project1Tag4: document.getElementById("project1Tag4"),
	project1Description: document.getElementById("project1Description"),
	project2ImageText: document.getElementById("project2ImageText"),
	project2Title: document.getElementById("project2Title"),
	project2Tag1: document.getElementById("project2Tag1"),
	project2Tag2: document.getElementById("project2Tag2"),
	project2Tag3: document.getElementById("project2Tag3"),
	project2Tag4: document.getElementById("project2Tag4"),
	project2Tag5: document.getElementById("project2Tag5"),
	project2Tag6: document.getElementById("project2Tag6"),
	project2Tag7: document.getElementById("project2Tag7"),
	project2Description: document.getElementById("project2Description"),
	project3ImageText: document.getElementById("project3ImageText"),
	project3Title: document.getElementById("project3Title"),
	project3Tag1: document.getElementById("project3Tag1"),
	project3Tag2: document.getElementById("project3Tag2"),
	project3Tag3: document.getElementById("project3Tag3"),
	project3Tag4: document.getElementById("project3Tag4"),
	project3Tag5: document.getElementById("project3Tag5"),
	project3Description: document.getElementById("project3Description"),
	project4ImageText: document.getElementById("project4ImageText"),
	project4Title: document.getElementById("project4Title"),
	project4Tag1: document.getElementById("project4Tag1"),
	project4Tag2: document.getElementById("project4Tag2"),
	project4Tag3: document.getElementById("project4Tag3"),
	project4Tag4: document.getElementById("project4Tag4"),
	project4Tag5: document.getElementById("project4Tag5"),
	project4Description: document.getElementById("project4Description"),
	project5ImageText: document.getElementById("project5ImageText"),
	project5Title: document.getElementById("project5Title"),
	project5Tag1: document.getElementById("project5Tag1"),
	project5Tag2: document.getElementById("project5Tag2"),
	project5Tag3: document.getElementById("project5Tag3"),
	project5Tag4: document.getElementById("project5Tag4"),
	project5Tag5: document.getElementById("project5Tag5"),
	project5Tag6: document.getElementById("project5Tag6"),
	project5Description: document.getElementById("project5Description"),
	certificationsTitle: document.querySelector("#certifications h2"),
	certificationsText: document.querySelector("#certifications div"),
	certificationsBtn: document.getElementById("certs"),
	mailText: document.getElementById("mailText"),
	linkedinText: document.getElementById("linkedinText"),
	githubText: document.getElementById("githubText"),
	linkedinVisitBtn: document.getElementById("linkedinVisitBtn"),
	githubVisitBtn: document.getElementById("githubVisitBtn"),
	copyMailBtn: document.getElementById("copyMailBtn")
};

let copyResetTimeoutId = null;

function sleep(ms)
{
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function startBouncingDots(dotElement)
{
	const frames = [".", "..", "...", "..", "."];
	let frameIndex = 0;

	return setInterval(() => {
		dotElement.textContent = frames[frameIndex];
		frameIndex = (frameIndex + 1) % frames.length;
	}, 220);
}

async function typeNameLikeTerminal(text)
{
	if (!elements.heroName)
	{
		return;
	}

	if (!animationsEnabled)
	{
		elements.heroName.textContent = text;
		return;
	}

	elements.heroName.textContent = "";

	for (const char of text)
	{
		elements.heroName.textContent += char;
		await sleep(85);
	}

	const cursor = "▋";
	for (let i = 0; i < 4; i++)
	{
		elements.heroName.textContent = i % 2 === 0 ? `${text}${cursor}` : text;
		await sleep(150);
	}

	elements.heroName.textContent = text;
}

async function generateSkillList({ titleElement, listElement, baseTitle, items, runId })
{
	if (!titleElement || !listElement)
	{
		return;
	}

	listElement.innerHTML = "";

	if (!animationsEnabled)
	{
		titleElement.textContent = baseTitle;
		for (const itemText of items)
		{
			const li = document.createElement("li");
			li.textContent = itemText;
			listElement.appendChild(li);
		}
		return;
	}

	const dots = document.createElement("span");
	dots.textContent = ".";
	titleElement.textContent = `${baseTitle} `;
	titleElement.appendChild(dots);

	const dotsInterval = startBouncingDots(dots);

	for (const itemText of items)
	{
		if (runId !== skillsAnimationRunId)
		{
			clearInterval(dotsInterval);
			return;
		}

		const li = document.createElement("li");
		li.textContent = itemText;
		li.style.opacity = "0";
		li.style.transform = "translateY(0.2rem)";
		li.style.transition = "opacity 0.2s ease, transform 0.2s ease";
		listElement.appendChild(li);

		requestAnimationFrame(() => {
			li.style.opacity = "1";
			li.style.transform = "translateY(0)";
		});

		await sleep(180);
	}

	clearInterval(dotsInterval);
	titleElement.textContent = baseTitle;
}

function hideAllSkillLines(lang)
{
	const copy = translations[lang] || translations.en;

	elements.languagesTitle.textContent = `${copy.skillsLanguages} ...`;
	elements.embeddedTitle.textContent = `${copy.skillsEmbedded} ...`;
	elements.infrastructureTitle.textContent = `${copy.skillsInfrastructure} ...`;
	elements.toolingTitle.textContent = `${copy.skillsTooling} ...`;

	elements.languagesList.innerHTML = "";
	elements.embeddedList.innerHTML = "";
	elements.infrastructureList.innerHTML = "";
	elements.toolingList.innerHTML = "";
}

async function runSkillsGeneration(lang)
{
	const runId = ++skillsAnimationRunId;
	const copy = translations[lang] || translations.en;
	const skills = skillItems[lang] || skillItems.en;

	hideAllSkillLines(lang);

	await Promise.all([
		generateSkillList({
			titleElement: elements.languagesTitle,
			listElement: elements.languagesList,
			baseTitle: copy.skillsLanguages,
			items: skills.languages,
			runId
		}),
		generateSkillList({
			titleElement: elements.embeddedTitle,
			listElement: elements.embeddedList,
			baseTitle: copy.skillsEmbedded,
			items: skills.embedded,
			runId
		}),
		generateSkillList({
			titleElement: elements.infrastructureTitle,
			listElement: elements.infrastructureList,
			baseTitle: copy.skillsInfrastructure,
			items: skills.infrastructure,
			runId
		}),
		generateSkillList({
			titleElement: elements.toolingTitle,
			listElement: elements.toolingList,
			baseTitle: copy.skillsTooling,
			items: skills.tooling,
			runId
		})
	]);
}

function applyTheme(theme)
{
	document.body.setAttribute("data-theme", theme);
	elements.themeToggle.checked = theme === "dark";
	setPreference(THEME_KEY, theme);
}

function toggleTheme()
{
	const nextTheme = elements.themeToggle.checked ? "dark" : "light";
	applyTheme(nextTheme);
}

async function copyMailToClipboard()
{
	const email = "erickdcedillo21@gmail.com";
	const currentLang = document.documentElement.lang === "es" ? "es" : "en";
	const copy = translations[currentLang] || translations.en;

	if (!elements.copyMailBtn)
	{
		return;
	}

	try
	{
		await navigator.clipboard.writeText(email);
	}
	catch (_error)
	{
		const input = document.createElement("input");
		input.value = email;
		document.body.appendChild(input);
		input.select();
		document.execCommand("copy");
		document.body.removeChild(input);
	}

	elements.copyMailBtn.textContent = copy.contactCopied;

	if (copyResetTimeoutId)
	{
		clearTimeout(copyResetTimeoutId);
	}

	copyResetTimeoutId = window.setTimeout(() => {
		const lang = document.documentElement.lang === "es" ? "es" : "en";
		const nextCopy = translations[lang] || translations.en;
		elements.copyMailBtn.textContent = nextCopy.contactCopy;
	}, 1400);
}

function setLanguage(lang, options = {})
{
	const { animateSkills = true } = options;
	const copy = translations[lang] || translations.en;

	document.documentElement.lang = lang;
	document.title = copy.pageTitle;

	elements.abtBtn.textContent = copy.navAbout;
	elements.sklsBtn.textContent = copy.navSkills;
	elements.prjBtn.textContent = copy.navProjects;
	elements.cntBtn.textContent = copy.navContact;

	elements.langLabel.textContent = copy.langLabel;
	elements.themeText.textContent = copy.themeText;
	elements.heroQuote.textContent = copy.heroQuote;
	elements.heroSubtitle.textContent = copy.heroSubtitle;
	elements.cvDownloadBtn.textContent = copy.cvDownloadBtn;
	elements.cvDownloadBtn.href = copy.cvDownloadFile;
	elements.cvDownloadBtn.setAttribute("download", copy.cvDownloadName);
	elements.project1ImageText.textContent = copy.project1ImageText;
	elements.project1Title.textContent = copy.project1Title;
	elements.project1Tag1.textContent = copy.project1Tag1;
	elements.project1Tag2.textContent = copy.project1Tag2;
	elements.project1Tag3.textContent = copy.project1Tag3;
	elements.project1Tag4.textContent = copy.project1Tag4;
	elements.project1Description.textContent = copy.project1Description;
	elements.project2ImageText.textContent = copy.project2ImageText;
	elements.project2Title.textContent = copy.project2Title;
	elements.project2Tag1.textContent = copy.project2Tag1;
	elements.project2Tag2.textContent = copy.project2Tag2;
	elements.project2Tag3.textContent = copy.project2Tag3;
	elements.project2Tag4.textContent = copy.project2Tag4;
	elements.project2Tag5.textContent = copy.project2Tag5;
	elements.project2Tag6.textContent = copy.project2Tag6;
	elements.project2Tag7.textContent = copy.project2Tag7;
	elements.project2Description.textContent = copy.project2Description;
	elements.project3ImageText.textContent = copy.project3ImageText;
	elements.project3Title.textContent = copy.project3Title;
	elements.project3Tag1.textContent = copy.project3Tag1;
	elements.project3Tag2.textContent = copy.project3Tag2;
	elements.project3Tag3.textContent = copy.project3Tag3;
	elements.project3Tag4.textContent = copy.project3Tag4;
	elements.project3Tag5.textContent = copy.project3Tag5;
	elements.project3Description.textContent = copy.project3Description;
	elements.project4ImageText.textContent = copy.project4ImageText;
	elements.project4Title.textContent = copy.project4Title;
	elements.project4Tag1.textContent = copy.project4Tag1;
	elements.project4Tag2.textContent = copy.project4Tag2;
	elements.project4Tag3.textContent = copy.project4Tag3;
	elements.project4Tag4.textContent = copy.project4Tag4;
	elements.project4Tag5.textContent = copy.project4Tag5;
	elements.project4Description.textContent = copy.project4Description;
	elements.project5ImageText.textContent = copy.project5ImageText;
	elements.project5Title.textContent = copy.project5Title;
	elements.project5Tag1.textContent = copy.project5Tag1;
	elements.project5Tag2.textContent = copy.project5Tag2;
	elements.project5Tag3.textContent = copy.project5Tag3;
	elements.project5Tag4.textContent = copy.project5Tag4;
	elements.project5Tag5.textContent = copy.project5Tag5;
	elements.project5Tag6.textContent = copy.project5Tag6;
	elements.project5Description.textContent = copy.project5Description;

	elements.certificationsTitle.textContent = copy.certificationsTitle;
	elements.certificationsText.textContent = copy.certificationsText;
	elements.certificationsBtn.textContent = copy.certificationsBtn;

	elements.mailText.textContent = copy.contactMail;
	elements.linkedinText.textContent = copy.contactLinkedin;
	elements.githubText.textContent = copy.contactGithub;
	elements.linkedinVisitBtn.textContent = copy.contactVisit;
	elements.githubVisitBtn.textContent = copy.contactVisit;
	elements.copyMailBtn.textContent = copy.contactCopy;
	if (elements.menuToggle)
	{
		const isOpen = elements.buttons.classList.contains("isOpen");
		elements.menuToggle.setAttribute("aria-label", isOpen ? copy.menuLabelOpen : copy.menuLabelClosed);
	}

	elements.enBtn.classList.toggle("isActive", lang === "en");
	elements.esBtn.classList.toggle("isActive", lang === "es");

	setPreference(LANG_KEY, lang);
	if (animationsEnabled && animateSkills)
	{
		void runSkillsGeneration(lang);
	}
}

async function runIntroAnimations(lang)
{
	await typeNameLikeTerminal("Erick Cedillo");
	await runSkillsGeneration(lang);
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
		const lang = document.documentElement.lang === "es" ? "es" : "en";
		const copy = translations[lang] || translations.en;
		elements.menuToggle.setAttribute("aria-label", copy.menuLabelClosed);
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
	const lang = document.documentElement.lang === "es" ? "es" : "en";
	const copy = translations[lang] || translations.en;
	elements.menuToggle.setAttribute("aria-label", isOpen ? copy.menuLabelOpen : copy.menuLabelClosed);
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
	setLanguage(initialLang, { animateSkills: false });
	hideAllSkillLines(initialLang);
	if (animationsEnabled)
	{
		void runIntroAnimations(initialLang);
	}
	else
	{
		void runSkillsGeneration(initialLang);
	}

	elements.themeToggle.addEventListener("change", toggleTheme);
	elements.enBtn.addEventListener("click", () => setLanguage("en"));
	elements.esBtn.addEventListener("click", () => setLanguage("es"));
	elements.copyMailBtn.addEventListener("click", copyMailToClipboard);

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

	if (elements.name)
	{
		elements.name.addEventListener("click", () => {
			window.location.href = "index.html";
		});
	}
}

document.addEventListener("DOMContentLoaded", init);
