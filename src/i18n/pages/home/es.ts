export const es = {
  meta: {
    title: 'Magic Notebook — Editor de texto simple y moderno',
    desc: 'Una app sencilla para notas, artículos y documentos',
  },
  hero: {
    eyebrow: 'Editor de texto',
    title: 'Escribe por tu cuenta. Solo escribe',
    desc: 'Una app cómoda para quienes solo quieren escribir. <span class="text-brand">✔︎</span> Sin interfaces recargadas. <span class="text-brand">✔︎</span> Sin sistemas complicados. <span class="text-brand">✔︎</span> Sin dependencia de la nube. Solo abre una carpeta y empieza.',
    alt: 'Anna, tu asistente de IA',
    linkPrimary: 'Descargar',
    linkSecondary: 'Ver vídeo',
    linkSecondaryPlaceholder: 'el editor es gratuito y',
    linkSecondaryComingSoon: 'se lanza el 15 de mayo',
  },
  carousel: {
    labels: {
      aria: 'Funciones',
      counter: 'Diapositiva:',
      goTo: 'Ir a la diapositiva',
      next: 'Siguiente diapositiva',
      pagination: 'Navegación de diapositivas',
      prev: 'Diapositiva anterior',
    },

    slide01: {
      title: 'Escribe sin aprender programas',
      desc: 'Un editor simple para notas, artículos y documentos.',
    },
    slide02: {
      title: 'Abre una carpeta y empieza',
      desc: 'Sin registro, configuración ni sistemas complicados.',
    },
    slide03: {
      title: 'Formato sencillo',
      desc: 'Títulos, listas, tablas, enlaces e imágenes siempre a mano.',
    },
    slide04: {
      title: 'Tus textos siguen siendo archivos normales',
      desc: 'DOCX, Markdown y TXT en carpetas habituales de tu ordenador.',
    },
    slide05: {
      title: 'A tu manera',
      desc: 'Tema claro u oscuro, idioma y modo desarrollador.',
    },
    slide06: {
      title: 'Guardado automático sin preocupaciones',
      desc: 'Nada se pierde: todos los cambios se guardan automáticamente.',
    },
  },
  why: {
    title: '¿Por qué existe?',
    list: [
      'Los editores online obligan a guardar tus textos en la nube.',
      'Word está sobrecargado de herramientas de maquetación e impresión (¿quién necesita eso hoy?).',
      'Las apps de notas te obligan a aprender Markdown o bases de datos.',
      'Y si la IA escribe todo por ti, con el tiempo pierdes una de las habilidades humanas más importantes: expresar ideas con claridad.',
    ],
    offer:
      'Magic Notebook es una alternativa sencilla. Sin curva de aprendizaje: <strong>abre una carpeta</strong> → <strong>crea un archivo</strong> → <strong>empieza a escribir</strong>.',
    alt: 'Mujer escribiendo en un portátil en la cama',
  },
  features: {
    title: '¿Qué incluye?',
    desc: 'Todo lo que obtienes al instalar la app',
    product: {
      title: 'Un editor diferente',
      list: [
        'Rápido y ligero',
        'Con una interfaz limpia y agradable',
        'Trabaja con archivos normales de tu ordenador: DOCX (Microsoft Word), Markdown y TXT',
        'Guardado automático',
      ],
    },
    audience: {
      title: 'Para quienes escriben mucho',
      desc: 'Ideal para bloggers, marketers, redactores, periodistas, estudiantes, autores y cualquier persona que necesite una herramienta cómoda para escribir.',
    },
  },
  cta: {
    title: 'Empieza a escribir — la app es gratuita',
    supportPrefix: 'Y si quieres apoyar el proyecto —',
    support: 'será un placer ✨',
  },
  tadaTodo: {
    title: 'Quién lo hace y qué viene después',
    vladimir: {
      title: 'Magic Notebook lo desarrolla un creador independiente ',
      desc: 'que simplemente necesitaba una app más cómoda para escribir. Sin equipo ni inversores, pero con mucho cariño.',
      alt: 'Vladimir, creador de Magic Notebook',
    },
    anna: {
      title: 'Próximamente:',
      list: [
        '👩🏻 Asistente de IA.',
        '🏷️ Herramientas de conocimiento: etiquetas, enlaces internos, favoritos y marcadores.',
        '👨🏻‍💻👩‍💻 Colaboración y control de versiones.',
      ],
      alt: 'Anna, asistente de IA de Magic Notebook',
    },
  },
  comparison: {
    title: 'Todo se entiende mejor comparando',
    desc: 'Cada app tiene sus puntos fuertes',
    caption: 'Comparación entre Magic Notebook, Word, Google Docs y Notion',
    features: {
      th: 'Característica',
      cleanInterface: 'Simplicidad e interfaz ligera',
      realFiles: 'Trabaja con archivos normales',
      noCloud: 'Sin servicios en la nube',
      longTexts: 'Cómodo para textos largos',
      price: 'Precio',
    },
    download: 'Descargar',
    downloadApp: 'Descargar la app',
    prices: {
      free: 'Gratis',
      word: '~6–10 $/mes',
      notion: '0–15 $/mes',
    },
  },
} as const;
