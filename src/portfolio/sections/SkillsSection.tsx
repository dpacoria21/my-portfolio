import { technologies } from '../data/technologies';
import './SkillsSection.css';
import { Tech } from '../interfaces/interfaces';
import { CSSProperties, useEffect, useState } from 'react';

interface CustomStyle extends CSSProperties {
    '--skill-hover-color': string,
}

export const SkillsSection = () => {

    const [skills, setSkills] = useState<Tech[]>([]);

    useEffect(() => {
        setSkills(Object.values(technologies));
    }, []);
    
    return (
        <section className='skills'>
            <h1 className='skills__title'>My Skills 🧑‍💻</h1>
            <section className='skills__container'>
                {skills.map((skill, i) => (
                    <div 
                        style={{
                            '--skill-hover-color': skill.color
                        } as CustomStyle}
                        className='skill' 
                        key={skill.name+i}
                    >
                        {skill.logo}
                        <p className='skill__title'>{skill.name}</p>
                    </div>
                ))}
            </section>
        </section>
    );
};
