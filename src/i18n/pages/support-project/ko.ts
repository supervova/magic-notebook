export const ko = {
  meta: {
    title: '프로젝트 후원 – Magic Notebook',
    desc: '후원이나 구매를 통해 Magic Notebook 개발을 지원할 수 있습니다.',
  },

  title: '마음에 드셨다면',
  titleSuffix: '♥️ 프로젝트를 응원해주세요',

  intro:
    'Magic Notebook은 한 명의 개발자가 만들고 있는 독립 프로젝트입니다. 목표는 글쓰기가 편안하게 느껴지는 에디터를 만드는 것입니다. 지금은 본업과 병행하며 개발하고 있습니다. 이 방향성이 마음에 드셨다면 작은 후원도 큰 힘이 됩니다. 앞으로 AI 어시스턴트, 지식 관리 기능(태그·내부 링크), 스마트 테이블 등을 추가할 예정입니다.',

  options: {
    title: '후원 방법',

    donation: {
      title: '후원하기',
      cta: 'Ko-fi',
      desc: '이미 앱을 사용 중이고 개발을 응원하고 싶다면 여기서 후원할 수 있습니다. 웹사이트에 프로필 카드나 아바타도 표시됩니다.',
    },

    purchase: {
      title: '구매하기',
      cta: 'Gumroad',
      desc: '앱은 무료지만 Gumroad에서 구매할 수도 있습니다. ✔️ 앱과 얼리 액세스 ✔️ 직접 다운로드 ✔️ 빠른 업데이트 ✔️ 사이트 내 카드와 아바타 ✔️ +100 카르마 포인트가 포함됩니다.',
    },

    sponsorship: {
      title: '스폰서 되기',
      cta: 'Patreon',
      desc: '이미 앱을 사용 중이고 개발을 응원하고 싶다면 여기서 후원할 수 있습니다. 웹사이트에 프로필 카드나 아바타도 표시됩니다.',
    },
  },

  supporters: {
    title: '여기에 당신의 아바타와 SNS 링크가 표시될 수 있습니다',

    cardThreshold:
      '$100 이상 후원·구매 시 한 달간 프로필 카드가 표시됩니다. $10 이상이면 호버 패널이 있는 아바타가 추가됩니다. 추가 후원 $100 또는 $10마다 게시 기간이 한 달씩 연장됩니다.',

    profileAriaLabel: '{platform}에서 {name} 프로필 열기',
  },

  thanks: {
    title: '정말 감사합니다 💖',

    desc: '후원해 주시면 큰 힘이 됩니다. 하지만 후원하지 않아도 괜찮습니다. 그것 역시 Magic Notebook이 지향하는 방식입니다. 돈이 아니어도 프로젝트를 응원할 수 있습니다.',

    shareTitle: '링크 공유:',
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
    email: '이메일',
    tiktok: 'TikTok',
  },
} as const;
