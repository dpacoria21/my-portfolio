import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
    achievements,
    career,
    profile,
    selectedProjects,
    skillGroups,
    type SelectedProject
} from '../data/profile';
import { Icon } from '../components/Icon';
import { OrbitalScene } from '../components/OrbitalScene';
import { CommandPalette } from '../components/CommandPalette';
import './PortfolioPage.css';

const navigation = [
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'trayectoria', label: 'Trayectoria' },
    { id: 'contacto', label: 'Contacto' }
];

const Reveal = ({
    children,
    className = ''
}: {
    children: ReactNode;
    className?: string;
}) => {
    const reduced = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
};

const ProjectVisual = ({ project }: { project: SelectedProject }) => (
    <div
        className={`project-visual project-visual--${project.id}`}
        aria-hidden="true"
    >
        <div className="visual-topline">
            <span>{project.category}</span>
        </div>
        {project.id === 'senses' && (
            <div className="senses-art">
                <div className="senses-symbol">
                    <i />
                    <i />
                    <i />
                </div>
                <span>
                    senses<span className="senses-period">.</span>
                </span>
                <p>Personas. Conexiones. Cuidado.</p>
                <div className="art-nodes">
                    <span>API</span>
                    <i />
                    <span>DATA</span>
                    <i />
                    <span>SERVICES</span>
                </div>
            </div>
        )}
        {project.id === 'scheduler' && (
            <div className="scheduler-art">
                <div className="scheduler-word">
                    Make room
                    <br />
                    <em>for your day.</em>
                </div>
                <div className="schedule-phone">
                    <div className="phone-notch" />
                    <span className="phone-date">MIÉRCOLES, 23</span>
                    <strong>
                        Mi día<span>+</span>
                    </strong>
                    <div className="phone-week">
                        <span>L</span>
                        <span>M</span>
                        <span className="selected-day">M</span>
                        <span>J</span>
                        <span>V</span>
                    </div>
                    <div className="phone-event">
                        <small>09:00 — 10:30</small>
                        <b>Un nuevo proyecto</b>
                    </div>
                    <div className="phone-event phone-event--lavender">
                        <small>14:00 — 15:00</small>
                        <b>Tiempo para crear</b>
                    </div>
                    <div className="phone-event phone-event--light">
                        <small>17:00</small>
                        <b>Una idea más.</b>
                    </div>
                </div>
            </div>
        )}
        {project.id === 'chapifarm' && (
            <div className="pharmacy-art">
                <div className="pharmacy-brand">
                    <span>+</span> ChapiFarm
                </div>
                <div className="pharmacy-window">
                    <div className="window-bar">
                        <i />
                        <i />
                        <i />
                        <span>chapifarm / tienda</span>
                    </div>
                    <img
                        src="/project5.webp"
                        alt=""
                        loading="lazy"
                        width="1600"
                        height="829"
                    />
                </div>
            </div>
        )}
        {project.id === 'finger-tracking' && (
            <div className="vision-art">
                <div className="vision-grid" />
                <svg viewBox="0 0 260 210">
                    <path d="m80 185-32-45-13-35 14-9 29 35-4-97 15-2 12 72 0-90 16-2 9 88 9-78 17 3-6 83 17-55 16 6-14 104-35 35Z" />
                    <path d="m80 185 21-81 16-92m-16 92 25-4 26-75m-26 75 20 8 33-49m-33 49-16 81m-29-85-23 27-43-26m43 26 52 58" />
                    {[
                        [80, 185],
                        [48, 140],
                        [35, 105],
                        [78, 131],
                        [74, 34],
                        [101, 104],
                        [117, 12],
                        [126, 100],
                        [152, 25],
                        [146, 108],
                        [179, 59],
                        [165, 163],
                        [130, 189]
                    ].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="4" />
                    ))}
                </svg>
                <span className="vision-caption">La interfaz eres tú.</span>
            </div>
        )}
        <span className="project-visual-arrow">
            <Icon name="arrow" />
        </span>
    </div>
);

