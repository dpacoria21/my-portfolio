import { CSSProperties, ReactElement } from 'react';

export interface Tech {
    logo: ReactElement<React.SVGProps<SVGSVGElement>>,
    name: string,
    color: string,
}

export interface Technologies {
    [key: string]: Tech,
}


export interface Project {
    title: string,
    about: string,
    tools: string[],
    links: string[],
    img: string,
}

export interface Experience {
    title: string,
    subtitle: string,
    content: string,
    date: string,
    icon?: ReactElement<React.SVGProps<SVGSVGElement>>,
    color?: string,
    secondColor?: string,
    link?: string,
}

export interface Contact {
    name: string,
    path: string,
    color: string,
}

export interface CustomStyle extends CSSProperties {
    '--skill-hover-color': string,
}