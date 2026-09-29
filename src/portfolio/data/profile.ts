export interface ProfessionalProfile {
  name: string;
  shortName: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  cvUrl: string;
  portfolioPdfUrl: string;
  languages: string[];
  updatedAt: string;
}

export interface CareerExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface SelectedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  evidenceUrl?: string;
  image?: string;
  featured: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year?: string;
  evidenceUrl?: string;
}

// Source notes and verification limits are recorded in PROFILE_SOURCES.md.
export const profile: ProfessionalProfile = {
    name: 'Diego Ivan Pacori Anccasi',
    shortName: 'Diego Pacori',
    role: 'Full-Stack Developer',
    headline: 'Interfaces que conectan. Sistemas que resuelven.',
    summary:
    'Desarrollo aplicaciones web y móviles, desde la interfaz hasta las APIs y los datos. Estudio el último año de Ingeniería de Sistemas en la UNSA y trabajo en el backend de Senses Psicólogos.',
    location: 'Arequipa, Perú',
    email: 'dpacoria@unsa.edu.pe',
    github: 'https://github.com/dpacoria21',
    linkedin: 'https://www.linkedin.com/in/diego-ivan-pacori-anccasi-9860172b3/',
    whatsapp: 'https://wa.me/51953286336',
    cvUrl: '/cv_dpacoria.pdf',
    portfolioPdfUrl: '/Portafolio_Diego_Pacori.pdf',
    languages: ['Español nativo', 'Inglés intermedio'],
    updatedAt: '2026-09-29',
};