const ProjectDialog = ({
    project,
    onClose
}: {
    project: SelectedProject | null;
    onClose: () => void;
}) => {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = ref.current;
        if (project && dialog && !dialog.open) dialog.showModal();
        if (!project && dialog?.open) dialog.close();
        if (!project) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [project]);
    return (
        <dialog
            ref={ref}
            className="project-dialog"
            aria-labelledby="project-dialog-title"
            onCancel={onClose}
            onClose={onClose}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            {project && (
                <div className="project-dialog-content">
                    <button
                        className="icon-button dialog-close"
                        aria-label="Cerrar proyecto"
                        onClick={onClose}
                        autoFocus
                    >
                        <Icon name="close" />
                    </button>
                    <span className="eyebrow">
                        EN DETALLE / {project.category}
                    </span>
                    <h2 id="project-dialog-title">{project.title}</h2>
                    <p>{project.description}</p>
                    <h3>Mi contribución</h3>
                    <ul>
                        {project.highlights.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <div className="tag-list">
                        {project.technologies.map((tech) => (
                            <span key={tech}>{tech}</span>
                        ))}
                    </div>
                    <div className="dialog-links">
                        {project.githubUrl && (
                            <a
                                className="button button-primary"
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon name="github" />
                                Ver código
                                <Icon name="arrow" />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                className="button button-outline"
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ver proyecto
                                <Icon name="arrow" />
                            </a>
                        )}
                        {project.evidenceUrl && (
                            <a
                                className="button button-outline"
                                href={project.evidenceUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {project.id === 'senses'
                                    ? 'Leer caso en PDF'
                                    : 'Ver reconocimiento'}
                                <Icon name="arrow" />
                            </a>
                        )}
                    </div>
                </div>
            )}
        </dialog>
    );
};

const initialTheme = () => {
    try {
        return localStorage.getItem('dp-theme') === 'light' ? 'light' : 'dark';
    } catch {
        return 'dark';
    }
};

const PortfolioPage = () => {
    const [theme, setTheme] = useState(initialTheme);
    const [menuOpen, setMenuOpen] = useState(false);
    const [commandOpen, setCommandOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [filter, setFilter] = useState('Todos');
    const [selected, setSelected] = useState<SelectedProject | null>(null);
    const [copyStatus, setCopyStatus] = useState('');
    const copyTimer = useRef<ReturnType<typeof setTimeout>>();
    const menuToggle = useRef<HTMLButtonElement>(null);
    const location = useLocation();
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 30
    });
    const categories = [
        'Todos',
        ...new Set(selectedProjects.map((project) => project.category))
    ];
    const filteredProjects = selectedProjects.filter(
        (project) => filter === 'Todos' || project.category === filter
    );

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem('dp-theme', theme);
        } catch {
            /* The theme also works without storage. */
        }
    }, [theme]);

    useEffect(() => {
        if (menuOpen)
            document
                .querySelector<HTMLAnchorElement>('#main-navigation a')
                ?.focus();
    }, [menuOpen]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === 'k'
            ) {
                event.preventDefault();
                if (!selected) {
                    setFilter('Todos');
                    setMenuOpen(false);
                    setCommandOpen((value) => !value);
                }
            }
            if (event.key === 'Escape') {
                setMenuOpen(false);
                if (menuOpen) menuToggle.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [menuOpen, selected]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
        );
        navigation.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!location.hash) return;
        let id = location.hash.slice(1);
        try {
            id = decodeURIComponent(id);
        } catch {
            return;
        }
        const frame = requestAnimationFrame(() =>
            document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
        );
        return () => cancelAnimationFrame(frame);
    }, [location.hash]);

    useEffect(() => () => clearTimeout(copyTimer.current), []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopyStatus('Correo copiado');
        } catch {
            setCopyStatus(
                'Puedes seleccionar y copiar el correo que aparece aquí.'
            );
        }
        clearTimeout(copyTimer.current);
        copyTimer.current = setTimeout(() => setCopyStatus(''), 4000);
    };

    const commandItems = [
        ...navigation.map((item) => ({
            id: item.id,
            label: item.label,
            description:
                item.id === 'trayectoria'
                    ? 'Experiencia y formación'
                    : 'Ir a la sección',
            href: `#${item.id}`
        })),
        ...selectedProjects.map((item) => ({
            id: item.id,
            label: item.title,
            description: `${item.category} · Proyecto`,
            href: `#proyecto-${item.id}`
        })),
        {
            id: 'cv',
            label: 'Descargar mi CV',
            description: 'Currículum actualizado · PDF',
            href: profile.cvUrl,
            external: true
        },
        {
            id: 'github',
            label: 'GitHub',
            description: '@dpacoria21',
            href: profile.github,
            external: true
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            description: 'Mi perfil profesional',
            href: profile.linkedin,
            external: true
        }
    ];

    return (
        <>
            <a className="skip-link" href="#contenido">
                Saltar al contenido
            </a>
            <motion.div
                className="reading-progress"
                style={{ scaleX: reduced ? scrollYProgress : smoothProgress }}
            />
            <header className="site-header">
                <div className="header-inner wrap">
                    <a
                        href="#inicio"
                        className="wordmark"
                        aria-label="Diego Pacori, inicio"
                    >
                        dp<span>.</span>
                        <span className="wordmark-name">
                            DIEGO
                            <br />
                            PACORI
                        </span>
                    </a>
                    <nav
                        className={`main-nav ${menuOpen ? 'is-open' : ''}`}
                        id="main-navigation"
                        aria-label="Navegación principal"
                    >
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={
                                    activeSection === item.id ? 'is-active' : ''
                                }
                                aria-current={
                                    activeSection === item.id
                                        ? 'location'
                                        : undefined
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <div className="header-actions">
                        <button
                            className="search-trigger"
                            aria-label="Buscar en el portafolio"
                            aria-keyshortcuts="Control+k Meta+k"
                            onClick={() => {
                                setFilter('Todos');
                                setMenuOpen(false);
                                setCommandOpen(true);
                            }}
                        >
                            <Icon name="search" />
                            <kbd>Ctrl K</kbd>
                        </button>
                        <button
                            className="icon-button theme-toggle"
                            aria-label={`Activar tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
                            onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                        >
                            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
                        </button>
                        <button
                            ref={menuToggle}
                            className="icon-button menu-toggle"
                            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={menuOpen}
                            aria-controls="main-navigation"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <Icon name={menuOpen ? 'close' : 'menu'} />
                        </button>
                    </div>
                </div>
            </header>

            <main id="contenido">
                <section
                    className="hero wrap"
                    id="inicio"
                    aria-labelledby="hero-title"
                >
                    <div className="hero-topline">
                        <span>
                            <i className="status-dot" />
                            FULL-STACK DEVELOPER
                        </span>
                        <span>
                            AREQUIPA, PERÚ{' '}
                            <Icon name="globe" width="14" height="14" />
                        </span>
                    </div>
                    <div className="hero-grid">
                        <div className="hero-copy">
                            <p className="hero-intro">
                                Hola, soy {profile.shortName}.
                            </p>
                            <h1 id="hero-title">
                                Ideas que
                                <br />
                                cobran <span>vida.</span>
                            </h1>
                            <p className="hero-description">
                                Del primer píxel a la última línea de código.
                                <br className="desktop-break" /> Construyo
                                experiencias web y móviles con intención.
                            </p>
                            <div className="hero-cta">
                                <a
                                    className="button button-primary"
                                    href="#proyectos"
                                >
                                    Explorar proyectos <Icon name="arrow" />
                                </a>
                                <a
                                    className="button button-text"
                                    href={profile.cvUrl}
                                    download
                                >
                                    Descargar CV
                                    <Icon name="download" />
                                </a>
                            </div>
                            <div className="hero-socials">
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icon name="github" />
                                    GitHub
                                    <Icon name="arrow" width="13" height="13" />
                                </a>
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icon name="linkedin" />
                                    LinkedIn
                                    <Icon name="arrow" width="13" height="13" />
                                </a>
                                <span className="social-divider" />
                                <span>También me dicen Gunter.</span>
                            </div>
                        </div>
                        <div className="hero-art">
                            <OrbitalScene />
                        </div>
                    </div>
                    <div className="hero-bottom">
                        <div className="current-role">
                            <span className="eyebrow">ACTUALMENTE</span>
                            <span>
                                Desarrollador Back-End{' '}
                                <span className="muted">en</span> Senses
                                Psicólogos <i className="status-dot" />
                            </span>
                        </div>
                        <a
                            href="#proyectos"
                            className="scroll-cue"
                            aria-label="Ir a proyectos"
                        >
                            <span>UN POCO DE LO QUE HAGO</span>
                            <Icon name="down" />
                        </a>
                    </div>
                </section>

                <div
                    className="tech-ribbon"
                    aria-label="Tecnologías principales"
                >
                    <div className="wrap">
                        {[
                            'React',
                            'TypeScript',
                            'Node.js',
                            'React Native',
                            'PostgreSQL',
                            'Angular'
                        ].map((tech) => (
                            <span key={tech}>{tech}</span>
                        ))}
                    </div>
                </div>

                <section
                    id="proyectos"
                    className="section wrap"
                    aria-labelledby="projects-title"
                >
                    <Reveal>
                        <div className="section-heading">
                            <div>
                                <h2 id="projects-title">
                                    Proyectos seleccionados.
                                </h2>
                            </div>
                            <p>
                                Problemas reales, distintas tecnologías.
                                <br />
                                Una selección de lo que he construido.
                            </p>
                        </div>
                    </Reveal>
                    <div className="projects-toolbar">
                        <div
                            className="project-filters"
                            role="group"
                            aria-label="Filtrar proyectos por categoría"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    aria-pressed={filter === category}
                                    className={
                                        filter === category ? 'selected' : ''
                                    }
                                    onClick={() => setFilter(category)}
                                >
                                    {category}
                                    {category === 'Todos' && (
                                        <span>
                                            {selectedProjects.length
                                                .toString()
                                                .padStart(2, '0')}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <span className="result-count" aria-live="polite">
                            {String(filteredProjects.length).padStart(2, '0')}{' '}
                            proyectos
                        </span>
                    </div>
                    <div className="project-grid">
                        {filteredProjects.map((project) => (
                            <Reveal key={project.id} className="project-card">
                                <article id={`proyecto-${project.id}`}>
                                    <button
                                        className="project-open"
                                        onClick={() => setSelected(project)}
                                        aria-label={`Ver detalles de ${project.title}`}
                                    >
                                        <ProjectVisual project={project} />
                                    </button>
                                    <div className="project-info">
                                        <div className="project-title-row">
                                            <button
                                                onClick={() =>
                                                    setSelected(project)
                                                }
                                                className="project-name"
                                            >
                                                {project.title}
                                            </button>
                                            <span>{project.category}</span>
                                        </div>
                                        <p>{project.description}</p>
                                        <div className="tag-list">
                                            {project.technologies
                                                .slice(0, 4)
                                                .map((tech) => (
                                                    <span key={tech}>
                                                        {tech}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                    <a
                        href={profile.github}
                        className="github-strip"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="github-strip-symbol">
                            <Icon name="github" width="25" height="25" />
                        </span>
                        <span>
                            <strong>
                                El código también cuenta una historia.
                            </strong>
                            <span>
                                Más proyectos, experimentos y algoritmos en
                                GitHub.
                            </span>
                        </span>
                        <span className="github-handle">
                            @dpacoria21 <Icon name="arrow" />
                        </span>
                    </a>
                </section>

                <section
                    className="about-section"
                    id="sobre-mi"
                    aria-labelledby="about-title"
                >
                    <div className="wrap section">
                        <Reveal>
                            <div className="about-grid">
                                <div className="about-heading">
                                    <h2 id="about-title">Sobre mí.</h2>
                                    <div className="avatar-signature">
                                        <img
                                            src="/perfil.webp"
                                            alt="Gunter, mi avatar"
                                            width="48"
                                            height="48"
                                            loading="lazy"
                                        />
                                        <div>
                                            <strong>{profile.shortName}</strong>
                                            <span>Arequipa, Perú · UNSA</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="about-copy">
                                    <p className="about-lead">
                                        Me gusta entender cómo funcionan las
                                        cosas.
                                        <span className="muted">
                                            {' '}
                                            Y después, encontrar una forma de
                                            hacerlas mejor.
                                        </span>
                                    </p>
                                    <p>{profile.summary}</p>
                                    <p>
                                        Entre interfaces, APIs y competencias de
                                        programación, disfruto conectar la
                                        lógica con la creatividad. Cada proyecto
                                        es una oportunidad para aprender algo
                                        nuevo y construir algo útil.
                                    </p>
                                    <div className="about-facts">
                                        <div>
                                            <span>MI ENFOQUE</span>
                                            <strong>
                                                Web + móvil + backend
                                            </strong>
                                        </div>
                                        <div>
                                            <span>MI MOTOR</span>
                                            <strong>
                                                Aprender construyendo
                                            </strong>
                                        </div>
                                    </div>
                                    <a
                                        className="text-link"
                                        href={profile.portfolioPdfUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Mi recorrido, en PDF
                                        <Icon name="arrow" />
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                        <div className="skills-heading">
                            <h3>Tecnologías</h3>
                        </div>
                        <div className="skills-grid">
                            {skillGroups.map((group, index) => (
                                <Reveal key={group.id}>
                                    <details className="skill-group">
                                        <summary>
                                            <span className="skill-index">
                                                0{index + 1}
                                            </span>
                                            <h4>{group.title}</h4>
                                            <span className="skill-expand">
                                                +
                                            </span>
                                        </summary>
                                        <p>{group.description}</p>
                                        <div className="skill-preview">
                                            {group.skills
                                                .slice(0, 4)
                                                .join(' / ')}
                                        </div>
                                        <div className="skill-detail">
                                            <div className="tag-list">
                                                {group.skills.map((skill) => (
                                                    <span key={skill}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </details>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="trayectoria"
                    className="section wrap"
                    aria-labelledby="career-title"
                >
                    <Reveal>
                        <div className="section-heading">
                            <div>
                                <h2 id="career-title">
                                    Experiencia y formación.
                                </h2>
                            </div>
                            <a
                                className="text-link"
                                href={profile.cvUrl}
                                download
                            >
                                Ver CV completo
                                <Icon name="download" />
                            </a>
                        </div>
                    </Reveal>
                    <div className="career-layout">
                        <div className="career-sidebar">
                            <span className="eyebrow">
                                EXPERIENCIA & FORMACIÓN
                            </span>
                            <p>
                                Cada etapa suma una forma
                                <br />
                                nueva de ver los problemas.
                            </p>
                            <div className="education-note">
                                <Icon name="code" />
                                <strong>{career.education[0].degree}</strong>
                                <span>{career.education[0].institution}</span>
                                <small>
                                    {career.education[0].period} · Último año
                                </small>
                            </div>
                        </div>
                        <div className="timeline">
                            {career.experiences.map((experience, index) => (
                                <Reveal key={experience.id}>
                                    <article
                                        className={`timeline-item ${index === 0 ? 'timeline-item--current' : ''}`}
                                    >
                                        <div className="timeline-dot" />
                                        <span className="eyebrow">
                                            {experience.period}
                                        </span>
                                        <h3>{experience.role}</h3>
                                        <h4>{experience.company}</h4>
                                        <p>{experience.description}</p>
                                        <div className="tag-list">
                                            {experience.technologies.map(
                                                (tech) => (
                                                    <span key={tech}>
                                                        {tech}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                    <div className="achievements-heading">
                        <Icon name="spark" />
                        <h3>También disfruto un buen desafío.</h3>
                        <span>PROGRAMACIÓN & RECONOCIMIENTOS</span>
                    </div>
                    <div className="achievement-grid">
                        {achievements.slice(0, 3).map((achievement, index) => (
                            <a
                                key={achievement.id}
                                href={achievement.evidenceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="achievement-card"
                            >
                                <span className="achievement-mark">
                                    {['1457', '23/200', '01'][index]}
                                    <span>
                                        {
                                            [
                                                'MAX. RATING',
                                                'EQUIPOS · ICPC 2025',
                                                'FERIA UNSA · 2022'
                                            ][index]
                                        }
                                    </span>
                                </span>
                                <h4>{achievement.title}</h4>
                                <p>{achievement.description}</p>
                                <Icon name="arrow" />
                            </a>
                        ))}
                    </div>
                </section>

                <section
                    id="contacto"
                    className="contact-section"
                    aria-labelledby="contact-title"
                >
                    <div className="wrap">
                        <Reveal>
                            <div className="contact-top">
                                <span className="eyebrow">
                                    04 / LA SIGUIENTE IDEA
                                </span>
                                <span className="contact-location">
                                    <Icon name="globe" width="15" height="15" />
                                    DESDE AREQUIPA, PARA EL MUNDO
                                </span>
                            </div>
                            <h2 id="contact-title">
                                Todo empieza
                                <br />
                                con un{' '}
                                <a href={`mailto:${profile.email}`}>
                                    hola.
                                    <Icon name="arrow" />
                                </a>
                            </h2>
                            <div className="contact-bottom">
                                <div>
                                    <p>
                                        ¿Un proyecto en mente? Me gustaría
                                        escucharlo.
                                    </p>
                                    <div className="email-row">
                                        <a href={`mailto:${profile.email}`}>
                                            {profile.email}
                                        </a>
                                        <button
                                            className="icon-button"
                                            aria-label="Copiar correo electrónico"
                                            onClick={copyEmail}
                                        >
                                            <Icon
                                                name={
                                                    copyStatus ===
                                                    'Correo copiado'
                                                        ? 'check'
                                                        : 'copy'
                                                }
                                            />
                                        </button>
                                    </div>
                                    <span className="copy-status" role="status">
                                        {copyStatus}
                                    </span>
                                </div>
                                <a
                                    className="button contact-button"
                                    href={`mailto:${profile.email}`}
                                >
                                    Conversemos
                                    <Icon name="arrow" />
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>

            <footer className="site-footer wrap">
                <a
                    href="#inicio"
                    className="wordmark"
                    aria-label="Volver al inicio"
                >
                    dp<span>.</span>
                </a>
                <p>
                    Hecho con intención, por Diego Pacori.
                    <br />
                    <span>© {new Date().getFullYear()}</span>
                </p>
                <div>
                    <a href={profile.github} target="_blank" rel="noreferrer">
                        GitHub
                        <Icon name="arrow" width="14" height="14" />
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                        <Icon name="arrow" width="14" height="14" />
                    </a>
                    <a href={profile.cvUrl} download>
                        CV
                        <Icon name="download" width="14" height="14" />
                    </a>
                </div>
                <a
                    className="back-top"
                    href="#inicio"
                    aria-label="Volver arriba"
                >
                    <Icon name="down" />
                </a>
            </footer>
            <ProjectDialog
                project={selected}
                onClose={() => setSelected(null)}
            />
            <CommandPalette
                open={commandOpen}
                onClose={() => setCommandOpen(false)}
                items={commandItems}
            />
        </>
    );
};

export default PortfolioPage;
