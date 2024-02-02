import { ProjectCard } from '../components/ProjectCard';
import { Project } from '../interfaces/interfaces';
import './ProjectsSection.css';

const projects: Project[] = [
    {
        title: 'Scheduler-App',
        img: './project1.jpeg',
        about: 'Aplicacion movil para manejar el tiempo y controlar nuestras actividades mediante un calendario y poder realizar tareas y marcarlas',
        tools: ['redux', 'react', 'reactNative', 'typescript', 'reactHookForm', 'CSS'],
        links: ['https://github.com/dpacoria21/scheduler-app', ''],
    },
    {
        title: 'Chapifarm',
        img: './project5.jpeg',
        about: 'Ecommerce para la farmacia Virgen de Chapi donde se maneja crud de productos, autenticación de usuarios y registro',
        tools: ['angular', 'typescript', 'bootstrap', 'CSS'],
        links: ['https://github.com/gopoma/chapipharm-frontend', 'https://chapipharm-frontend.vercel.app']
    },
    {
        title: 'Pichanga-Shirt-Store',
        img: './project6.jpeg',
        about: 'Ecommerce para una tienda de camisetas de fútbol, CRUD de productos, manejo de ventas de camisetas',
        tools: ['react', 'javascript', 'redux', 'CSS', 'bootstrap'],
        links: ['https://github.com/gopoma/pichanga-shirts-store-frontend', 'https://pichanga-shirts-store-frontend.vercel.app'],
    },
    {
        title: 'Todo-App',
        img: './project2.jpeg',
        about: 'Aplicacion web para el manejo de tareas usando Context-Api para el manejo del estado',
        tools: ['react', 'javascript', 'tailwindCSS'],
        links: ['https://github.com/dpacoria21/todo-app', 'https://unrivaled-zabaione-970cde.netlify.app']
    },
    {
        title: 'Calculadora',
        img: './project3.jpeg',
        about: 'Calculadora realizada con javascript, css y html con modo Dark y Light',
        tools: ['HTML', 'CSS', 'javascript'],
        links: ['https://github.com/dpacoria21/calculatorApp', 'https://ephemeral-yeot-c28bd0.netlify.app']
    },
    {
        title: 'Tic-Tac-Toe',
        img: './project4.jpeg',
        about: 'Juego de Tic-Tac-Toe con la capacidad para reanudar tus partidas o empezar desde 0',
        tools: ['HTML', 'CSS', 'javascript'],
        links: ['https://github.com/dpacoria21/ticTacToe', 'https://tic-tac-czcyh6oe0-dpacoria21.vercel.app']
    }
];

export const ProjectsSection = () => {
    return (
        <section className='cards'>
            <h1 className='cards__title'>My Projects 📂</h1>
            <section className='cards__container'>
                {
                    projects.map((project, i) => (
                        <ProjectCard
                            key={project.title+i}
                            title={project.title}
                            img={project.img}
                            about={project.about}
                            links={project.links}
                            tools={project.tools}
                        />
                    ))
                }
                {/* <ProjectCard

                /> */}
                {/* <ProjectCard /> */}
            </section>
        </section>
    );
};
