import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../ui/components/Navbar';
import { routes } from './routes';

export const PortfolioRouter = () => {
    return (
        <>
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
                    <Route path='/*' element={<Navigate to={'/home'}/>} />
                </Routes>
            </main>
        </>
    );
};
