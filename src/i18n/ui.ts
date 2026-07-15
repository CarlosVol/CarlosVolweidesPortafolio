export const LOCALES = ['es', 'en'] as const;
export type Lang = (typeof LOCALES)[number];

export const DEFAULT_LANG: Lang = 'es';

/** Locale tags for `og:locale`, `hreflang` and `Intl` formatting. */
export const LOCALE_TAG: Record<Lang, string> = {
  es: 'es-VE',
  en: 'en-US',
};

/**
 * Section ids are locale-neutral — they anchor the scroll-spy and the `#hash`
 * links. Only the label changes per language.
 */
export const SECTIONS = [
  { id: 'home', num: '00', key: 'home' },
  { id: 'about', num: '01', key: 'about' },
  { id: 'stack', num: '02', key: 'stack' },
  { id: 'work', num: '03', key: 'experience' },
  { id: 'projects', num: '04', key: 'projects' },
  { id: 'contact', num: '05', key: 'contact' },
] as const;

export type SectionKey = (typeof SECTIONS)[number]['key'];

const es = {
  seo: {
    homeTitle: 'Carlos Volweides — Ingeniero Fullstack',
    homeDescription:
      'Ingeniero fullstack especializado en TypeScript, React, Next.js, Python (FastAPI), arquitectura limpia, DDD e integración de LLM/RAG. Basado en Caracas, Venezuela.',
    projectsTitle: 'Proyectos — Carlos Volweides',
    projectsDescription:
      'Proyectos seleccionados de Carlos Volweides: Atlas Protocol, Repositorio UGMA, Luxdata.',
    jobTitle: 'Ingeniero Fullstack',
  },

  nav: {
    home: 'inicio',
    about: 'sobre mí',
    stack: 'stack',
    experience: 'experiencia',
    projects: 'proyectos',
    contact: 'contacto',
  },

  header: {
    available: '/ disponible para trabajar',
    cmdk: 'Abrir paleta de comandos',
    switchTo: 'Ver en inglés',
  },

  hero: {
    location: 'Ubicación',
    locationValue: 'Caracas, VE',
    role: 'Rol',
    roleValue: 'Ingeniero Fullstack',
    status: 'Estado',
    statusValue: '● Disponible para trabajar',
    localTime: 'Hora local',
    taglineRole: 'Ingeniero Fullstack',
    taglineLead: 'construyo aplicaciones web & mobile end-to-end con énfasis en',
    taglineArch: 'arquitectura limpia',
    taglineDdd: 'DDD',
    taglineLlm: 'LLMs / RAG',
    taglineJoin: 'e integración de',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Hablemos',
    scroll: 'scroll',
    prompt: './construyamos-algo',
  },

  about: {
    label: 'sobre mí',
    headingLine1: 'Construyo software',
    headingLine2: 'de principio a fin.',
    based: 'Ubicación',
    basedValue: 'Caracas, VE',
    edu: 'Estudios',
    eduValue: 'UGMA · Ing. Informática',
    years: 'Años',
    yearsValue: '3+ produciendo',
    mode: 'Modo',
    modeValue: 'Remoto · Async',
    p1Lead: 'desarrollador fullstack',
    p1: 'con experiencia construyendo aplicaciones web y mobile end-to-end. Trabajo principalmente con',
    p1Tail: 'y',
    p1Python: '(FastAPI, Flask, Django).',
    p1Prefix: 'Soy',
    p2Lead: 'APIs escalables',
    p2Prefix: 'Mi enfoque está en el diseño e implementación de',
    p2: 'aplicando arquitectura limpia, Domain-Driven Design y comunicación basada en eventos. He participado en sistemas de logística, facturación y plataformas multi-aplicación que conectan web y mobile.',
    p3Prefix:
      'Trabajo bien en equipo bajo Scrum, pero también entrego proyectos completos de forma autónoma — desde requerimientos hasta despliegue. Me interesan los sistemas escalables y la integración de',
    p3Lead: 'LLMs y RAG',
    p3: 'en productos reales.',
  },

  stack: {
    label: 'stack',
    languages: 'Lenguajes',
    frontend: 'Frontend',
    backend: 'Backend',
    data: 'Datos',
    architecture: 'Arquitectura',
    ai: 'IA / LLM',
    practices: 'Prácticas',
    tooling: 'Herramientas',
  },

  experience: {
    label: 'experiencia',
    role: 'Desarrollador Fullstack',
    date: '2025 — Actualidad',
    summary:
      'Construcción de aplicaciones web y mobile end-to-end en plataformas de logística, sistemas de facturación e integraciones multi-app.',
    bullets: [
      'Diseño e implementación de APIs escalables aplicando arquitectura limpia, DDD y comunicación basada en eventos.',
      'Maquetación a partir de Figma e integración full-stack desde requerimientos funcionales hasta despliegue.',
      'Entrega autónoma de un proyecto completo en comunicación directa con cliente, en entornos develop / staging / production.',
    ],
  },

  projects: {
    label: 'trabajo seleccionado',
    allLabel: 'todos los proyectos',
    caseStudy: 'Ver caso de estudio',
    caseStudyAria: 'Ver caso de estudio: {title}',
    back: '← proyectos',
    role: 'Rol',
    demo: 'Ver demo',
    repo: 'Ver repo',
    requestCase: 'Solicitar caso de estudio completo',
  },

  contact: {
    label: 'contacto',
    headingLine1: 'Construyamos',
    headingLine2: 'algo real',
    location: 'Ubicación',
    locationValue: 'Caracas · Venezuela',
    status: 'Estado',
    statusValue: '● Disponible para trabajar',
  },

  footer: {
    handcrafted: 'hecho a mano en Caracas',
  },

  cmdk: {
    goto: 'Ir a {label}',
    email: 'Enviar email',
    github: 'Abrir GitHub',
    linkedin: 'Abrir LinkedIn',
    allProjects: 'Todos los proyectos',
    placeholder: '$ buscar nav · proyectos · contacto...',
    noResults: 'sin resultados',
    navigate: 'navegar',
    select: 'seleccionar',
    close: 'cerrar',
  },

  form: {
    name: 'Nombre',
    email: 'Email',
    reason: 'Motivo',
    company: 'Empresa',
    message: 'Mensaje',
    selectOption: 'Selecciona una opción',
    tipoTrabajo: 'Oferta de trabajo',
    tipoFreelance: 'Proyecto freelance',
    tipoNetworking: 'Networking / Otro',
    submit: 'Enviar mensaje',
    submitting: 'Enviando...',
    privacy: {
      intro: 'Tu email solo se usa para responderte.',
      showLabel: 'Ver política de privacidad',
      hideLabel: 'Ocultar',
      title: 'Política de privacidad',
      body1:
        'Al enviar este formulario, compartes tu nombre y email conmigo (Carlos Volweides) con el único propósito de responder tu mensaje.',
      body2:
        'No vendo, comparto ni uso tus datos para ningún otro fin. Los mensajes son procesados por Resend (resend.com) para el envío del email y se eliminan automáticamente en 30 días.',
      contact: 'Para cualquier duda:',
    },
    tipos: {
      trabajo: {
        companyLabel: 'Empresa que contrata',
        companyPlaceholder: 'Ej: Google, startup, agencia...',
        messageHint:
          'Ej: empresa, stack tecnológico, modalidad (remoto/híbrido) y rango salarial si puedes compartirlo.',
      },
      freelance: {
        companyLabel: 'Tu empresa o proyecto',
        companyPlaceholder: 'Ej: Mi startup, Proyecto X...',
        messageHint:
          'Ej: descripción del proyecto, stack preferido, timeline aproximado y presupuesto.',
      },
      networking: {
        companyLabel: 'Empresa u organización',
        companyPlaceholder: 'Opcional',
        messageHint: 'Cuéntame sobre ti o en qué te gustaría conectar.',
      },
    },
    validation: {
      nameRequired: 'Ingresa tu nombre.',
      emailRequired: 'Ingresa tu email.',
      emailInvalid: 'Ingresa un email válido.',
      tipoRequired: 'Selecciona una opción.',
      messageRequired: 'Escribe tu mensaje.',
      messageTooLong: 'El mensaje no puede superar {max} caracteres.',
    },
    status: {
      errorTitle: 'No se pudo enviar',
      successTitle: 'Mensaje enviado',
      successSubtitle: 'Te respondo en menos de 24 horas.',
      networkError: 'Ocurrió un error de red. Intenta de nuevo.',
    },
    /** Keyed by the `code` returned from /api/contact. */
    errors: {
      NAME_REQUIRED: 'El nombre es obligatorio.',
      EMAIL_REQUIRED: 'El email es obligatorio.',
      EMAIL_INVALID: 'El email no tiene un formato válido.',
      TIPO_INVALID: 'Selecciona un motivo de contacto válido.',
      MESSAGE_REQUIRED: 'El mensaje es obligatorio.',
      MESSAGE_TOO_LONG: 'El mensaje no puede superar {max} caracteres.',
      BAD_JSON: 'La petición no tiene un formato válido.',
      SERVER_ERROR: 'Error interno del servidor.',
      SEND_FAILED: 'No se pudo enviar el mensaje. Intenta de nuevo.',
      UNKNOWN: 'Ocurrió un error. Intenta de nuevo.',
    },
  },
};

