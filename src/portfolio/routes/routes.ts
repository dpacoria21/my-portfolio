import { AboutPage, ContactPage, HomePage } from '../pages';

type JSXComponent = () => JSX.Element;

interface Route {
    to: string,
    path: string,
    component: JSXComponent,
    name: string,
}

export const routes: Route[] = [
    {
        to: '/home',
        path: 'home',
        component: HomePage,
        name: '📖Presentación'
    },
    {
        to: '/about-me',
        path: 'about-me',
        component: AboutPage,
        name: '🧑‍💻Sobre mí'
    },
    {
        to: '/contact',
        path: 'contact',
        component: ContactPage,
        name: '☎️Contacto'
    },
];