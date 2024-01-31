import { ProjectCard } from '../components/ProjectCard';
import './ProjectsSection.css';

export const ProjectsSection = () => {
    return (
        <section className='cards'>
            <h1 className='cards__title'>My Projects 📂</h1>
            <section className='cards__container'>
                <ProjectCard />
                <ProjectCard />
            </section>
        </section>
    );
};
