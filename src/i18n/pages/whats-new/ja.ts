import type { WhatsNewDictionary } from './types';

export const ja: WhatsNewDictionary = {
  meta: {
    title: '更新情報 – Magic Notebook',
    desc: 'Magic Notebook の更新履歴。',
  },

  page: {
    title: '更新情報',
    versionLabel: 'バージョン',
  },

  legend: [
    {
      tone: 'new',
      label: '新機能',
      shortLabel: '新',
    },
    {
      tone: 'improvement',
      label: '改善',
      shortLabel: '改',
    },
    {
      tone: 'fix',
      label: '修正',
      shortLabel: '修',
    },
  ],

  releases: [
    {
      date: '2026年5月15日',
      version: '1.1.1',

      items: [
        {
          tone: 'new',
          text: '快適なビジュアルエディタでノートを編集できるようになりました。',
        },
        {
          tone: 'new',
          text: 'Word、Markdown、プレーンテキストのファイルを扱えます。',
        },
        {
          tone: 'new',
          text: '見出し、リスト、リンクなどを使って文章を整形できます。',
        },
        {
          tone: 'new',
          text: '表、画像、コードブロックをノートに追加できます。',
        },
        {
          tone: 'new',
          text: 'WebページやAIチャットから、表や画像を保ったまま貼り付けできます。',
        },
        {
          tone: 'new',
          text: '現在のドキュメント内を検索できます。',
        },
        {
          tone: 'new',
          text: '変更内容は自動保存されます。',
        },
        {
          tone: 'new',
          text: 'PC上のフォルダを開き、アプリ内で直接ファイルを管理できます。',
        },
        {
          tone: 'new',
          text: 'ノートやフォルダの作成、名前変更、移動が簡単に行えます。',
        },
        {
          tone: 'new',
          text: '並び替えや検索でファイルを素早く見つけられます。',
        },
        {
          tone: 'new',
          text: 'Finderから直接ファイルを開けます。',
        },
        {
          tone: 'new',
          text: '言語、ライト / ダークテーマ、開発者モードを設定できます。',
        },
        {
          tone: 'new',
          text: '操作に迷ったときは、内蔵のクイックヘルプを確認できます。',
        },
        {
          tone: 'new',
          text: '開発者はビジュアル表示とMarkdown表示を切り替えながら編集できます。',
        },
      ],
    },
  ],
};
