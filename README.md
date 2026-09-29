# Portafolio de Diego Ivan Pacori Anccasi

Portafolio personal de un Full-Stack Developer de Arequipa, Perú. Presenta proyectos web, móviles, backend y de visión artificial, junto con experiencia profesional, formación y reconocimientos.

**[Ver portafolio](https://my-portfolio-olive-eight-62.vercel.app/)** · **[LinkedIn](https://www.linkedin.com/in/diego-ivan-pacori-anccasi-9860172b3/)** · **[GitHub](https://github.com/dpacoria21)**

## Dirección visual

Preferencia del autor: diseño minimalista, con negro, azul oscuro y azul claro. Usar tipografía limpia, espacio libre y movimiento discreto. Mantener esta paleta en futuras actualizaciones.

## Experiencia del portafolio

- Diseño adaptable a móvil y escritorio, con temas claro y oscuro. La preferencia se conserva en el navegador.
- Escena orbital en SVG y CSS que responde al puntero, transiciones de entrada y progreso de lectura.
- Búsqueda rápida con `Ctrl + K` o `Cmd + K`: secciones, proyectos, CV y perfiles. Permite navegar con flechas, abrir con Enter y cerrar con Escape.
- Filtros por categoría y fichas de proyectos con contribuciones, tecnologías, código o evidencia disponible.
- Grupos de habilidades desplegables, trayectoria profesional y reconocimientos.
- Acceso al CV y al portafolio en PDF, enlaces profesionales y copia del correo electrónico.
- Navegación por teclado, enlace para saltar al contenido y adaptación de las animaciones a la preferencia de movimiento reducido.

## Tecnologías

React 18, TypeScript, Vite, React Router, Framer Motion y CSS.

## Contenido y fuentes

La información visible está centralizada en [`src/portfolio/data/profile.ts`](src/portfolio/data/profile.ts):

| Exportación | Contenido |
| --- | --- |
| `profile` | Identidad, presentación, contacto, enlaces y documentos |
| `career` | Experiencias profesionales y educación |
| `selectedProjects` | Proyectos, contribuciones, tecnologías y enlaces |
| `skillGroups` | Habilidades organizadas por área |
| `achievements` | Reconocimientos y programación competitiva |

La selección incluye **Senses Psicólogos**, **Scheduler-App**, **ChapiFarm** y el **sistema de reconocimiento del movimiento de los dedos**. Las fichas distinguen repositorios públicos de casos documentados en PDF.

La actualización de septiembre de 2026 utiliza el [CV](public/cv_dpacoria.pdf), el [portafolio PDF](public/Portafolio_Diego_Pacori.pdf) y el perfil público de GitHub. Las fuentes y sus límites de verificación están en [PROFILE_SOURCES.md](PROFILE_SOURCES.md). Los enlaces a LinkedIn y GitHub abren los perfiles; el contenido de la web se actualiza editando los datos locales.

Para mantener el perfil al día, edita `profile.ts`, reemplaza los PDF conservando sus nombres y registra la nueva revisión en `PROFILE_SOURCES.md`. Los contactos heredados también toman el correo, LinkedIn y WhatsApp desde `profile`.

## Estructura y navegación

- `src/portfolio/pages/PortfolioPage.tsx` y `PortfolioPage.css`: página principal y diseño.
- `src/portfolio/components/`: escena orbital, búsqueda rápida, iconos y componentes heredados.
- `src/portfolio/data/profile.ts`: fuente de datos del diseño actual.
- `src/portfolio/routes/PortfolioRouter.tsx`: rutas y redirecciones.
- `public/`: CV, portafolio PDF y recursos estáticos.
- `src/portfolio/sections/` y otros archivos de páginas/datos: componentes de la versión anterior conservados en el repositorio.

La página principal vive en `/`, con enlaces directos a `#proyectos`, `#sobre-mi`, `#trayectoria` y `#contacto`. Las rutas anteriores `/about-me` y `/contact` redirigen a sus secciones. Las rutas restantes, incluida `/home`, llevan al inicio. `vercel.json` permite abrir esas rutas directamente en Vercel.

## Desarrollo local

```bash
npm install
npm run dev
```

## Validación y compilación

```bash
npm run lint
npm run build
npm run preview
```

`build` ejecuta TypeScript y genera la versión de producción en `dist/`. `preview` permite revisar esa compilación localmente.

Al cambiar la interfaz, revisa temas claro/oscuro, tamaños móvil/escritorio, navegación por teclado, búsqueda, filtros, fichas de proyectos y enlaces a los documentos.

## Autor

**Diego Ivan Pacori Anccasi** · Full-Stack Developer · Ingeniería de Sistemas, UNSA.

[Perfil profesional y logros de programación competitiva](https://github.com/dpacoria21)
