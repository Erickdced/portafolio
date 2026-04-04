window.PROJECT_PAGE = {
    en: {
        pageTitle: "Project 2 | Sistema de control de puente movil",
        name: "Erick Cedillo",
        navOverview: "Challenge",
        navStack: "Engineering",
        navImpact: "Specs",
        navBack: "Back",
        themeText: "Dark Mode",
        projectTitle: "Sistema de control de puente movil",
        projectSubtitle: "Hardware-software integration for actuator control and ultrasonic monitoring.",
        backHome: "Back to projects",
        sectionOverviewTitle: "Engineering Challenge",
        sectionOverviewText: "The main challenge was to build a robust system that integrated multiple actuator types (servo motors for locking and DC motors with PWM for elevation) with an ultrasonic distance sensor, ensuring that the bridge’s physical state and the graphical interface remained synchronized at all times, even during emergency stops or abrupt direction changes.",
        sectionStackTitle: "Technical Deep Dive: Engineering Behind the Code",
        stackItems: [
            "Power Control through PWM (Pulse Width Modulation): I used gpiozero to implement PWM signals on pins 18 and 13. This enabled fine control over lift motor speed, preventing sudden starts that could compromise the laser-cut mechanical structure.",
            "State Logic and Safety (Interlocking): I implemented a state machine to manage the operation cycle. Mechanical locking: the servo (pin 23) is released only when the state is \"Lowering\" or \"Down\", preventing illegal operations that could damage the gear train. Real-time sensor fusion: the ultrasonic sensor (trigger=21, echo=20) does more than measure distance; the software converts those readings into an opening percentage (0-100%) reflected instantly in the GUI.",
            "Dynamic Monitoring Interface (Pygame): I developed a custom GUI that behaves like an industrial control panel. The system draws the bridge at different positions based on real sensor readings, not only on what the software assumes is happening.",
            "Feedback Peripherals Handling: I integrated a NeoPixel strip for visual state communication (Safe/Warning/Emergency), using direct-write protocols on the Raspberry Pi 5 data bus."
        ],
        sectionImpactTitle: "Technical Specifications",
        impactItems: [
            "Microcontroller: Raspberry Pi 5.",
            "Protocols and Signals: PWM for motors, pulse signal for servos, trigger/echo for ultrasonic sensing.",
            "Safety: Software-level \"Emergency Stop\" button that immediately interrupts all output signals (stopPlatform)."
        ]
    },
    es: {
        pageTitle: "Proyecto 2 | Sistema de control de puente movil",
        name: "Erick Cedillo",
        navOverview: "Reto",
        navStack: "Ingeniería",
        navImpact: "Specs",
        navBack: "Volver",
        themeText: "Modo oscuro",
        projectTitle: "Sistema de control de puente movil",
        projectSubtitle: "Integración de hardware y software para el control de actuadores y monitoreo ultrasónico.",
        backHome: "Volver a proyectos",
        sectionOverviewTitle: "El Reto de Ingeniería",
        sectionOverviewText: "El desafío principal fue crear un sistema robusto que integrara múltiples tipos de actuadores (servomotores para bloqueo y motores de DC con PWM para elevación) con un sensor de distancia ultrasónico, asegurando que el estado físico del puente y la interfaz gráfica estuvieran siempre sincronizados, incluso ante paros de emergencia o cambios bruscos de dirección.",
        sectionStackTitle: "Inmersión Técnica: La Ingeniería detrás del Código",
        stackItems: [
            "Control de Potencia mediante PWM (Pulse Width Modulation): Utilicé la librería gpiozero para implementar señales PWM en los pines 18 y 13. Esto permitió un control fino sobre la velocidad de los motores de elevación, evitando arranques bruscos que pudieran comprometer la estructura mecánica cortada en láser.",
            "Lógica de Estado y Seguridad (Interlocking): Implementé una máquina de estados para gestionar el ciclo de operación. Bloqueo mecánico: el servo (pin 23) solo se libera cuando el estado es \"Bajando\" o \"Abajo\", impidiendo operaciones ilegales que dañarían los engranajes. Fusión de sensores en tiempo real: el sensor ultrasónico (trigger=21, echo=20) no solo mide distancia; el software convierte estas lecturas en un porcentaje de apertura (0-100%) que se refleja instantáneamente en la GUI.",
            "Interfaz de Monitoreo Dinámica (Pygame): Desarrollé una GUI personalizada que funciona como un panel de control industrial. El sistema dibuja el puente en diferentes posiciones según la lectura real del sensor, no solo según lo que el software \"cree\" que está pasando.",
            "Manejo de Periféricos de Retroalimentación: Integré una tira de NeoPixels para comunicación visual de estados (Safe/Warning/Emergency), utilizando protocolos de escritura directa en el bus de datos de la Raspberry Pi 5."
        ],
        sectionImpactTitle: "Especificaciones Técnicas",
        impactItems: [
            "Microcontrolador: Raspberry Pi 5.",
            "Protocolos y Señales: PWM para motores, Señal de Pulso para Servos, Trigger/Echo para Ultrasonido.",
            "Seguridad: Implementación de un botón de \"Paro de Emergencia\" por software que interrumpe inmediatamente todas las señales de salida (stopPlatform)."
        ]
    }
};
