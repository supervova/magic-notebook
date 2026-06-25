import type { WhatsNewDictionary } from './types';

export const zh: WhatsNewDictionary = {
  meta: {
    title: '更新日志 – Magic Notebook',
    desc: 'Magic Notebook 的版本更新记录。',
  },

  page: {
    title: '更新日志',
    versionLabel: '版本',
  },

  legend: [
    {
      tone: 'new',
      label: '新功能',
      shortLabel: '新增',
    },
    {
      tone: 'improvement',
      label: '优化',
      shortLabel: '优化',
    },
    {
      tone: 'fix',
      label: '修复',
      shortLabel: '修复',
    },
  ],

  releases: [
    {
      date: '2026 年 6 月 26 日',
      version: '1.1.3',
      items: [
        { tone: 'new', text: 'Magic Notebook 现在已支持 Windows。' },
        { tone: 'improvement', text: '通过侧边栏创建文件现在更快、更稳定。' },
        { tone: 'fix', text: '修复了一些小问题。' },
      ],
    },
    {
      date: '2026 年 5 月 15 日',
      version: '1.1.1',

      items: [
        {
          tone: 'new',
          text: '现在可以使用舒适的可视化编辑器编写笔记。',
        },
        {
          tone: 'new',
          text: '支持 Word、Markdown 和纯文本文件。',
        },
        {
          tone: 'new',
          text: '支持标题、列表、链接等文本格式。',
        },
        {
          tone: 'new',
          text: '可以在文档中插入表格、图片和代码块。',
        },
        {
          tone: 'new',
          text: '支持从网页和 AI 聊天中粘贴内容，并保留表格和图片。',
        },
        {
          tone: 'new',
          text: '支持当前文档内搜索。',
        },
        {
          tone: 'new',
          text: '所有修改都会自动保存。',
        },
        {
          tone: 'new',
          text: '可以直接打开电脑中的文件夹，并在应用内管理文件。',
        },
        {
          tone: 'new',
          text: '支持创建、移动和重命名笔记与文件夹。',
        },
        {
          tone: 'new',
          text: '支持排序与搜索，快速查找文件。',
        },
        {
          tone: 'new',
          text: '可以直接从 Finder 打开文件。',
        },
        {
          tone: 'new',
          text: '支持设置语言、浅色 / 深色主题以及开发者模式。',
        },
        {
          tone: 'new',
          text: '应用内提供快速帮助。',
        },
        {
          tone: 'new',
          text: '开发者可在可视化模式与 Markdown 模式之间切换。',
        },
      ],
    },
  ],
};
