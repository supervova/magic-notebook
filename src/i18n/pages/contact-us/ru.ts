import type { ContactUsDictionary } from './types';

export const ru: ContactUsDictionary = {
  meta: {
    title: 'Обратная связь - Magic Notebook',
    desc: 'Отправьте отзыв, вопрос или сообщение об ошибке команде Magic Notebook.',
  },
  page: {
    title: 'Обратная связь',
    intro:
      'Вам что-то непонятно? Приложение сделало ошибку? Или, может быть, есть идеи, как улучшить Magic Notebook? Пишите – что-нибудь придумаем.',
  },
  form: {
    errorSummary: 'Проверьте выделенные поля.',
    note: 'Сообщение попадет прямо в очередь обратной связи проекта. Аккаунт GitHub не нужен.',
    serverError: 'Сообщение не отправилось. Попробуйте еще раз через несколько минут.',
    success: 'Спасибо. Сообщение отправлено.',
  },
  fields: {
    category: {
      label: 'Тип обращения',
      error: 'Выберите тип сообщения.',
      options: {
        bug: 'Сообщение об ошибке',
        feature: 'Предложение функции',
        question: 'Вопрос',
      },
    },
    name: {
      label: 'Имя',
      error: 'Введите имя.',
    },
    subject: {
      label: 'Тема',
      error: 'Введите тему.',
    },
    email: {
      label: 'Email',
      error: 'Введите корректный email.',
    },
    message: {
      label: 'Чем мы можем помочь?',
      error: 'Введите сообщение.',
    },
  },
  actions: {
    submit: 'Отправить',
  },
};
