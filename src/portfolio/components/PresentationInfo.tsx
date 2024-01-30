import {motion, Variants} from 'framer-motion';
import { WordAnimation } from '../components/WordAnimation';

import './PresentationInfo.css';

const logoVariant1 = {
    rotate: {
        rotate: [0, 360],
        x: [0, 50, 20, 0],
        y: [0, 10, 50, 0],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
        },
    }
};
const logoVariant2 = {
    rotate: {
        rotate: [0, 360],
        x: [0, 10, 50, 0],
        y: [0, 40, 20, 0],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
        },
    }
};
const logoVariant3 = {
    rotate: {
        rotate: [0, 360],
        x: [0, 35, 60, 0],
        y: [0, 45, 60, 0],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
        },
    }
};

const containerLeft: Variants = {
    visible: {       
        opacity: [0, 1],
        x: [-200, 0],
        transition: {
            // type: 'spring',
            duration: 1,
        } 
    }
};
const containerRight: Variants = {
    visible: {
        opacity: [0, 1],
        x: [200, 0],
        transition: {
            // type: 'spring',
            duration: 1
        }
    }
};

export const PresentationInfo = () => {



    return (
        <section className="container">
            <motion.article whileInView={'visible'} viewport={{once: true}} variants={containerLeft} className="container__left">
                <p className='presentation__title'>Welcome to my portfolio!</p>
                <WordAnimation show='Diego Pacori' velocity={500}/>
                <WordAnimation show='Front-End and Mobile Developer' velocity={500}/>
                <p className='presentation__text'>
                Good morning, my name is Diego, I am 21 years old and I am a Front-End developer with +2 years of experience in this world and with the excitement of continuing to improve and collaborate with other programmers to improve my skills. 
                </p>
            </motion.article>
            <motion.div whileInView={'visible'} viewport={{once: true}} variants={containerRight} className="container__right">
                <img src={'/perfil.jpeg'}  className="perfil" alt="Perfil" />
                <motion.svg variants={logoVariant1} animate={'rotate'} drag dragConstraints={{bottom: 150, right: 150, left: 0, top: 0}} className='float__logo javascript' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                    <path fill="#ffd600" d="M6,42V6h36v36H6z"></path><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"></path>
                </motion.svg>
                <motion.svg variants={logoVariant2} animate={'rotate'} drag dragConstraints={{bottom: 150, left: -150, right: 0, top: 0}} className='float__logo react' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                    <path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"></path><path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"></path><path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"></path><circle cx="24" cy="24" r="4" fill="#80deea"></circle>
                </motion.svg>
                <motion.svg variants={logoVariant3} animate={'rotate'} drag dragConstraints={{bottom: 0, right: 150, left: -150, top: -150}} className='float__logo tailwind' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                    <path fill="#00acc1" d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"></path>
                </motion.svg>
            </motion.div>
        </section>
    );
};
