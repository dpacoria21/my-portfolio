import { useEffect } from 'react';

import './ContactPage.css';
import { Variants, motion} from 'framer-motion';
import { contacts } from '../data/contacts';
import { CustomStyle } from '../interfaces/interfaces';

const listVariants: Variants = {
    off: {
        opacity: 0,
        transition: {duration: 0.5, when: 'afterChildren'}
    },
    on: {
        opacity: 1,
        transition: {duration: 0.5, when: 'beforeChildren'},
    }
};

const itemVariants: Variants = {
    on: i => ({
        transition: {
            delay: i * 0.1,
            duration: 0.4
        },
        opacity: 1,
        x: 0
    }),
    off: i => ({
        transition: {
            delay: i * 0.1,
            duration: 0.4
        },
        opacity: 0,
        x: -100
    })
};

export const ContactPage = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <motion.section layout variants={listVariants} whileInView={'on'} initial={'off'} viewport={{once: true}} className='contact__container'>
                {contacts.map((contact, i) => (
                    <motion.a 
                        variants={itemVariants} 
                        custom={i}
                        animate={{
                            // x: [0, 25, 15, 0],
                            y: [0, 15, 0],
                            transition: {
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                            },
                        }}
                        style={{
                            '--skill-hover-color': contact.color
                        } as CustomStyle}
                        transition={{duration: 0.5}} 
                        href={contact.path} 
                        key={contact.name+i} 
                        className='contact__item'
                        rel={'noreferrer'}
                        target='_blank'
                    >
                        <img className='contact__img' src={`/${contact.name}.webp`} loading='lazy' alt={contact.name} />
                    </motion.a>
                ))}
            </motion.section>
        </>
    );
};

export default ContactPage;
