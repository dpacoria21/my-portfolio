import { useEffect, useState } from 'react';
import {Variants, motion} from 'framer-motion';

import { technologies } from '../data/technologies';
import { CustomStyle, Tech } from '../interfaces/interfaces';


import './SkillsSection.css';

const listVariants: Variants = {
    off: {
        opacity: 0,
        x: -50,
        transition: {duration: 0.5, when: 'afterChildren'}
    },
    on: {
        opacity: 1,
        x: 0,
        transition: {duration: 0.5, when: 'beforeChildren'},
    }
};

const itemVariants: Variants = {
    on: i => ({
        transition: {
            delay: i * 0.1,
            duration: 0.5
        },
        opacity: 1,
    }),
    off: i => ({
        transition: {
            delay: i * 0.1,
            duration: 0.5
        },
        opacity: 0,
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
            initial={'off'}
            viewport={{once: true}}
            className='skills'
        >
            <h1 className='skills__title'>Mis Habilidades 🧑‍💻</h1>
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
