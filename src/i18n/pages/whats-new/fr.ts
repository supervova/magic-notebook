import type { WhatsNewDictionary } from './types';

export const fr: WhatsNewDictionary = {
  meta: {
    title: 'Nouveautés – Magic Notebook',
    desc: 'Historique des mises à jour de Magic Notebook.',
  },

  page: {
    title: 'Nouveautés',
    versionLabel: 'Version',
  },

  legend: [
    {
      tone: 'new',
      label: 'nouveau',
      shortLabel: 'N',
    },
    {
      tone: 'improvement',
      label: 'amélioré',
      shortLabel: 'A',
    },
    {
      tone: 'fix',
      label: 'corrigé',
      shortLabel: 'C',
    },
  ],

  releases: [
    {
      date: '26 juin 2026',
      version: '1.1.3',
      items: [
        { tone: 'new', text: 'Magic Notebook est désormais disponible pour Windows.' },
        {
          tone: 'improvement',
          text: 'La création de fichiers depuis la barre latérale est plus rapide et plus stable.',
        },
        { tone: 'fix', text: 'Quelques petits bugs ont été corrigés.' },
      ],
    },
    {
      date: '15 mai 2026',
      version: '1.1.1',

      items: [
        {
          tone: 'new',
          text: 'Modifiez vos notes dans un éditeur visuel simple et confortable.',
        },
        {
          tone: 'new',
          text: 'Travaillez avec des fichiers Word, Markdown ou texte brut.',
        },
        {
          tone: 'new',
          text: 'Mettez vos textes en forme avec des titres, listes, liens et autres éléments familiers.',
        },
        {
          tone: 'new',
          text: 'Ajoutez des tableaux, images et blocs de code dans vos notes.',
        },
        {
          tone: 'new',
          text: 'Collez du contenu depuis d’autres sources — pages web ou chats IA — en conservant tableaux et images.',
        },
        {
          tone: 'new',
          text: 'Recherchez du texte dans le document actuel.',
        },
        {
          tone: 'new',
          text: 'Les modifications sont enregistrées automatiquement.',
        },
        {
          tone: 'new',
          text: 'Ouvrez des dossiers de votre ordinateur et travaillez directement avec les fichiers dans l’application.',
        },
        {
          tone: 'new',
          text: 'Créez de nouvelles notes et dossiers, renommez-les et déplacez-les facilement.',
        },
        {
          tone: 'new',
          text: 'Retrouvez vos fichiers plus vite grâce au tri et à la recherche par nom.',
        },
        {
          tone: 'new',
          text: 'Ouvrez les fichiers directement dans Finder.',
        },
        {
          tone: 'new',
          text: 'Personnalisez l’application : langue, thème clair ou sombre et mode développeur.',
        },
        {
          tone: 'new',
          text: 'Si quelque chose n’est pas clair, ouvrez simplement le guide rapide intégré.',
        },
        {
          tone: 'new',
          text: 'Les développeurs peuvent basculer entre vue visuelle et Markdown pendant l’écriture.',
        },
      ],
    },
  ],
};
