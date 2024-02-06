import { useEffect } from 'react';
import { PresentationSection } from '../sections/PresentationSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';

export const HomePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <section>
            <PresentationSection />
            <ProjectsSection />
            <SkillsSection />
        </section>
    );
};

export default HomePage;
