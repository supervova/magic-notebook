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
      date: '2026年10月1日',
      version: '1.3.1',
      items: [
        { tone: 'new', text: 'Mac App Store版を追加しました。' },
        { tone: 'fix', text: '軽微な修正とインターフェースの改善。' },
      ],
    },
    {
      date: '2026年8月19日',
      version: '1.3.0',
      items: [
        {
          tone: 'new',
          text: 'コンパクトモードを追加：アプリを時計の近くにあるシステムトレイへ最小化でき、いつでもすぐ呼び出せます。',
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
      date: '2026年8月4日',
      version: '1.2.0',
      items: [
        { tone: 'new', text: '大きなドキュメントのセクションを小見出しごとに折りたためるようになりました。' },
        { tone: 'new', text: 'コードエディタ風のテーマを追加しました。' },
        { tone: 'improvement', text: 'アクセスできる任意のフォルダからドキュメントを開けるようになりました。' },
        { tone: 'improvement', text: 'ツールバーは閲覧中に非表示になり、必要なときに再表示されます。' },
        { tone: 'improvement', text: 'アプリがより高速で応答性の高いものになりました。' },
        { tone: 'improvement', text: 'Windows との連携を改善しました。' },
      ],
    },
    {
      date: '2026年6月26日',
      version: '1.1.3',
      items: [
        { tone: 'new', text: 'Magic Notebook が Windows で利用できるようになりました。' },
        { tone: 'improvement', text: 'サイドバーからのファイル作成がより速く、安定しました。' },
        { tone: 'fix', text: 'いくつかの軽微な不具合を修正しました。' },
      ],
    },
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
