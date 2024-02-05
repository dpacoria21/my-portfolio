import { NavLink } from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';

import './Navbar.css';
import { useState } from 'react';
import { useDimensions } from '../../hooks/useDimensions';
import { routes } from '../../routes/routes';

export const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {width} = useDimensions();

    const onIsOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='navbar'>
            {/* logo */}
            <div className='navbar--left'>
                <NavLink to={'/home'} className='navbar--left__home'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" d="m16 11l1.697 1.527c1.542 1.388 2.313 2.082 2.313 2.973c0 .89-.771 1.585-2.314 2.973L16 20M13.987 5l-1.994 7.5L10 20M8 4.83L6.304 6.356C4.76 7.745 3.99 8.44 3.99 9.33c0 .89.771 1.585 2.314 2.973L8 13.83"/></svg>
                    <span className='title' >Gunter</span>
                </NavLink>
            </div>

            {/* menu img */}
            <AnimatePresence mode='wait'>
                <motion.div key={isOpen ? 'open' : 'close'} onClick={onIsOpen} className='button__toggle'>
                    {
                        (isOpen 
                            ? 
                            (
                                <motion.svg transition={{duration: 0.3}} animate={{rotate: [-360, 0], scale: [0, 1]}} exit={{rotate: -360, scale: 0}} className='button__toggle--close' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"/></g></motion.svg>
                            )
                            :
                            (
                                <motion.svg transition={{duration: 0.3}} animate={{rotate: [360, 0], scale: [0, 1]}} exit={{rotate: 360, scale: 0}} className='button__toggle--menu' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h18v2H3zm0 7h12v2H3zm0 7h18v2H3z"/></motion.svg>
                            )
                        )
                    }
                </motion.div>
            </AnimatePresence>

            <motion.div animate={ (!isOpen && (width<980)) ? {opacity: [1, 0], x: [0, -150] } : {opacity: 1, scale: 1}} transition={{duration: 0.25}} className='navbar--right'>

                {/* menu content */}
                <motion.ul className='menu'>

                    {routes.map((route, index) => (
                        <motion.li key={route.name+index} whileHover={{scale: [1, 1.15]}} className='menu__item'>
                            <NavLink
                                className={({isActive}) => isActive ? 'menu__item__link text__selected': 'menu__item__link'} 
                                to={route.to}
                                onClick={onIsOpen}
                            >
                                {
                                    ({isActive}) => (
                                        <>
                                            {route.name}
                                            {isActive ? <motion.div layoutId='indicator' transition={{type: 'spring'}} className='link__selected'></motion.div> : ''}
                                        </>
                                    )
                                }
                            </NavLink>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </nav>
    );
};
