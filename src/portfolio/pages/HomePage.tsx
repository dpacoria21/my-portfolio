import { PresentationSection } from '../sections/PresentationSection';
import { ProjectsSection } from '../sections/ProjectsSection';

export const HomePage = () => {
    return (
        <main>
            <PresentationSection />
            <ProjectsSection />
        </main>
    );
};
