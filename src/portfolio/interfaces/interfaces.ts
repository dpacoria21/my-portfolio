import { ReactElement } from 'react';

export interface Tech {
    logo: ReactElement<React.SVGProps<SVGSVGElement>>,
    name: string,
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