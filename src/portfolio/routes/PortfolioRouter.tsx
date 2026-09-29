import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PortfolioPage from '../pages/PortfolioPage';

export const PortfolioRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route
                path="/about-me"
                element={<Navigate to="/#trayectoria" replace />}
            />
            <Route
                path="/contact"
                element={<Navigate to="/#contacto" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
);