/** `es` is the source of truth for the shape; a missing or extra key in `en` fails typecheck. */
export type Dict = typeof es;

const en: Dict = {
  seo: {
    homeTitle: 'Carlos Volweides — Fullstack Engineer',
    homeDescription:
      'Fullstack Engineer specializing in TypeScript, React, Next.js, Python (FastAPI), clean architecture, DDD, and LLM/RAG integration. Based in Caracas, Venezuela.',
    projectsTitle: 'Projects — Carlos Volweides',
    projectsDescription:
      'Selected projects by Carlos Volweides: Atlas Protocol, Repositorio UGMA, Luxdata.',
    jobTitle: 'Fullstack Engineer',
  },

  nav: {
    home: 'index',
    about: 'about',
    stack: 'stack',
    experience: 'experience',
    projects: 'projects',
    contact: 'contact',
  },

  header: {
    available: '/ available for work',
    cmdk: 'Open command palette',
    switchTo: 'View in Spanish',
  },

  hero: {
    location: 'Location',
    locationValue: 'Caracas, VE',
    role: 'Role',
    roleValue: 'Fullstack Engineer',
    status: 'Status',
    statusValue: '● Open to work',
    localTime: 'Local time',
    taglineRole: 'Fullstack Engineer',
    taglineLead: 'I build end-to-end web & mobile applications with a focus on',
    taglineArch: 'clean architecture',
    taglineDdd: 'DDD',
    taglineLlm: 'LLMs / RAG',
    taglineJoin: 'and the integration of',
    ctaProjects: 'View projects',
    ctaContact: 'Get in touch',
    scroll: 'scroll',
    prompt: './let-s-build-something',
  },

  about: {
    label: 'about',
    headingLine1: 'I build software',
    headingLine2: 'from end to end.',
    based: 'Based',
    basedValue: 'Caracas, VE',
    edu: 'Edu',
    eduValue: 'UGMA · Computer Engineering',
    years: 'Years',
    yearsValue: '3+ shipping',
    mode: 'Mode',
    modeValue: 'Remote · Async',
    p1Prefix: "I'm a",
    p1Lead: 'fullstack developer',
    p1: 'with experience building end-to-end web and mobile applications. I work mainly with',
    p1Tail: 'and',
    p1Python: '(FastAPI, Flask, Django).',
    p2Prefix: 'My focus is designing and implementing',
    p2Lead: 'scalable APIs',
    p2: 'using clean architecture, Domain-Driven Design and event-driven communication. I have worked on logistics systems, billing platforms and multi-app products that connect web and mobile.',
    p3Prefix:
      'I work well in a Scrum team, but I also deliver entire projects autonomously — from requirements to deployment. I care about scalable systems and the integration of',
    p3Lead: 'LLMs and RAG',
    p3: 'into real products.',
  },

  stack: {
    label: 'stack',
    languages: 'Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    data: 'Data',
    architecture: 'Architecture',
    ai: 'AI / LLM',
    practices: 'Practices',
    tooling: 'Tooling',
  },

  experience: {
    label: 'experience',
    role: 'Fullstack Developer',
    date: '2025 — Now',
    summary:
      'Building end-to-end web and mobile applications across logistics platforms, billing systems and multi-app integrations.',
    bullets: [
      'Designed and implemented scalable APIs using clean architecture, DDD and event-driven communication.',
      'Built UIs from Figma and handled full-stack integration, from functional requirements through deployment.',
      'Delivered a complete project autonomously in direct communication with the client, across develop / staging / production environments.',
    ],
  },

  projects: {
    label: 'selected work',
    allLabel: 'all projects',
    caseStudy: 'View case study',
    caseStudyAria: 'View case study: {title}',
    back: '← projects',
    role: 'Role',
    demo: 'Live demo',
    repo: 'View repo',
    requestCase: 'Request full case study',
  },

  contact: {
    label: 'contact',
    headingLine1: "Let's build",
    headingLine2: 'something real',
    location: 'Location',
    locationValue: 'Caracas · Venezuela',
    status: 'Status',
    statusValue: '● Open to work',
  },

  footer: {
    handcrafted: 'handcrafted in Caracas',
  },

  cmdk: {
    goto: 'Go to {label}',
    email: 'Send email',
    github: 'Open GitHub',
    linkedin: 'Open LinkedIn',
    allProjects: 'All projects',
    placeholder: '$ search nav · projects · contact...',
    noResults: 'no results',
    navigate: 'navigate',
    select: 'select',
    close: 'close',
  },

  form: {
    name: 'Name',
    email: 'Email',
    reason: 'Reason',
    company: 'Company',
    message: 'Message',
    selectOption: 'Select an option',
    tipoTrabajo: 'Job offer',
    tipoFreelance: 'Freelance project',
    tipoNetworking: 'Networking / Other',
    submit: 'Send message',
    submitting: 'Sending...',
    privacy: {
      intro: 'Your email is only used to reply to you.',
      showLabel: 'View privacy policy',
      hideLabel: 'Hide',
      title: 'Privacy policy',
      body1:
        'By submitting this form, you share your name and email with me (Carlos Volweides) for the sole purpose of replying to your message.',
      body2:
        'I do not sell, share or use your data for any other purpose. Messages are processed by Resend (resend.com) to deliver the email and are deleted automatically after 30 days.',
      contact: 'Any questions:',
    },
    tipos: {
      trabajo: {
        companyLabel: 'Hiring company',
        companyPlaceholder: 'e.g. Google, startup, agency...',
        messageHint:
          'e.g. company, tech stack, work mode (remote/hybrid) and salary range if you can share it.',
      },
      freelance: {
        companyLabel: 'Your company or project',
        companyPlaceholder: 'e.g. My startup, Project X...',
        messageHint:
          'e.g. project description, preferred stack, rough timeline and budget.',
      },
      networking: {
        companyLabel: 'Company or organization',
        companyPlaceholder: 'Optional',
        messageHint: 'Tell me about yourself or what you would like to connect on.',
      },
    },
    validation: {
      nameRequired: 'Enter your name.',
      emailRequired: 'Enter your email.',
      emailInvalid: 'Enter a valid email.',
      tipoRequired: 'Select an option.',
      messageRequired: 'Write your message.',
      messageTooLong: 'The message cannot exceed {max} characters.',
    },
    status: {
      errorTitle: "Couldn't send",
      successTitle: 'Message sent',
      successSubtitle: 'I reply within 24 hours.',
      networkError: 'A network error occurred. Please try again.',
    },
    errors: {
      NAME_REQUIRED: 'Name is required.',
      EMAIL_REQUIRED: 'Email is required.',
      EMAIL_INVALID: 'Email format is not valid.',
      TIPO_INVALID: 'Select a valid contact reason.',
      MESSAGE_REQUIRED: 'Message is required.',
      MESSAGE_TOO_LONG: 'The message cannot exceed {max} characters.',
      BAD_JSON: 'The request format is not valid.',
      SERVER_ERROR: 'Internal server error.',
      SEND_FAILED: "Couldn't send the message. Please try again.",
      UNKNOWN: 'Something went wrong. Please try again.',
    },
  },
};

export const ui: Record<Lang, Dict> = { es, en };
