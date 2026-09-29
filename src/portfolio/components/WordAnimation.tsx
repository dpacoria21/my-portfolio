import { useEffect, useState } from 'react';

import './WordAnimation.css';
import { motion, type Variants } from 'framer-motion';

interface Props {
    show: string,
    velocity: number,
}

const cursorVariant: Variants = {
    animated: {
        scale: [0, 1, 0],
        transition: {
            duration: 1.20,
            ease: 'linear',
            repeat: Infinity
        }
    },
    finished: {
    }
};

const AnimatedWord = ({ show, velocity }: Props) => {
    const [word, setWord] = useState<string>('');

    useEffect(() => {
        if (!show) return;
        let index = 0;
        const showWord = setInterval(() => {
            index++;
            setWord(show.substring(0, index));
            if (index >= show.length) {
                clearInterval(showWord);
            }
        }, velocity);
        return () => clearInterval(showWord);
    }, [show, velocity]);

    return <p className='word'>{word}</p>;
};

export const WordAnimation = ({show = '', velocity = 1000}: Props) => {
    return (
        <div className='word__container'>
            <AnimatedWord key={`${show}:${velocity}`} show={show} velocity={velocity} />
            <motion.div 
                variants={cursorVariant} 
                animate={'animated'}
                className='word__cursor'
            >
                    
            </motion.div>
        </div>
    );
};
