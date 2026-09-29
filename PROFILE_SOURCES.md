# Fuentes del perfil

Información revisada el 29 de septiembre de 2026 para `src/portfolio/data/profile.ts`.

## Fuentes principales

- `public/cv_dpacoria.pdf`, 2 páginas: nombre, contacto, formación, experiencia, fechas, tecnologías e idiomas. Se extrajo el texto y se revisaron visualmente ambas páginas. El archivo original se preservó.
- `public/Portafolio_Diego_Pacori.pdf`, 6 páginas, actualizado el 27 de septiembre de 2026: participación y alcance de Senses, Scheduler-App, reconocimiento del movimiento de los dedos y ChapiFarm; programación competitiva y enlaces de evidencia. Se revisaron las seis páginas sin modificar el archivo.
- [GitHub de Diego](https://github.com/dpacoria21): confirma nombre, Arequipa, rol Full-Stack, último año en la UNSA, experiencia actual en Senses, tecnologías, correo, enlace actual de LinkedIn y programación competitiva.
- [Scheduler-App](https://github.com/dpacoria21/scheduler-app): repositorio público y README consultados. Confirman desarrollo en equipo, funciones del cliente móvil, tecnologías y presentación en la Feria de Proyectos UNSA 2023. Las funciones conectadas necesitan un backend compatible; no se presenta como una demo disponible.
- [ChapiFarm](https://github.com/gopoma/chapipharm-frontend): repositorio público del equipo consultado. El CV y el portafolio PDF detallan la contribución de Diego. No se atribuye autoría individual de todo el sistema.
- `src/portfolio/data/experiences.tsx`: inicio de la carrera en 2021 y enlaces de reconocimientos publicados previamente.

## Decisiones y límites de verificación

- La URL de [LinkedIn](https://www.linkedin.com/in/diego-ivan-pacori-anccasi-9860172b3/) coincide en el CV, el portafolio PDF y el perfil público de GitHub. LinkedIn devolvió HTTP 999 al intentar leerlo; esta actualización no afirma haber inspeccionado su contenido actual. La trayectoria se basa en el CV y se contrasta con GitHub.
- Senses Psicólogos tiene repositorio privado según el PDF. La ficha enlaza a la descripción del proyecto en el PDF; no publica ni inventa un repositorio o demo.
- El antiguo repositorio de Pichanga (`https://github.com/gopoma/pichanga-shirts-store-frontend`) devolvió 404. No se incluye entre los proyectos seleccionados.
- Las fichas de reconocimiento del movimiento de los dedos y ChapiFarm conservan los enlaces de evidencia existentes en Google Drive. El navegador de investigación no pudo acceder a esos documentos; no se afirma haber comprobado sus certificados. El alcance y los reconocimientos están documentados en el CV y el PDF.
- ICPC 2025 (equipo Characatux, puesto 23/200) y PERUMEC se incluyen como logros declarados por el autor en el PDF y en GitHub. El PDF indica que no se adjuntaron clasificaciones oficiales o certificados para esos concursos. No se presenta una verificación independiente de esos resultados. Aunque el PDF y GitHub describen los equipos como de Latinoamérica, se omite el ámbito regional en la ficha porque no se pudo corroborar la clasificación oficial.
- Codeforces Specialist y máximo 1457 coinciden en GitHub y el PDF. El PDF registra una consulta directa del 27/09/2026 y la confirmación del autor sobre la cuenta Fernando_Benito. El perfil de Codeforces devolvió HTTP 403 en esta revisión, por lo que se conserva el máximo documentado sin afirmar que se actualiza automáticamente.
- Los enlaces externos son salidas a las fuentes; no implican sincronización automática del contenido. Para actualizar la información visible, editar `src/portfolio/data/profile.ts` junto con estas notas cuando cambien las fuentes.
- No se añadieron porcentajes de dominio, cifras de impacto comercial, años de experiencia agregados ni estado de disponibilidad laboral sin respaldo.
