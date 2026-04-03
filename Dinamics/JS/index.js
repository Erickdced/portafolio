const THEME_KEY = "portfolio-theme";
const LANG_KEY = "portfolio-lang";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FORCE_ANIMATIONS = true;
const animationsEnabled = FORCE_ANIMATIONS || !prefersReducedMotion;
let skillsAnimationRunId = 0;

const translations = {
	en: {
		pageTitle: "Portfolio",
		navAbout: "About",
		navSkills: "Skills",
		navProjects: "Projects",
		navContact: "Contact",
		langLabel: "Lang:",
		themeText: "Dark Mode",
		heroSubtitle: "Electronic Engineer Student | Full Stack Developer | Embedded Systems",
		skillsLanguages: "Languages",
		skillsEmbedded: "Embedded",
		skillsInfrastructure: "Infrastructure",
		skillsTooling: "Tooling",
		certificationsTitle: "Official Certifications",
		certificationsText: "Official documents direct download links",
		certificationsBtn: "View Certifications",
		contactMail: "mail",
		contactLinkedin: "linkedin",
		contactGithub: "github"
	},
	es: {
		pageTitle: "Portafolio",
		navAbout: "Sobre mí",
		navSkills: "Habilidades",
		navProjects: "Proyectos",
		navContact: "Contacto",
		langLabel: "Idioma:",
		themeText: "Modo oscuro",
		heroSubtitle: "Estudiante de Ingeniería Electrónica | Desarrollador Full Stack | Sistemas Embebidos",
		skillsLanguages: "Lenguajes",
		skillsEmbedded: "Embebidos",
		skillsInfrastructure: "Infraestructura",
		skillsTooling: "Herramientas",
		certificationsTitle: "Constancias oficiales",
		certificationsText: "Enlaces directos de descarga de documentos oficiales",
		certificationsBtn: "Ver constancias",
		contactMail: "correo",
		contactLinkedin: "linkedin",
		contactGithub: "github"
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
	heroSubtitle: document.querySelector("#hero .heroText p"),
	languagesTitle: document.querySelector("#languages h2"),
	languagesList: document.querySelector("#languages ul"),
	embeddedTitle: document.querySelector("#embedded h2"),
	embeddedList: document.querySelector("#embedded ul"),
	infrastructureTitle: document.querySelector("#infrastructure h2"),
	infrastructureList: document.querySelector("#infrastructure ul"),
	toolingTitle: document.querySelector("#tooling h2"),
	toolingList: document.querySelector("#tooling ul"),
	certificationsTitle: document.querySelector("#certifications h2"),
	certificationsText: document.querySelector("#certifications div"),
	certificationsBtn: document.getElementById("certs"),
	mailText: document.querySelector("#Contact > div:nth-child(1)").lastChild,
	linkedinText: document.querySelector("#Contact > div:nth-child(2)").lastChild,
	githubText: document.querySelector("#Contact > div:nth-child(3)").lastChild
};

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
	localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme()
{
	const nextTheme = elements.themeToggle.checked ? "dark" : "light";
	applyTheme(nextTheme);
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
	elements.heroSubtitle.textContent = copy.heroSubtitle;

	elements.certificationsTitle.textContent = copy.certificationsTitle;
	elements.certificationsText.textContent = copy.certificationsText;
	elements.certificationsBtn.textContent = copy.certificationsBtn;

	elements.mailText.textContent = copy.contactMail;
	elements.linkedinText.textContent = copy.contactLinkedin;
	elements.githubText.textContent = copy.contactGithub;

	elements.enBtn.classList.toggle("isActive", lang === "en");
	elements.esBtn.classList.toggle("isActive", lang === "es");

	localStorage.setItem(LANG_KEY, lang);
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

function init()
{
	const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
	const savedLang = localStorage.getItem(LANG_KEY) || "en";

	applyTheme(savedTheme);
	setLanguage(savedLang, { animateSkills: false });
	hideAllSkillLines(savedLang);
	if (animationsEnabled)
	{
		void runIntroAnimations(savedLang);
	}
	else
	{
		void runSkillsGeneration(savedLang);
	}

	elements.themeToggle.addEventListener("change", toggleTheme);
	elements.enBtn.addEventListener("click", () => setLanguage("en"));
	elements.esBtn.addEventListener("click", () => setLanguage("es"));
}

document.addEventListener("DOMContentLoaded", init);
