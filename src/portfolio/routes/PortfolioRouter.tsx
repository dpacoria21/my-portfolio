import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../ui/components/Navbar';
import { routes } from './routes';

export const PortfolioRouter = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Routes>
                    {routes.map((route, i) => (
                        <Route key={route.name+i} path={route.path} element={<route.component />}/>
                    ))}
                    <Route path='/*' element={<Navigate to={'/home'}/>} />
                </Routes>
            </main>
        </>
    );
};
