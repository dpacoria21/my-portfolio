import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../ui/components/Navbar';
import { routes } from './routes';
import { Suspense } from 'react';

import './PortfolioRouter.css';

export const PortfolioRouter = () => {
    
    return (
        <>
            <Suspense 
                fallback={
                    <div className='loader__container'>
                        <span className="loader"></span>
                    </div>
                }>
                <BrowserRouter>
                    <header style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 999
                    }}>
                        <Navbar />
                    </header>
                    <main>
                        <Routes>
                            {routes.map((route, i) => (
                                <Route key={route.name+i} path={route.path} element={<route.component />}/>
                            ))}
                            <Route path='/*' element={<Navigate to={'/'}/>} />
                        </Routes>
                    </main>
                    <footer style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontFamily: '"Outfit", sans-serif',
                        padding: '20px 0',
                        color: 'var(--text-color)',
                        opacity: 0.75
                    }}>
                        <p>&copy; 2024 Gunter. Todos los derechos reservados. | Diseñado por <a style={{textDecoration: 'none', color: 'var(--background-third-color)'}} href="https://github.com/dpacoria21" target="_blank" rel="noreferrer">Diego Pacori</a></p>
                    </footer>
                </BrowserRouter>
            </Suspense>
        </>
    );
};
