import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SkillGroup } from '../data/profile';

export function SkillAccordion({ group, index }: { group: SkillGroup; index: number }) {
    const [open, setOpen] = useState(false);
    const reduced = useReducedMotion();
    const id = useId();
    const duration = reduced ? 0 : 0.4;

    return (
        <section className={`skill-group ${open ? 'is-open' : ''}`}>
            <h4>
                <button
                    id={`${id}-heading`}
                    className='skill-trigger'
                    aria-expanded={open}
                    aria-controls={`${id}-panel`}
                    onClick={() => setOpen(value => !value)}
                >
                    <span className='skill-index'>{String(index + 1).padStart(2, '0')}</span>
                    <span>{group.title}</span>
                    <span className='skill-expand' aria-hidden='true'>+</span>
                </button>
            </h4>
            <p className='skill-preview'>{group.skills.slice(0, 3).join(' / ')}</p>
            <motion.div
                id={`${id}-panel`}
                role='region'
                aria-labelledby={`${id}-heading`}
                aria-hidden={!open}
                inert={!open}
                className='skill-panel'
                initial={false}
                animate={open ? 'open' : 'closed'}
                variants={{
                    open: {
                        height: 'auto',
                        opacity: 1,
                        transition: { duration, ease: [0.22, 1, 0.36, 1], staggerChildren: reduced ? 0 : 0.025, delayChildren: reduced ? 0 : 0.07 },
                    },
                    closed: {
                        height: 0,
                        opacity: 0,
                        transition: { duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] },
                    },
                }}
            >
                <div className='skill-detail'>
                    <p>{group.description}</p>
                    <div className='tag-list'>
                        {group.skills.map(skill => (
                            <motion.span
                                key={skill}
                                variants={{
                                    open: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.24 } },
                                    closed: { opacity: 0, y: reduced ? 0 : 6, transition: { duration: reduced ? 0 : 0.12 } },
                                }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
