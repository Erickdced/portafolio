window.PROJECT_PAGE = {
    en: {
        pageTitle: "Project 1 | Custom 2D Game Engine & RPG Core",
        name: "Erick Cedillo",
        navOverview: "Challenge",
        navStack: "Engineering",
        navImpact: "Achievements",
        navBack: "Back",
        themeText: "Dark Mode",
        projectTitle: "Custom 2D Game Engine & RPG Core",
        projectSubtitle: "A study on procedural C and low-level resource management.",
        backHome: "Back to projects",
        sectionOverviewTitle: "Technical Challenge",
        sectionOverviewText: "The goal was to develop a fully functional game core from scratch, without modern engines such as Unity or Godot. This required implementing every system manually: from the rendering loop to collision detection based on pixel data.",
        sectionStackTitle: "Deep Dive: Engineering Behind the Code",
        stackItems: [
            "Double Buffer Rendering: To prevent on-screen flickering, I implemented an intermediate memory buffer (BITMAP *buffer). All draw calls run in the background buffer and are swapped to screen in a single blit(buffer, screen...) operation, keeping visual output smooth at 60 FPS.",
            "Color-Based Collision Detection (Hitbox Scanning): Instead of simple AABB boxes, I used pixel scanning on dedicated bitmap hitboxes (BITMAP *hitbox). The engine checks exact color values with getpixel() to detect walls (white), enemies (cyan), and interaction objects (orange).",
            "Memory & Pointer Management: The code handles dynamic structures for player, enemies, and bosses. At shutdown, a manual cleanup routine traverses and frees each resource (destroy_bitmap) to avoid memory leaks.",
            "Coordinate-Based Pursuit AI: I built tracking algorithms (enemy_pursuit and boss_pursuit) that compute relative distances in real time, dynamically updating movement direction and enemy animation sprites."
        ],
        sectionImpactTitle: "Technical Achievements",
        impactItems: [
            "Modular Architecture: Clear separation between physical state updates (playerValues, enemyValues) and attack/damage logic.",
            "Resource Optimization: Single source file handling multiple maps, dialogues, and game states through lightweight state machines.",
            "Combat Physics: Manual implementation of knockback reactions and dynamic weapon damage boxes."
        ]
    },
    es: {
        pageTitle: "Proyecto 1 | Custom 2D Game Engine & RPG Core",
        name: "Erick Cedillo",
        navOverview: "Reto",
        navStack: "Ingeniería",
        navImpact: "Logros",
        navBack: "Volver",
        themeText: "Modo oscuro",
        projectTitle: "Custom 2D Game Engine & RPG Core",
        projectSubtitle: "Un estudio de C procedural y gestión de recursos a bajo nivel.",
        backHome: "Volver a proyectos",
        sectionOverviewTitle: "El Reto Técnico",
        sectionOverviewText: "El objetivo fue desarrollar un núcleo de juego completamente funcional desde cero, sin el uso de motores modernos como Unity o Godot. Esto requirió la implementación manual de cada sistema: desde el ciclo de renderizado hasta la detección de colisiones basada en datos de píxeles.",
        sectionStackTitle: "Inmersión Técnica: La Ingeniería detrás del Código",
        stackItems: [
            "Renderizado por Double Buffering: Para evitar el parpadeo (flickering) en pantalla, implementé un sistema de búfer de memoria intermedio (BITMAP *buffer). Todo el dibujado ocurre en este búfer en segundo plano y se vuelca a la pantalla en un solo paso mediante blit(buffer, screen...), garantizando una experiencia visual fluida a 60 FPS.",
            "Detección de Colisiones por Color (Hitbox Scanning): En lugar de simples cajas de colisión (AABB), utilicé una técnica de escaneo de píxeles en mapas de bits dedicados (BITMAP *hitbox). El motor consulta el color exacto en coordenadas específicas mediante getpixel() para determinar si el jugador está tocando una pared (blanco), un enemigo (cian) o un objeto de interacción (naranja).",
            "Gestión de Memoria y Punteros: El código maneja estructuras dinámicas de datos para el jugador, enemigos y jefes. Al final de la ejecución, implementé una rutina de limpieza manual que recorre y libera cada recurso de memoria (destroy_bitmap) para prevenir memory leaks.",
            "IA de Persecución Basada en Coordenadas: Desarrollé algoritmos de seguimiento (enemy_pursuit y boss_pursuit) que calculan la distancia relativa entre entidades en tiempo real, ajustando la dirección y los sprites de animación de los enemigos de forma dinámica."
        ],
        sectionImpactTitle: "Logros Técnicos",
        impactItems: [
            "Arquitectura Modular: Separación clara entre la actualización de valores físicos (playerValues, enemyValues) y la lógica de ataque y daño.",
            "Optimización de Recursos: Uso de un solo archivo de código fuente para gestionar múltiples mapas, diálogos y estados de juego mediante máquinas de estado simples.",
            "Física de Combate: Implementación manual de knockback (retroceso al ser golpeado) y cajas de daño dinámicas para las armas."
        ]
    }
};
