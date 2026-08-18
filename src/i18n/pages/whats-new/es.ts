import type { WhatsNewDictionary } from './types';

export const es: WhatsNewDictionary = {
  meta: {
    title: 'Novedades – Magic Notebook',
    desc: 'Historial de cambios de Magic Notebook.',
  },

  page: {
    title: 'Novedades',
    versionLabel: 'Versión',
  },

  legend: [
    {
      tone: 'new',
      label: 'nuevo',
      shortLabel: 'N',
    },
    {
      tone: 'improvement',
      label: 'mejorado',
      shortLabel: 'M',
    },
    {
      tone: 'fix',
      label: 'corregido',
      shortLabel: 'C',
    },
  ],

  releases: [
    {
      date: '19 de agosto de 2026',
      version: '1.3.0',
      items: [
        {
          tone: 'new',
          text: 'Añadido el modo compacto: la app puede minimizarse al área de notificación junto al reloj para tenerla siempre a mano.',
        },
      ],
      images: [
        '2026-08-18-macos-settings',
        '2026-08-18-macos-doc',
        '2026-08-18-windows-settings',
        '2026-08-18-windows-doc',
      ],
    },
    {
      date: '4 de agosto de 2026',
      version: '1.2.0',
      items: [
        { tone: 'new', text: 'Contrae secciones de documentos extensos mediante subtítulos.' },
        { tone: 'new', text: 'Se añadió un tema inspirado en un editor de código.' },
        { tone: 'improvement', text: 'Ahora puedes abrir documentos desde cualquier carpeta accesible.' },
        {
          tone: 'improvement',
          text: 'La barra de herramientas se oculta al leer y reaparece cuando la necesitas.',
        },
        { tone: 'improvement', text: 'La aplicación ahora es más rápida y ágil.' },
        { tone: 'improvement', text: 'Se mejoró la integración con Windows.' },
      ],
    },
    {
      date: '26 de junio de 2026',
      version: '1.1.3',
      items: [
        { tone: 'new', text: 'Magic Notebook ya está disponible para Windows.' },
        {
          tone: 'improvement',
          text: 'Crear archivos desde la barra lateral ahora es más rápido y estable.',
        },
        { tone: 'fix', text: 'Se corrigieron algunos errores menores.' },
      ],
    },
    {
      date: '15 de mayo de 2026',
      version: '1.1.1',

      items: [
        {
          tone: 'new',
          text: 'Edita notas en un editor visual cómodo y limpio.',
        },
        {
          tone: 'new',
          text: 'Trabaja con archivos Word, Markdown o texto plano.',
        },
        {
          tone: 'new',
          text: 'Da formato a tus textos con títulos, listas, enlaces y otros elementos habituales.',
        },
        {
          tone: 'new',
          text: 'Inserta tablas, imágenes y bloques de código en tus notas.',
        },
        {
          tone: 'new',
          text: 'Pega contenido desde otras fuentes — páginas web o chats con IA — conservando tablas e imágenes.',
        },
        {
          tone: 'new',
          text: 'Busca texto dentro del documento actual.',
        },
        {
          tone: 'new',
          text: 'Los cambios se guardan automáticamente.',
        },
        {
          tone: 'new',
          text: 'Abre carpetas de tu ordenador y trabaja directamente con los archivos desde la app.',
        },
        {
          tone: 'new',
          text: 'Crea nuevas notas y carpetas, renómbralas y muévelas fácilmente entre secciones.',
        },
        {
          tone: 'new',
          text: 'Encuentra archivos más rápido con ordenación y búsqueda por nombre.',
        },
        {
          tone: 'new',
          text: 'Abre archivos directamente en Finder.',
        },
        {
          tone: 'new',
          text: 'Personaliza la app: idioma, tema claro u oscuro y modo desarrollador.',
        },
        {
          tone: 'new',
          text: 'Si algo no queda claro, abre la guía rápida integrada.',
        },
        {
          tone: 'new',
          text: 'Si eres desarrollador, puedes alternar entre vista visual y Markdown mientras trabajas.',
        },
      ],
    },
  ],
};
