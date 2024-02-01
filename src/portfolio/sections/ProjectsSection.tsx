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
