import { useEffect, useState } from 'react';

import './WordAnimation.css';
import { motion } from 'framer-motion';

interface Props {
    show: string,
    velocity: number,
}

const cursorVariant = {
    animated: {
        scale: [0, 1, 0],
        // hight: ['0%', '100%', '0%'],
        // transformOrigin: 'center',
        transition: {
            duration: 1.20,
            ease: 'linear',
            repeat: Infinity
        }
    },
    finished: {
        scale: 0,
    }
};

export const WordAnimation = ({show = '', velocity = 1000}: Props) => {

    const [word, setWord] = useState<string>('');

    useEffect(() => {

        let index: number = 0;
        const showWord = setInterval(() => {
            if(word.length!==show.length) {
                setWord(show.substring(0, index));
                index++;
            }else {
                clearInterval(showWord);
            }
        }, velocity);

    }, []);

    return (
        <div className='word__container'>
            <p className='word'>
                {word}
            </p>
            <motion.div variants={cursorVariant} animate={(word.length!==show.length) ? 'animated' : 'finished'} className='word__cursor'></motion.div>
        </div>
    );
};
