window.PROJECT_PAGE = {
    en: {
        pageTitle: "Certifications | Erick Cedillo",
        name: "Erick Cedillo",
        navBack: "Back",
        themeText: "Dark Mode",
        projectTitle: "Official Certifications",
        projectSubtitle: "Placeholder page for certificates and official documents.",
        backHome: "Back to home",
        sectionOverviewTitle: "Status",
        sectionOverviewText: "This is a placeholder page. Final certification documents and download links will be published here soon.",
        sectionStackTitle: "Planned Certificates",
        stackItems: [
            "Technical Certificate 01: Placeholder entry for upcoming credential.",
            "Technical Certificate 02: Placeholder entry for upcoming credential.",
            "Technical Certificate 03: Placeholder entry for upcoming credential."
        ],
        sectionImpactTitle: "Download Placeholders",
        impactItems: [
            "PDF Links: Each certificate will include direct verified download.",
            "Metadata: Issue date, issuer, and verification information will be listed.",
            "Status: Page structure is ready for final files."
        ],
        cert1Title: "Academic Certificate — Placeholder",
        cert1Description: "Preview card for the first official certificate. Final validated PDF will replace this sample.",
        cert2Title: "Technical Course Certificate — Placeholder",
        cert2Description: "Preview card for the second official certificate with issuer, date, and verification details.",
        cert3Title: "Workshop / Event Certificate — Placeholder",
        cert3Description: "Preview card for the third official certificate. This description is intentionally limited to two lines.",
        certOpen: "Open PDF"
    },
    es: {
        pageTitle: "Constancias | Erick Cedillo",
        name: "Erick Cedillo",
        navBack: "Volver",
        themeText: "Modo oscuro",
        projectTitle: "Constancias oficiales",
        projectSubtitle: "Página placeholder para constancias y documentos oficiales.",
        backHome: "Volver al inicio",
        sectionOverviewTitle: "Estado",
        sectionOverviewText: "Esta es una página placeholder. Aquí se publicarán pronto las constancias finales y sus enlaces de descarga.",
        sectionStackTitle: "Constancias planeadas",
        stackItems: [
            "Constancia técnica 01: Entrada placeholder para credencial próxima.",
            "Constancia técnica 02: Entrada placeholder para credencial próxima.",
            "Constancia técnica 03: Entrada placeholder para credencial próxima."
        ],
        sectionImpactTitle: "Placeholders de descarga",
        impactItems: [
            "Enlaces PDF: Cada constancia incluirá descarga directa verificada.",
            "Metadatos: Se mostrará fecha de emisión, emisor y verificación.",
            "Estado: La estructura de la página ya está lista para archivos finales."
        ],
        cert1Title: "Constancia académica — Placeholder",
        cert1Description: "Tarjeta de vista previa para la primera constancia oficial. El PDF final validado reemplazará este ejemplo.",
        cert2Title: "Constancia de curso técnico — Placeholder",
        cert2Description: "Tarjeta de vista previa para la segunda constancia oficial con emisor, fecha y datos de verificación.",
        cert3Title: "Constancia de taller / evento — Placeholder",
        cert3Description: "Tarjeta de vista previa para la tercera constancia oficial. Esta descripción se limita intencionalmente a dos líneas.",
        certOpen: "Abrir PDF"
    }
};

window.afterProjectLanguageSet = (lang) => {
    const copy = (window.PROJECT_PAGE && window.PROJECT_PAGE[lang]) || window.PROJECT_PAGE.en;

    const cert1Title = document.getElementById("cert1Title");
    const cert1Description = document.getElementById("cert1Description");
    const cert2Title = document.getElementById("cert2Title");
    const cert2Description = document.getElementById("cert2Description");
    const cert3Title = document.getElementById("cert3Title");
    const cert3Description = document.getElementById("cert3Description");
    const cert1Btn = document.getElementById("cert1Btn");
    const cert2Btn = document.getElementById("cert2Btn");
    const cert3Btn = document.getElementById("cert3Btn");

    if (cert1Title) cert1Title.textContent = copy.cert1Title;
    if (cert1Description) cert1Description.textContent = copy.cert1Description;
    if (cert2Title) cert2Title.textContent = copy.cert2Title;
    if (cert2Description) cert2Description.textContent = copy.cert2Description;
    if (cert3Title) cert3Title.textContent = copy.cert3Title;
    if (cert3Description) cert3Description.textContent = copy.cert3Description;
    if (cert1Btn) cert1Btn.textContent = copy.certOpen;
    if (cert2Btn) cert2Btn.textContent = copy.certOpen;
    if (cert3Btn) cert3Btn.textContent = copy.certOpen;
};
