import type { WhatsNewDictionary } from './types';

export const ko: WhatsNewDictionary = {
  meta: {
    title: '업데이트 내역 – Magic Notebook',
    desc: 'Magic Notebook의 업데이트 기록.',
  },

  page: {
    title: '업데이트 내역',
    versionLabel: '버전',
  },

  legend: [
    {
      tone: 'new',
      label: '새 기능',
      shortLabel: '신규',
    },
    {
      tone: 'improvement',
      label: '개선',
      shortLabel: '개선',
    },
    {
      tone: 'fix',
      label: '수정',
      shortLabel: '수정',
    },
  ],

  releases: [
    {
      date: '2026년 5월 15일',
      version: '1.1.1',

      items: [
        {
          tone: 'new',
          text: '편안한 비주얼 에디터로 노트를 작성할 수 있습니다.',
        },
        {
          tone: 'new',
          text: 'Word, Markdown, 일반 텍스트 파일을 지원합니다.',
        },
        {
          tone: 'new',
          text: '제목, 목록, 링크 등으로 문서를 서식 지정할 수 있습니다.',
        },
        {
          tone: 'new',
          text: '표, 이미지, 코드 블록을 문서에 추가할 수 있습니다.',
        },
        {
          tone: 'new',
          text: '웹페이지와 AI 채팅에서 표와 이미지를 유지한 채 붙여넣을 수 있습니다.',
        },
        {
          tone: 'new',
          text: '현재 문서 안에서 검색할 수 있습니다.',
        },
        {
          tone: 'new',
          text: '모든 변경 사항은 자동 저장됩니다.',
        },
        {
          tone: 'new',
          text: '컴퓨터의 폴더를 열고 앱 안에서 바로 파일을 관리할 수 있습니다.',
        },
        {
          tone: 'new',
          text: '노트와 폴더를 쉽게 생성, 이동, 이름 변경할 수 있습니다.',
        },
        {
          tone: 'new',
          text: '정렬과 검색으로 파일을 빠르게 찾을 수 있습니다.',
        },
        {
          tone: 'new',
          text: 'Finder에서 직접 파일을 열 수 있습니다.',
        },
        {
          tone: 'new',
          text: '언어, 라이트 / 다크 테마, 개발자 모드를 설정할 수 있습니다.',
        },
        {
          tone: 'new',
          text: '앱 안에서 빠른 도움말을 바로 확인할 수 있습니다.',
        },
        {
          tone: 'new',
          text: '개발자는 비주얼 보기와 Markdown 보기를 전환하며 작업할 수 있습니다.',
        },
      ],
    },
  ],
};
