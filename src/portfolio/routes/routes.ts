import { type JSX, LazyExoticComponent, lazy } from 'react';

type JSXComponent = () => JSX.Element;

interface Route {
    to: string,
    path: string,
    component: LazyExoticComponent<JSXComponent> | JSXComponent,
    name: string,
}

const lazyHomePage = lazy(() => import('../pages/HomePage'));
const lazyAboutPage = lazy(() => import('../pages/AboutPage'));
const lazyContactPage = lazy(() => import('../pages/ContactPage'));

export const routes: Route[] = [
    {
        to: '/',
        path: '',
        component: lazyHomePage,
        name: '📖Presentación'
    },
    {
        to: '/about-me',
        path: 'about-me',
        component: lazyAboutPage,
        name: '🧑‍💻Sobre mí'
    },
    {
        to: '/contact',
        path: 'contact',
        component: lazyContactPage,
        name: '☎️Contacto'
    },
];
