export const ja = {
  meta: {
    title: 'プロジェクトを支援 – Magic Notebook',
    desc: '寄付や購入、スポンサー支援を通じて、Magic Notebookの開発を応援できます。',
  },

  title: 'もし気に入っていただけたら',
  titleSuffix: '♥️ プロジェクトを応援してください',

  intro:
    'Magic Notebookは個人で開発しているプロジェクトです。目指しているのは、「書くこと」が心地よく感じられるエディタを作ること。現在は本業の合間に開発を続けています。もしこの方向性に共感していただけたなら、小さな支援でも大きな力になります。今後はAIアシスタント、知識整理ツール（タグや内部リンク）、スマートテーブルなどを追加予定です。',

  options: {
    title: '支援方法',

    donation: {
      title: '寄付',
      cta: 'Ko-fi',
      desc: 'すでにアプリを使っていて、開発を応援したい方向けです。サイトにプロフィールカードやアバターも表示されます。',
    },

    purchase: {
      title: '購入',
      cta: 'Gumroad',
      desc: 'アプリ自体は無料ですが、Gumroadから購入することもできます。✔️ アプリ本体と先行アクセス ✔️ 直接ダウンロード ✔️ 迅速なアップデート ✔️ サイト上のカードやアバター ✔️ +100カルマポイント が含まれます。',
    },

    sponsorship: {
      title: 'スポンサー支援',
      cta: 'Patreon',
      desc: 'すでにアプリを使っていて、開発を応援したい方向けです。サイトにプロフィールカードやアバターも表示されます。',
    },
  },

  supporters: {
    title: 'ここにあなたのアバターやSNSリンクを掲載できます',

    cardThreshold:
      '$100以上の支援・購入で1か月間プロフィールカードを掲載。$10以上でホバー表示付きアバターを掲載します。 追加の $100 または $10 ごとに、掲載期間がさらに1か月延長されます。',

    profileAriaLabel: '{platform} の {name} プロフィールを開く',
  },

  thanks: {
    title: 'ありがとうございます 💖',

    desc: '支援していただけたら本当に嬉しいです。でも、支援しなくても大丈夫。それもMagic Notebookの考え方のひとつです。お金以外でも応援できます。',

    shareTitle: 'リンクを共有:',
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
    email: 'メール',
    tiktok: 'TikTok',
  },
} as const;
