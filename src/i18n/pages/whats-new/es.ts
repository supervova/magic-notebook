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
