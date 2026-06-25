import type { WhatsNewDictionary } from './types';

export const pt: WhatsNewDictionary = {
  meta: {
    title: 'Novidades – Magic Notebook',
    desc: 'Histórico de atualizações do Magic Notebook.',
  },

  page: {
    title: 'Novidades',
    versionLabel: 'Versão',
  },

  legend: [
    {
      tone: 'new',
      label: 'novo',
      shortLabel: 'N',
    },
    {
      tone: 'improvement',
      label: 'melhorado',
      shortLabel: 'M',
    },
    {
      tone: 'fix',
      label: 'corrigido',
      shortLabel: 'C',
    },
  ],

  releases: [
    {
      date: '26 de junho de 2026',
      version: '1.1.3',
      items: [
        { tone: 'new', text: 'Magic Notebook agora está disponível para Windows.' },
        {
          tone: 'improvement',
          text: 'Criar arquivos pela barra lateral ficou mais rápido e estável.',
        },
        { tone: 'fix', text: 'Corrigidos alguns pequenos erros.' },
      ],
    },
    {
      date: '15 de maio de 2026',
      version: '1.1.1',

      items: [
        {
          tone: 'new',
          text: 'Edite notas em um editor visual simples e confortável.',
        },
        {
          tone: 'new',
          text: 'Trabalhe com arquivos Word, Markdown ou texto simples.',
        },
        {
          tone: 'new',
          text: 'Formate seus textos com títulos, listas, links e outros elementos familiares.',
        },
        {
          tone: 'new',
          text: 'Insira tabelas, imagens e blocos de código nas suas notas.',
        },
        {
          tone: 'new',
          text: 'Cole conteúdo de outras fontes — páginas da web ou chats de IA — mantendo tabelas e imagens.',
        },
        {
          tone: 'new',
          text: 'Pesquise texto no documento atual.',
        },
        {
          tone: 'new',
          text: 'As alterações são salvas automaticamente.',
        },
        {
          tone: 'new',
          text: 'Abra pastas do seu computador e trabalhe diretamente com arquivos dentro do aplicativo.',
        },
        {
          tone: 'new',
          text: 'Crie novas notas e pastas, renomeie e mova tudo facilmente.',
        },
        {
          tone: 'new',
          text: 'Encontre arquivos mais rápido com ordenação e busca por nome.',
        },
        {
          tone: 'new',
          text: 'Abra arquivos diretamente no Finder.',
        },
        {
          tone: 'new',
          text: 'Personalize o aplicativo: idioma, tema claro ou escuro e modo desenvolvedor.',
        },
        {
          tone: 'new',
          text: 'Se algo não estiver claro, basta abrir a ajuda rápida integrada.',
        },
        {
          tone: 'new',
          text: 'Desenvolvedores podem alternar entre visualização visual e Markdown durante o trabalho.',
        },
      ],
    },
  ],
};
