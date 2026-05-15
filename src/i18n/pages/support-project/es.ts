export const es = {
  meta: {
    title: 'Apoya el proyecto – Magic Notebook',
    desc: 'Apoya Magic Notebook con una donación, una compra o patrocinio y ayuda a acelerar el desarrollo.',
  },

  title: 'Haz algo bonito',
  titleSuffix: '♥️ Apoya el proyecto',

  intro:
    'Magic Notebook lo desarrolla una sola persona. Mi objetivo es crear la aplicación de escritura más cómoda posible. Por ahora trabajo en ella por las noches, después del trabajo principal. Si te gusta el proyecto, incluso un pequeño apoyo ayuda a dedicar más tiempo al desarrollo. En los próximos meses quiero añadir una asistente IA, herramientas de organización del conocimiento (etiquetas, enlaces internos) y tablas inteligentes.',

  options: {
    title: '¿Cómo puedes ayudar?',

    donation: {
      title: 'Donación',
      cta: 'Ir a Ko-fi →',
      desc: 'Si ya usas la aplicación y quieres apoyar su desarrollo — y además obtener una tarjeta o avatar en la web.',
    },

    purchase: {
      title: 'Compra',
      cta: 'Comprar en Gumroad →',
      desc: 'El editor es gratuito, pero también puedes comprarlo en Gumroad. Recibirás: ✔️ la aplicación y acceso anticipado a nuevas versiones, ✔️ descargas directas de builds, ✔️ actualizaciones más rápidas, ✔️ una tarjeta o avatar en la web, ✔️ +100 puntos de karma.',
    },

    sponsorship: {
      title: 'Patrocinio',
      cta: 'Apoyar en Patreon',
      desc: 'El editor seguirá siendo gratuito, pero puedes convertirte en patrocinador en Patreon. Recibirás: ✔️ la aplicación y acceso anticipado a nuevas versiones, ✔️ descargas directas de builds, ✔️ actualizaciones más rápidas, ✔️ una tarjeta o avatar en la web, ✔️ +100 puntos de karma.',
    },
  },

  supporters: {
    title: 'Aquí podría aparecer tu avatar con enlace a tus redes',

    cardThreshold:
      'Desde una donación o compra de $100 — tarjeta de perfil durante un mes. Desde $10 — avatar con información al pasar el cursor.',

    profileAriaLabel: 'Abrir perfil de {name} en {platform}',
  },

  thanks: {
    title: 'Gracias 💖',

    desc: 'Si decides apoyar el proyecto — muchísimas gracias. Y si no, también está bien. Esa es precisamente la filosofía de Magic Notebook. Además, puedes ayudar incluso sin dinero…',

    shareTitle: 'Compartir enlace:',
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
    email: 'Correo',
    tiktok: 'TikTok',
  },
} as const;
