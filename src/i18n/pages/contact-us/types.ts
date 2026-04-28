export interface ContactUsDictionary {
  actions: {
    submit: string;
  };
  fields: {
    category: {
      error: string;
      label: string;
      options: {
        bug: string;
        feature: string;
        question: string;
      };
    };
    email: {
      error: string;
      label: string;
    };
    message: {
      error: string;
      label: string;
    };
    name: {
      error: string;
      label: string;
    };
    subject: {
      error: string;
      label: string;
    };
  };
  form: {
    errorSummary: string;
    note: string;
    serverError: string;
    success: string;
  };
  meta: {
    desc: string;
    title: string;
  };
  page: {
    intro: string;
    title: string;
  };
}
