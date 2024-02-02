import { CSSProperties, useEffect, useState } from 'react';
import {Variants, motion} from 'framer-motion';

import { technologies } from '../data/technologies';
import { Tech } from '../interfaces/interfaces';


import './SkillsSection.css';

interface CustomStyle extends CSSProperties {
    '--skill-hover-color': string,
}

const listVariants: Variants = {
    off: {
        opacity: 0,
        x: -50,
        // scale: 0,
        transition: {duration: 0.8, when: 'afterChildren'}
    },
    on: {
        opacity: 1,
        x: 0,
        // scale: 1,
        transition: {duration: 0.8, when: 'beforeChildren'},
    }
};

const itemVariants: Variants = {
    on: i => ({
        transition: {
            delay: i * 0.1,
            duration: 0.5
        },
        opacity: 1,
        // scale: 1
    }),
    off: i => ({
        transition: {
            delay: i * 0.1,
            duration: 0.5
        },
        opacity: 0,
        // scale: 0
    })
};

export const SkillsSection = () => {

    const [skills, setSkills] = useState<Tech[]>([]);

    useEffect(() => {
        setSkills(Object.values(technologies));
    }, []);
    
    return (
        <motion.section 
            variants={listVariants}
            whileInView={'on'} 
            // initial={{opacity: 0, scale: 0, x: 400}}
            initial={'off'}
            // animate={'on'}
            // transition={{duration: 0.8, ease: 'circInOut'}}
            viewport={{once: true}}
            className='skills'
        >
            <h1 className='skills__title'>My Skills 🧑‍💻</h1>
            <section className='skills__container'>
                {skills.map((skill, i) => (
                    <motion.div
                        variants={itemVariants}
                        custom={i} 
                        style={{
                            '--skill-hover-color': skill.color
                        } as CustomStyle}
                        className='skill' 
                        key={skill.name+i}
                    >
                        {skill.logo}
                        <p className='skill__title'>{skill.name}</p>
                    </motion.div>
                ))}
            </section>
        </motion.section>
    );
};
