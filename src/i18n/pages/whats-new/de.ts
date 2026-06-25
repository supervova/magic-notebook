import type { WhatsNewDictionary } from './types';

export const de: WhatsNewDictionary = {
  meta: {
    title: 'Was neu ist – Magic Notebook',
    desc: 'Änderungsverlauf von Magic Notebook.',
  },
  page: {
    title: 'Was neu ist',
    versionLabel: 'Version',
  },
  legend: [
    {
      tone: 'new',
      label: 'neu',
      shortLabel: 'N',
    },
    {
      tone: 'improvement',
      label: 'verbessert',
      shortLabel: 'V',
    },
    {
      tone: 'fix',
      label: 'behoben',
      shortLabel: 'B',
    },
  ],
  releases: [
    {
      date: '26. Juni 2026',
      version: '1.1.3',
      items: [
        { tone: 'new', text: 'Magic Notebook ist jetzt für Windows verfügbar.' },
        {
          tone: 'improvement',
          text: 'Das Erstellen von Dateien über die Seitenleiste ist jetzt schneller und stabiler.',
        },
        { tone: 'fix', text: 'Einige kleinere Fehler wurden behoben.' },
      ],
    },
    {
      date: '15. Mai 2026',
      version: '1.1.1',
      items: [
        {
          tone: 'new',
          text: 'Bearbeiten Sie Notizen in einem komfortablen visuellen Editor.',
        },
        {
          tone: 'new',
          text: 'Arbeiten Sie mit Word-Dateien, Markdown oder einfachem Text.',
        },
        {
          tone: 'new',
          text: 'Formatieren Sie Texte mit Überschriften, Listen, Links und anderen vertrauten Elementen.',
        },
        {
          tone: 'new',
          text: 'Fügen Sie Tabellen, Bilder und Codeblöcke in Ihre Notizen ein.',
        },
        {
          tone: 'new',
          text: 'Fügen Sie Inhalte aus anderen Quellen ein – Webseiten oder KI-Chats – und behalten Sie Tabellen und Bilder bei.',
        },
        {
          tone: 'new',
          text: 'Suchen Sie Text im aktuellen Dokument.',
        },
        {
          tone: 'new',
          text: 'Änderungen werden automatisch gespeichert.',
        },
        {
          tone: 'new',
          text: 'Öffnen Sie Ordner auf Ihrem Computer und arbeiten Sie direkt in der App mit Dateien.',
        },
        {
          tone: 'new',
          text: 'Erstellen Sie neue Notizen und Ordner, benennen Sie sie um und verschieben Sie sie bequem zwischen Bereichen.',
        },
        {
          tone: 'new',
          text: 'Finden Sie Dateien schneller mit Sortierung und Suche nach Namen.',
        },
        {
          tone: 'new',
          text: 'Öffnen Sie Dateien direkt aus der App im Finder.',
        },
        {
          tone: 'new',
          text: 'Passen Sie die App an: Sprache, helles oder dunkles Design und Entwicklermodus.',
        },
        {
          tone: 'new',
          text: 'Wenn etwas unklar ist, öffnen Sie einfach die kurze Hilfeseite.',
        },
        {
          tone: 'new',
          text: 'Als Entwickler können Sie während der Arbeit zwischen visueller Ansicht und Markdown-Ansicht wechseln.',
        },
      ],
    },
  ],
};
