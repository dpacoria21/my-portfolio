import {motion} from 'framer-motion';
import './ProjectCard.css';

export const ProjectCard = () => {
    return (
        <div className='card'>
            <img src={'./web1.jpeg'} alt="web1" className='card__img'/>
            <div className='card__right'>
                <div className='card__info'>
                    <h2 className='card__title'>About the project</h2>
                    <p className='card__text'>Este proyecto fue realizado gracias a la ayuda de muchos amigos ...</p>
                </div>
                <h2 className='card__title'>Technologies</h2>
                <section className='card__logos'>
                    <div className='card__logo'>
                        <img src="./perfil.jpeg" alt="technology" className='logo__img'/>
                        <span className='logo__info'>React</span>
                    </div>
                    <div className='card__logo'>
                        <img src="./perfil.jpeg" alt="technology" className='logo__img'/>
                        <span className='logo__info'>React</span>
                    </div>
                    <div className='card__logo'>
                        <img src="./perfil.jpeg" alt="technology" className='logo__img'/>
                        <span className='logo__info'>React</span>
                    </div>
                    <div className='card__logo'>
                        <img src="./perfil.jpeg" alt="technology" className='logo__img'/>
                        <span className='logo__info'>React</span>
                    </div>
                </section>
            </div>
            <motion.div  className='card__reverse'>
                <h1>Go to:</h1>
                <section className='networks'>
                    <a className='to__link' target='_blank' href="https://github.com/dpacoria21" rel="noreferrer" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                        </svg>
                    </a>
                    <a className='to__link' href="" target='_blank' rel='noreferrer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cast" viewBox="0 0 16 16">
                            <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0"/>
                            <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086z"/>
                        </svg>
                    </a>
                </section>
            </motion.div>
        </div>
    );
};
