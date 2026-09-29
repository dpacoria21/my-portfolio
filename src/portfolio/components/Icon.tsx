import type { JSX, SVGProps } from 'react';

type IconName =
    | 'arrow'
    | 'down'
    | 'download'
    | 'github'
    | 'linkedin'
    | 'mail'
    | 'copy'
    | 'check'
    | 'search'
    | 'sun'
    | 'moon'
    | 'menu'
    | 'close'
    | 'code'
    | 'globe'
    | 'spark'
    | 'terminal';

export const Icon = ({
    name,
    ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) => {
    const paths: Record<IconName, JSX.Element> = {
        arrow: <path d="M5 19 19 5M5 5h14v14" />,
        down: <path d="M12 4v16m-6-6 6 6 6-6" />,
        download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
        github: (
            <path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.4-3.7A4.9 4.9 0 0 0 18.8 1S17.7.7 15 2.4a13 13 0 0 0-7 0C5.3.7 4.2 1 4.2 1a4.9 4.9 0 0 0-.1 3.9 5.3 5.3 0 0 0-1.4 3.7c0 5.3 3.2 6.5 6.2 6.8A3.4 3.4 0 0 0 8 18v4" />
        ),
        linkedin: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M7 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4" />
            </>
        ),
        mail: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
            </>
        ),
        copy: (
            <>
                <rect x="8" y="8" width="12" height="13" rx="2" />
                <path d="M16 8V3H3v13h5" />
            </>
        ),
        check: <path d="m5 12 4 4L19 6" />,
        search: (
            <>
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
            </>
        ),
        sun: (
            <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" />
            </>
        ),
        moon: <path d="M21 13a9 9 0 0 1-10-10A9 9 0 1 0 21 13Z" />,
        menu: <path d="M4 7h16M4 12h16M4 17h16" />,
        close: <path d="m6 6 12 12M6 18 18 6" />,
        code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20" />,
        globe: (
            <>
                <circle cx="12" cy="12" r="9" />
                <ellipse cx="12" cy="12" rx="4" ry="9" />
                <path d="M3 12h18" />
            </>
        ),
        spark: (
            <path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z" />
        ),
        terminal: (
            <>
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="m6 9 3 3-3 3m7 0h4" />
            </>
        )
    };
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {paths[name]}
        </svg>
    );
};
