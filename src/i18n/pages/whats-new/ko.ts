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
      date: '2026년 8월 19일',
      version: '1.3.0',
      items: [
        {
          tone: 'new',
          text: '컴팩트 모드 추가: 앱을 시계 옆 시스템 트레이로 최소화해 언제든 빠르게 열 수 있습니다.',
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
      date: '2026년 8월 4일',
      version: '1.2.0',
      items: [
        { tone: 'new', text: '긴 문서의 섹션을 소제목별로 접을 수 있습니다.' },
        { tone: 'new', text: '코드 편집기 스타일의 테마를 추가했습니다.' },
        { tone: 'improvement', text: '이제 접근 가능한 모든 폴더에서 문서를 열 수 있습니다.' },
        { tone: 'improvement', text: '읽는 동안 도구 모음이 숨겨지고 필요할 때 다시 나타납니다.' },
        { tone: 'improvement', text: '앱이 더 빠르고 반응성이 좋아졌습니다.' },
        { tone: 'improvement', text: 'Windows 통합을 개선했습니다.' },
      ],
    },
    {
      date: '2026년 6월 26일',
      version: '1.1.3',
      items: [
        { tone: 'new', text: '이제 Windows에서도 Magic Notebook을 사용할 수 있습니다.' },
        {
          tone: 'improvement',
          text: '사이드바에서 파일을 만드는 작업이 더 빠르고 안정적으로 개선되었습니다.',
        },
        { tone: 'fix', text: '몇 가지 작은 오류를 수정했습니다.' },
      ],
    },
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
