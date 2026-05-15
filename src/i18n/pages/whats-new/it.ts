import type { WhatsNewDictionary } from './types';

export const it: WhatsNewDictionary = {
  meta: {
    title: 'Novità – Magic Notebook',
    desc: 'Cronologia aggiornamenti di Magic Notebook.',
  },

  page: {
    title: 'Novità',
    versionLabel: 'Versione',
  },

  legend: [
    {
      tone: 'new',
      label: 'nuovo',
      shortLabel: 'N',
    },
    {
      tone: 'improvement',
      label: 'migliorato',
      shortLabel: 'M',
    },
    {
      tone: 'fix',
      label: 'corretto',
      shortLabel: 'C',
    },
  ],

  releases: [
    {
      date: '15 maggio 2026',
      version: '1.1.1',

      items: [
        {
          tone: 'new',
          text: 'Modifica le note in un editor visivo semplice e piacevole.',
        },
        {
          tone: 'new',
          text: 'Lavora con file Word, Markdown o testo semplice.',
        },
        {
          tone: 'new',
          text: 'Formatta i tuoi testi con titoli, liste, link e altri elementi familiari.',
        },
        {
          tone: 'new',
          text: 'Inserisci tabelle, immagini e blocchi di codice nelle note.',
        },
        {
          tone: 'new',
          text: 'Incolla contenuti da altre fonti — pagine web o chat IA — mantenendo tabelle e immagini.',
        },
        {
          tone: 'new',
          text: 'Cerca testo nel documento corrente.',
        },
        {
          tone: 'new',
          text: 'Le modifiche vengono salvate automaticamente.',
        },
        {
          tone: 'new',
          text: 'Apri cartelle del computer e lavora direttamente con i file nell’app.',
        },
        {
          tone: 'new',
          text: 'Crea nuove note e cartelle, rinominale e spostale facilmente.',
        },
        {
          tone: 'new',
          text: 'Trova i file più velocemente con ordinamento e ricerca per nome.',
        },
        {
          tone: 'new',
          text: 'Apri i file direttamente nel Finder.',
        },
        {
          tone: 'new',
          text: 'Personalizza l’app: lingua, tema chiaro o scuro e modalità sviluppatore.',
        },
        {
          tone: 'new',
          text: 'Se qualcosa non è chiaro, apri semplicemente la guida rapida integrata.',
        },
        {
          tone: 'new',
          text: 'Gli sviluppatori possono passare dalla vista visuale al Markdown mentre lavorano.',
        },
      ],
    },
  ],
};
