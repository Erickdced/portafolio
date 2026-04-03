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
		langLabel: "Language:",
		themeText: "Dark Mode",
		heroQuote: "I don't wait to be taught — I build.",
		heroSubtitle: "Engineering student by day. Self-taught builder since age 12. Full stack, embedded systems, and cybersecurity — from Mexico City.",
		skillsLanguages: "Languages",
		skillsEmbedded: "Embedded",
		skillsInfrastructure: "Infrastructure",
		skillsTooling: "Tooling",
		certificationsTitle: "Official Certifications",
		certificationsText: "Official documents direct download links",
		certificationsBtn: "View Certifications",
		project1ImageText: "Project 1 image",
		project1Title: "Swords and Laser",
		project1Tag1: "Procedural C",
		project1Tag2: "Allegro 4",
		project1Tag3: "Pixel Collision",
		project1Tag4: "Double Buffering",
		project1Description: "A fully playable RPG built from scratch — no engine, no framework, just C and raw logic.",
		project2ImageText: "Project 2 image",
		project2Title: "Project 2",
		project2Description: "Description of project 2.",
		project3ImageText: "Project 3 image",
		project3Title: "Project 3",
		project3Description: "Description of project 3.",
		project4ImageText: "Project 4 image",
		project4Title: "Project 4",
		project4Description: "Description of project 4.",
		project5ImageText: "Project 5 image",
		project5Title: "Project 5",
		project5Description: "Description of project 5.",
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
		heroQuote: "No espero a que me enseñen — construyo.",
		heroSubtitle: "Estudiante de ingeniería de día. Constructor autodidacta desde los 12 años. Full stack, sistemas embebidos y ciberseguridad — desde Ciudad de México.",
		skillsLanguages: "Lenguajes",
		skillsEmbedded: "Embebidos",
		skillsInfrastructure: "Infraestructura",
		skillsTooling: "Herramientas",
		certificationsTitle: "Constancias oficiales",
		certificationsText: "Enlaces directos de descarga de documentos oficiales",
		certificationsBtn: "Ver constancias",
		project1ImageText: "Imagen del proyecto 1",
		project1Title: "Swords and Laser",
		project1Tag1: "C procedimental",
		project1Tag2: "Allegro 4",
		project1Tag3: "Colisión por píxel",
		project1Tag4: "Doble búfer",
		project1Description: "Un RPG totalmente jugable construido desde cero: sin motor, sin framework, solo C y lógica pura.",
		project2ImageText: "Imagen del proyecto 2",
		project2Title: "Proyecto 2",
		project2Description: "Descripción del proyecto 2.",
		project3ImageText: "Imagen del proyecto 3",
		project3Title: "Proyecto 3",
		project3Description: "Descripción del proyecto 3.",
		project4ImageText: "Imagen del proyecto 4",
		project4Title: "Proyecto 4",
		project4Description: "Descripción del proyecto 4.",
		project5ImageText: "Imagen del proyecto 5",
		project5Title: "Proyecto 5",
		project5Description: "Descripción del proyecto 5.",
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
	heroQuote: document.getElementById("heroQuote"),
	heroSubtitle: document.getElementById("heroSubtitle"),
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
	project2Description: document.getElementById("project2Description"),
	project3ImageText: document.getElementById("project3ImageText"),
	project3Title: document.getElementById("project3Title"),
	project3Description: document.getElementById("project3Description"),
	project4ImageText: document.getElementById("project4ImageText"),
	project4Title: document.getElementById("project4Title"),
	project4Description: document.getElementById("project4Description"),
	project5ImageText: document.getElementById("project5ImageText"),
	project5Title: document.getElementById("project5Title"),
	project5Description: document.getElementById("project5Description"),
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
	elements.heroQuote.textContent = copy.heroQuote;
	elements.heroSubtitle.textContent = copy.heroSubtitle;
	elements.project1ImageText.textContent = copy.project1ImageText;
	elements.project1Title.textContent = copy.project1Title;
	elements.project1Tag1.textContent = copy.project1Tag1;
	elements.project1Tag2.textContent = copy.project1Tag2;
	elements.project1Tag3.textContent = copy.project1Tag3;
	elements.project1Tag4.textContent = copy.project1Tag4;
	elements.project1Description.textContent = copy.project1Description;
	elements.project2ImageText.textContent = copy.project2ImageText;
	elements.project2Title.textContent = copy.project2Title;
	elements.project2Description.textContent = copy.project2Description;
	elements.project3ImageText.textContent = copy.project3ImageText;
	elements.project3Title.textContent = copy.project3Title;
	elements.project3Description.textContent = copy.project3Description;
	elements.project4ImageText.textContent = copy.project4ImageText;
	elements.project4Title.textContent = copy.project4Title;
	elements.project4Description.textContent = copy.project4Description;
	elements.project5ImageText.textContent = copy.project5ImageText;
	elements.project5Title.textContent = copy.project5Title;
	elements.project5Description.textContent = copy.project5Description;

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
