import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';
import './ProjectsSection.css';

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
            </section>
        </section>
    );
};
