import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

import {Variants, motion} from 'framer-motion';
import './ProjectsSection.css';

const listVariants: Variants = {
    off: {
        opacity: 0,
        scale: 0,
        transition: {duration: 0.8, when: 'afterChildren'}
    },
    on: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.8, when: 'beforeChildren'},
    }
};

const itemVariants: Variants = {
    on: i => ({
        opacity: 1, scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.7
        }
    }),
    off: i => ({
        transition: {
            delay: i * 0.1,
            duration: 0.7
        },
        opacity: 0, scale: 0
    })
};

export const ProjectsSection = () => {
    return (
        <motion.section variants={listVariants} initial={'off'} animate={'on'} viewport={{once: true}} className='cards'>
            <h1 className='cards__title'>My Projects 📂</h1>
            <motion.section className='cards__container'>
                {
                    projects.map((project, i) => (
                        <motion.div variants={itemVariants} custom={i} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} key={project.title+i}>
                            <ProjectCard
                                title={project.title}
                                img={project.img}
                                about={project.about}
                                links={project.links}
                                tools={project.tools}
                            />
                        </motion.div>
                    ))
                }
            </motion.section>
        </motion.section>
    );
};