export const career: { experiences: CareerExperience[]; education: Education[] } = {
    experiences: [
        {
            id: 'senses',
            role: 'Desarrollador Back-End',
            company: 'Senses Psicólogos',
            period: 'Mayo 2026 — actualidad',
            description:
        'Desarrollo del backend de un sistema de gestión para un centro psicológico, en coordinación con frontend y QA bajo Scrum.',
            highlights: [
                'Rutas, consultas, validaciones y reglas de negocio para pacientes, citas y protocolos clínicos.',
                'Documentación y pruebas de endpoints con Swagger/OpenAPI y Postman.',
                'Recordatorios programados por SMS y WhatsApp mediante node-cron.',
            ],
            technologies: ['Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'Swagger/OpenAPI'],
        },
        {
            id: 'chapi-operations',
            role: 'Asistente administrativo y de control de inventario',
            company: 'Botica Virgen de Chapi',
            period: 'Agosto 2023 — febrero 2024',
            description:
        'Apoyo a la operación diaria de la farmacia, al control de productos y al registro de información comercial.',
            highlights: [
                'Elaboración de reportes diarios de ventas y verificación de la información.',
                'Control del ingreso de productos y actualización del inventario.',
                'Apoyo en propuestas comerciales y estrategias de venta.',
            ],
            technologies: [],
        },
        {
            id: 'chapi-frontend',
            role: 'Desarrollador Front-End',
            company: 'Botica Virgen de Chapi',
            period: 'Abril — diciembre 2022',
            description:
        'Desarrollo de interfaces para la tienda virtual ChapiFarm y su panel de administración.',
            highlights: [
                'Interfaces web con Angular, Bootstrap y Angular Material.',
                'Panel para gestionar medicamentos, cantidades y fechas de vencimiento.',
                'Integración de las interfaces con la API del backend.',
            ],
            technologies: ['Angular', 'TypeScript', 'Bootstrap', 'Angular Material'],
        },
    ],
    education: [
        {
            id: 'unsa',
            degree: 'Ingeniería de Sistemas',
            institution: 'Universidad Nacional de San Agustín de Arequipa',
            period: '2021 — actualidad',
            description:
        'Estudiante del último año. Formación en desarrollo de software, bases de datos, arquitectura de sistemas y gestión de tecnologías de la información.',
        },
    ],
};

export const selectedProjects: SelectedProject[] = [
    {
        id: 'senses',
        title: 'Senses Psicólogos',
        category: 'Backend',
        description:
      'Servicios para conectar la gestión de pacientes, citas y protocolos clínicos de un centro psicológico.',
        highlights: [
            'Implementación de rutas, validaciones y reglas de negocio con persistencia en PostgreSQL.',
            'Documentación de la API y recordatorios programados por SMS y WhatsApp.',
            'Trabajo con frontend y QA bajo Scrum. Repositorio privado.',
        ],
        technologies: ['Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'node-cron'],
        evidenceUrl: '/Portafolio_Diego_Pacori.pdf#page=2',
        featured: true,
    },
    {
        id: 'scheduler',
        title: 'Scheduler-App',
        category: 'Móvil',
        description:
      'Un calendario y un gestor de tareas en una aplicación móvil para organizar la vida estudiantil.',
        highlights: [
            'Vistas de calendario, eventos y tareas asociadas a cada actividad.',
            'Registro, inicio de sesión, invitaciones y notificaciones.',
            'Desarrollada en equipo y presentada en la Feria de Proyectos UNSA 2023.',
        ],
        technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'React Hook Form'],
        githubUrl: 'https://github.com/dpacoria21/scheduler-app',
        image: '/project1.webp',
        featured: true,
    },
    {
        id: 'chapifarm',
        title: 'ChapiFarm',
        category: 'Web',
        description:
      'Tienda virtual y panel de administración para Botica Virgen de Chapi, con el inventario conectado a su API.',
        highlights: [
            'Desarrollo frontend de interfaces para consultar productos y gestionar medicamentos.',
            'Administración de cantidades y fechas de vencimiento.',
            'Premio al mejor video en CIEPIS 2022.',
        ],
        technologies: ['Angular', 'TypeScript', 'Bootstrap', 'Angular Material'],
        githubUrl: 'https://github.com/gopoma/chapipharm-frontend',
        evidenceUrl: 'https://drive.google.com/file/d/1d4ljHJ17XmGqMvqRBJJjtrShCDENL5pI/view',
        image: '/project5.webp',
        featured: true,
    },
    {
        id: 'finger-tracking',
        title: 'Movimiento convertido en interacción',
        category: 'Visión artificial',
        description:
      'Reconocimiento del movimiento de los dedos mediante una webcam para controlar aplicaciones interactivas.',
        highlights: [
            'Integrante del equipo que desarrolló y presentó el sistema.',
            'Aplicado a Eduboard, Eduplay y Touplay para educación, rehabilitación y entretenimiento.',
            'Primer puesto en la Feria de Proyectos UNSA 2022.',
        ],
        technologies: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
        evidenceUrl: 'https://drive.google.com/file/d/1HZEsRohG0N4Lq-wgulPvB2Iii_klNge1/view',
        featured: true,
    },
];

export const skillGroups: SkillGroup[] = [
    {
        id: 'frontend',
        title: 'Frontend',
        description: 'Interfaces web, estado y movimiento.',
        skills: ['React', 'Angular', 'Astro', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Redux', 'Tailwind CSS', 'Framer Motion', 'React Hook Form', 'Bootstrap', 'Material UI', 'Angular Material'],
    },
    {
        id: 'backend',
        title: 'Backend',
        description: 'APIs, validaciones y lógica de negocio.',
        skills: ['Node.js', 'Express.js', 'NestJS', 'APIs REST', 'Swagger/OpenAPI', 'Postman', 'node-cron'],
    },
    {
        id: 'data',
        title: 'Datos',
        description: 'Modelado, consultas y persistencia.',
        skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Prisma ORM'],
    },
    {
        id: 'mobile',
        title: 'Móvil',
        description: 'Aplicaciones y navegación para dispositivos móviles.',
        skills: ['React Native', 'React Navigation', 'AsyncStorage', 'Axios'],
    },
    {
        id: 'tools',
        title: 'Herramientas y pruebas',
        description: 'Trabajo en equipo, desarrollo y despliegue.',
        skills: ['Git', 'GitHub', 'Docker', 'Vite', 'Jest', 'Scrum'],
    },
    {
        id: 'algorithms',
        title: 'Algoritmos e interacción',
        description: 'Resolución de problemas y visión por computador.',
        skills: ['C++', 'Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    },
];

export const achievements: Achievement[] = [
    {
        id: 'codeforces',
        title: 'Codeforces Specialist',
        description: 'Rating máximo de 1457. Práctica de algoritmos, soluciones y entrenamiento en C++ como Fernando_Benito.',
        evidenceUrl: 'https://codeforces.com/profile/Fernando_Benito',
    },
    {
        id: 'icpc',
        title: 'ICPC 2025 · Characatux',
        description: 'Puesto 23 de 200 equipos, compitiendo para resolver problemas de programación.',
        year: '2025',
        evidenceUrl: '/Portafolio_Diego_Pacori.pdf#page=6',
    },
    {
        id: 'unsa-fair',
        title: 'Primer puesto · Feria de Proyectos UNSA',
        description: 'Sistema de reconocimiento del movimiento de los dedos aplicado a educación, rehabilitación y entretenimiento.',
        year: '2022',
        evidenceUrl: 'https://drive.google.com/file/d/1HZEsRohG0N4Lq-wgulPvB2Iii_klNge1/view',
    },
    {
        id: 'ciepis',
        title: 'Mejor video · CIEPIS',
        description: 'Reconocimiento al proyecto ChapiFarm en el II Congreso Internacional de la Escuela Profesional de Ingeniería de Sistemas.',
        year: '2022',
        evidenceUrl: 'https://drive.google.com/file/d/1d4ljHJ17XmGqMvqRBJJjtrShCDENL5pI/view',
    },
    {
        id: 'perumec',
        title: 'Ganador de concurso · PERUMEC',
        description: 'Reconocimiento en programación competitiva y resolución de problemas algorítmicos.',
        evidenceUrl: '/Portafolio_Diego_Pacori.pdf#page=6',
    },
];
