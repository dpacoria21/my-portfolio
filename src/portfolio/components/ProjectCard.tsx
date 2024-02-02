import { technologies } from '../data/technologies';

import {motion} from 'framer-motion';
import './ProjectCard.css';

interface Props {
    title: string,
    img: string,
    about: string,
    tools: string[],
    links: string[], 
}

export const ProjectCard = ({title, about, tools, links, img}: Props) => {
    return (
        <motion.div layout className='card'>
            <div style={{
                backgroundImage: `url(${img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }} className='card__img'/>
            <div className='card__right'>
                <div className='card__info'>
                    <h2 className='card__title'>{title}</h2>
                    <p className='card__text'>{about}</p>
                </div>
                <h2 className='card__title'>Technologies</h2>
                <section className='card__logos'>
                    {tools.map((tool, i) => (
                        <div key={tool+i} className='card__logo'>
                            {technologies[tool].logo}
                            <span className='logo__info'>{technologies[tool+''].name}</span>
                        </div>
                    ))}
                </section>
            </div>
            <motion.div  className='card__reverse'>
                <h1>Go to:</h1>
                <section className='networks'>
                    <a className='to__link' target='_blank' href={links[0]} rel="noreferrer" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.8em" height="2.8em" viewBox="0 0 256 256"><path fill="currentColor" d="M71.68 97.22L34.74 128l36.94 30.78a12 12 0 1 1-15.36 18.44l-48-40a12 12 0 0 1 0-18.44l48-40a12 12 0 0 1 15.36 18.44m176 21.56l-48-40a12 12 0 1 0-15.36 18.44L221.26 128l-36.94 30.78a12 12 0 1 0 15.36 18.44l48-40a12 12 0 0 0 0-18.44M164.1 28.72a12 12 0 0 0-15.38 7.18l-64 176a12 12 0 0 0 7.18 15.37a11.79 11.79 0 0 0 4.1.73a12 12 0 0 0 11.28-7.9l64-176a12 12 0 0 0-7.18-15.38"/></svg>
                    </a>
                    <a className='to__link' href={links[1] || links[0]} target='_blank' rel='noreferrer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.8em" height="2.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 20.25 22H9.75a.75.75 0 0 1 0-1.5h10.5a.25.25 0 0 0 .25-.25V9h-17v3A.75.75 0 0 1 2 12ZM9 7.5h11.5V3.75a.25.25 0 0 0-.25-.25H9Zm-5.5 0h4v-4H3.75a.25.25 0 0 0-.25.25Z"/><path fill="currentColor" d="m9.308 14.5l-2.104-2.236a.75.75 0 1 1 1.092-1.028l3.294 3.5a.75.75 0 0 1 0 1.028l-3.294 3.5a.75.75 0 1 1-1.092-1.028L9.308 16H6.09a2.59 2.59 0 0 0-2.59 2.59v2.66a.75.75 0 0 1-1.5 0v-2.66a4.09 4.09 0 0 1 4.09-4.09z"/></svg>
                    </a>
                </section>
            </motion.div>
        </motion.div>
    );
};
