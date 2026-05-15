export const it = {
  meta: {
    title: 'Supporta il progetto – Magic Notebook',
    desc: 'Supporta Magic Notebook con una donazione, un acquisto o una sponsorizzazione e aiuta ad accelerarne lo sviluppo.',
  },

  title: 'Fai una cosa bella',
  titleSuffix: '♥️ Supporta il progetto',

  intro:
    'Magic Notebook è sviluppato da una sola persona. Il mio obiettivo è creare l’app di scrittura più piacevole possibile. Per ora ci lavoro la sera, dopo il lavoro principale. Se il progetto ti piace, anche un piccolo supporto aiuta a dedicare più tempo allo sviluppo. Nei prossimi mesi: assistente IA, strumenti per organizzare la conoscenza (tag, link interni) e tabelle intelligenti.',

  options: {
    title: 'Come puoi aiutare?',

    donation: {
      title: 'Donazione',
      cta: 'Vai su Ko-fi →',
      desc: 'Se usi già l’app e vuoi sostenere il suo sviluppo — ottenendo anche una card o un avatar sul sito.',
    },

    purchase: {
      title: 'Acquisto',
      cta: 'Acquista su Gumroad →',
      desc: 'L’editor è gratuito, ma puoi anche acquistarlo su Gumroad. Riceverai: ✔️ l’app e accesso anticipato alle nuove versioni, ✔️ download diretti delle build, ✔️ aggiornamenti più rapidi, ✔️ una card o un avatar sul sito, ✔️ +100 punti karma.',
    },

    sponsorship: {
      title: 'Sponsorizzazione',
      cta: 'Supporta su Patreon',
      desc: 'L’editor resterà gratuito, ma puoi diventare sponsor su Patreon. Riceverai: ✔️ l’app e accesso anticipato alle nuove versioni, ✔️ download diretti delle build, ✔️ aggiornamenti più rapidi, ✔️ una card o un avatar sul sito, ✔️ +100 punti karma.',
    },
  },

  supporters: {
    title: 'Qui potrebbe apparire il tuo avatar con link ai social',

    cardThreshold:
      'Da una donazione/acquisto di $100 — card profilo per un mese. Da $10 — avatar con info al passaggio del mouse.',

    profileAriaLabel: 'Apri il profilo di {name} su {platform}',
  },

  thanks: {
    title: 'Grazie 💖',

    desc: 'Se scegli di supportare il progetto — grazie davvero. E se non lo fai, va bene lo stesso. È proprio questa la filosofia di Magic Notebook. Inoltre puoi aiutare anche senza spendere nulla…',

    shareTitle: 'Condividi il link:',
  },

  platforms: {
    koFi: 'Ko-fi',
    patreon: 'Patreon',
    productHunt: 'Product Hunt',
    x: 'X.com',
    facebook: 'Facebook',
    vk: 'VKontakte',
    linkedin: 'LinkedIn',
    telegram: 'Telegram',
    email: 'E-mail',
    tiktok: 'TikTok',
  },
} as const;
