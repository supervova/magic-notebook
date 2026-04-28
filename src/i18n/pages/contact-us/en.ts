import type { ContactUsDictionary } from './types';

export const en: ContactUsDictionary = {
  meta: {
    title: 'Contact Us - Magic Notebook',
    desc: 'Send feedback, questions, and bug reports to the Magic Notebook team.',
  },
  page: {
    title: 'Contact us',
    intro:
      'Is something unclear? Did the app run into an error? Or maybe you have ideas on how to improve Magic Notebook? Write to us – we’ll figure something out.',
  },
  form: {
    errorSummary: 'Please check the highlighted fields.',
    note: 'Your message goes directly to the project feedback queue. No GitHub account is needed.',
    serverError: 'The message was not sent. Please try again in a few minutes.',
    success: 'Thank you. Your message has been sent.',
  },
  fields: {
    category: {
      label: 'What is this about?',
      error: 'Please choose a message type.',
      options: {
        bug: 'Bug report',
        feature: 'Feature request',
        question: 'Question',
      },
    },
    name: {
      label: 'Name',
      error: 'Please enter your name.',
    },
    subject: {
      label: 'Subject',
      error: 'Please enter a subject.',
    },
    email: {
      label: 'Email address',
      error: 'Please enter a valid email address.',
    },
    message: {
      label: 'How can we help?',
      error: 'Please enter your message.',
    },
  },
  actions: {
    submit: 'Send',
  },
};
