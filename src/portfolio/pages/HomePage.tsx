import { PresentationSection } from '../sections/PresentationSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';

export const HomePage = () => {
    return (
        <main>
            <PresentationSection />
            <ProjectsSection />
            <SkillsSection />
        </main>
    );
};
