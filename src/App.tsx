import { BrowserRouter } from 'react-router-dom';
import { Portfolio } from './portfolio/Portfolio';

export const App = () => {

    return (
        <BrowserRouter>
            <Portfolio />
        </BrowserRouter>
    );
};
