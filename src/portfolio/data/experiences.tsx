import { Experience } from '../interfaces/interfaces';
import { technologies } from './technologies';

export const experiences: Experience[] = [ 
    {
        title: 'Inicio la carrera de Ingeníera de Sistemas',
        subtitle: 'Universidad Nacional de San Agustín',
        content: 'Empecé a tener cariño con la tecnología gracias a los videojuegos y es algo que me distingue bastante, y por esa razón decidí esta carrera y descubrí muchas otras cosas más las cuáles son muy geniales.',
        date: '2021 - Inicio',
        icon: technologies['java'].logo, 
    },
    {
        title: 'Primer puesto en la Feria de Proyectos 2022',
        subtitle: 'Particiamos con un software de python + desarrollo web',
        content: 'El título de nuestro proyecto es "Sistema de reconocimiento de movimiento de los dedos utilizando Webcam a través de las bibliotecas OpenCV, MediaPipe y PyAutoGUI en el Lengua de Programación Python para aplicación en juegos de tipo educativo (Eduboard), rehabilitación (Eduplay) y entretenimiento (Touplay)".',
        date: '27 de Diciembre 2022',
        link: 'https://drive.google.com/file/d/1HZEsRohG0N4Lq-wgulPvB2Iii_klNge1/view?usp=sharing',
        icon: technologies['angular'].logo,
    },
    {
        title: 'Premio al mejor video en el II Congreso Internacional de la Escuela profesional de Ingeniería de Sistemas, CIEPIS 2022',
        subtitle: 'Participación en CIEPIS con nuestro proyecto ChapiFarm',
        content: 'Obtuvimos el premio al mejor video con nuestro proyecto web Chapi-Farm, el cual es un sistema diseñado para que una farmacia pueda hacer ventas electrónicas y se digitalize.',
        date: '15 - 16 de Diciembre 2022',
        link: 'https://drive.google.com/file/d/1d4ljHJ17XmGqMvqRBJJjtrShCDENL5pI/view?usp=sharing',
        icon: technologies['python'].logo,
    },
    {
        title: 'Aprendizaje de nuevas tecnologías web',
        subtitle: 'Para el curso de Ingeniería y Procesos de Software',
        content: 'Aprendí nuevas tecnologías para el desarrollo web como Typescript, React, Redux, TailwindCSS, NodeJS, Express y MongoDB para realizar el proyecto final del curso (Tienda de camisetas).',
        date: 'Enero - Julio 2023',
        icon: technologies['react'].logo,
    },
    {
        title: 'Aprendizaje de React-Native',
        subtitle: '',
        content: 'Para poder aumentar mis capacidades como desarrollador Front-End decidí aprender React-Native para el desarrollo de aplicaciones móviles.',
        date: 'Agosto - Noviembre 2023',
        icon: technologies['reactNative'].logo,
    },
    {
        title: 'Participación en la Feria de Proyectos 2023',
        subtitle: 'Se usó el proyecto final de Construcción de Software',
        content: 'Participamos con la aplicación hecha en React Native llamada Scheduler-App la cual trata de organizar el tiempo y tareas de los niños y estudiantes fusionando un Google-Calendar con un Todo-App (todo fue hecho por nosotros).',
        date: '27 de Diciembre 2023',
        icon: technologies['reactNative'].logo,
    },
    // {
    //     title: '',
    //     subtitle: '',
    //     content: '',
    //     date: '',
    // },
];