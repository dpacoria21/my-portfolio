import { NavLink } from 'react-router-dom';
import {color, motion} from 'framer-motion';

import './Navbar.css';

export const Navbar = () => {

    return (
        <nav className='navbar'>
            {/* logo */}
            <div className='navbar--left'>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" d="m16 11l1.697 1.527c1.542 1.388 2.313 2.082 2.313 2.973c0 .89-.771 1.585-2.314 2.973L16 20M13.987 5l-1.994 7.5L10 20M8 4.83L6.304 6.356C4.76 7.745 3.99 8.44 3.99 9.33c0 .89.771 1.585 2.314 2.973L8 13.83"/></svg>
                <span className='title' >Gunter</span>
            </div>

            {/* menu img */}
            <div className='navbar--right'>
                <div className='button__toggle'>
                    <img className='button__toggle__img' src="" alt="" />
                </div>

                {/* menu content */}
                <ul className='menu'>
                    <li className='menu__item'>
                        <NavLink 
                            className={({isActive}) => isActive ? 'menu__item__link text__selected': 'menu__item__link'} 
                            to={'/'}
                        >
                            {
                                ({isActive}) => (
                                    <>
                                        Home
                                        {isActive ? <motion.div layoutId='indicator' transition={{type: 'spring'}} className='link__selected'></motion.div> : ''}
                                    </>
                                )
                            }
                        </NavLink>
                    </li>
                    <li className='menu__item'>
                        <NavLink 
                            className={({isActive}) => isActive ? 'menu__item__link text__selected': 'menu__item__link'} 
                            to={'/about-me'}
                        >
                            {
                                ({isActive}) => (
                                    <>
                                        About me
                                        {isActive ? <motion.div layoutId='indicator' transition={{type: 'spring'}} className='link__selected'></motion.div> : ''}
                                    </>
                                )
                            }
                        </NavLink>
                    </li>
                    <li className='menu__item'>
                        <NavLink 
                            className={({isActive}) => isActive ? 'menu__item__link text__selected': 'menu__item__link'} 
                            to={'/contact'}
                        >
                            {
                                ({isActive}) => (
                                    <>
                                        Contact
                                        {isActive ? <motion.div layoutId='indicator' transition={{type: 'spring'}} className='link__selected'></motion.div> : ''}
                                    </>
                                )
                            }
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
