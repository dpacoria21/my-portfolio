import { useEffect, useId, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { skillGroups } from '../data/profile';
import './OrbitalScene.css';

type Point = { x: number; y: number; z: number };
type Line = { id: string; points: Point[] };
type Rotation = { yaw: number; pitch: number };

const TAU = Math.PI * 2;
const VIEW_WIDTH = 520;
const VIEW_HEIGHT = 440;
const CENTER = { x: VIEW_WIDTH / 2, y: VIEW_HEIGHT / 2 };
const GLOBE_RADIUS = 122;
const INITIAL_ROTATION: Rotation = { yaw: 0.4, pitch: -0.22 };
const availableSkills = new Set(skillGroups.flatMap((group) => group.skills));
const technologyNames = [
    'React', 'TypeScript', 'Node.js', 'Angular', 'PostgreSQL', 'Python',
    'Docker', 'Git', 'Prisma ORM', 'NestJS', 'React Native', 'Astro'
].filter((name) => availableSkills.has(name));

const technologies = technologyNames.map((name, index) => {
    const y = 1 - ((index + 0.5) / technologyNames.length) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    return {
        name,
        point: { x: Math.cos(angle) * radius * 180, y: y * 180, z: Math.sin(angle) * radius * 180 }
    };
});

const sampleCircle = (getPoint: (angle: number) => Point): Point[] => (
    Array.from({ length: 73 }, (_, index) => getPoint((index / 72) * TAU))
);

const meridians: Line[] = Array.from({ length: 7 }, (_, index) => {
    const longitude = (index / 7) * Math.PI;
    return {
        id: `meridian-${longitude}`,
        points: sampleCircle((angle) => ({
            x: Math.cos(longitude) * Math.cos(angle) * GLOBE_RADIUS,
            y: Math.sin(angle) * GLOBE_RADIUS,
            z: Math.sin(longitude) * Math.cos(angle) * GLOBE_RADIUS
        }))
    };
});

const parallels: Line[] = [-60, -40, -20, 0, 20, 40, 60].map((latitude) => {
    const angle = (latitude / 180) * Math.PI;
    return {
        id: `parallel-${latitude}`,
        points: sampleCircle((longitude) => ({
            x: Math.cos(longitude) * Math.cos(angle) * GLOBE_RADIUS,
            y: Math.sin(angle) * GLOBE_RADIUS,
            z: Math.sin(longitude) * Math.cos(angle) * GLOBE_RADIUS
        }))
    };
});

const rings: Line[] = [
    {
        id: 'outer-orbit',
        points: sampleCircle((angle) => ({
            x: Math.cos(angle) * 187,
            y: Math.sin(angle) * 187 * 0.4,
            z: Math.sin(angle) * 187 * 0.9165
        }))
    },
    {
        id: 'inner-orbit',
        points: sampleCircle((angle) => ({
            x: Math.cos(angle) * 155 * 0.48,
            y: Math.sin(angle) * 155,
            z: Math.cos(angle) * 155 * 0.8773
        }))
    }
];
const lines = [...meridians, ...parallels, ...rings];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const project = (point: Point, { yaw, pitch }: Rotation): Point => {
    const x = point.x * Math.cos(yaw) + point.z * Math.sin(yaw);
    const z = point.z * Math.cos(yaw) - point.x * Math.sin(yaw);
    const y = point.y * Math.cos(pitch) - z * Math.sin(pitch);
    const depth = point.y * Math.sin(pitch) + z * Math.cos(pitch);
    const perspective = 720 / (720 - depth);
    const roll = -0.18;
    return {
        x: CENTER.x + (x * Math.cos(roll) - y * Math.sin(roll)) * perspective,
        y: CENTER.y + (x * Math.sin(roll) + y * Math.cos(roll)) * perspective,
        z: depth
    };
};

const traceLine = (points: Point[], rotation: Rotation) => {
    let front = '';
    let back = '';
    let previous: Point | null = null;

    for (const source of points) {
        const point = project(source, rotation);
        const position = `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
        const isFront = point.z >= 0;

        if (!previous) {
            if (isFront) front += `M${position}`;
            else back += `M${position}`;
        } else if (isFront === (previous.z >= 0)) {
            if (isFront) front += `L${position}`;
            else back += `L${position}`;
        } else {
            const fraction = previous.z / (previous.z - point.z);
            const crossing = `${(previous.x + (point.x - previous.x) * fraction).toFixed(2)},${(previous.y + (point.y - previous.y) * fraction).toFixed(2)}`;
            if (isFront) {
                back += `L${crossing}`;
                front += `M${crossing}L${position}`;
            } else {
                front += `L${crossing}`;
                back += `M${crossing}L${position}`;
            }
        }
        previous = point;
    }
    return { front, back };
};

const initialLines = lines.map((line) => ({ ...line, ...traceLine(line.points, INITIAL_ROTATION) }));

export const OrbitalScene = () => {
    const stageRef = useRef<HTMLDivElement>(null);
    const wakeRef = useRef<() => void>(() => undefined);
    const sceneId = useId().replace(/:/g, '');
    const [paused, setPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const motionRef = useRef({
        ...INITIAL_ROTATION,
        paused: false,
        reduced: reducedMotion,
        hovering: false,
        pointerId: null as number | null,
        previousX: 0,
        previousY: 0,
        previousTime: 0,
        velocityYaw: 0,
        velocityPitch: 0,
        targetYaw: null as number | null
    });

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
        query.addEventListener('change', updatePreference);
        return () => query.removeEventListener('change', updatePreference);
    }, []);

    useEffect(() => {
        const motion = motionRef.current;
        motion.paused = paused;
        motion.reduced = reducedMotion;
        if (paused || reducedMotion) {
            motion.velocityYaw = 0;
            motion.velocityPitch = 0;
        }
        if (reducedMotion && motion.targetYaw !== null) {
            motion.yaw = motion.targetYaw;
            motion.targetYaw = null;
        }
        wakeRef.current();
    }, [paused, reducedMotion]);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        const frontPaths = Array.from(stage.querySelectorAll<SVGPathElement>('[data-wire-front]'));
        const backPaths = Array.from(stage.querySelectorAll<SVGPathElement>('[data-wire-back]'));
        const labels = Array.from(stage.querySelectorAll<HTMLSpanElement>('[data-orbit-label]'));
        let width = stage.clientWidth;
        let height = stage.clientHeight;
        let labelSizes = labels.map((label) => ({ width: label.offsetWidth, height: label.offsetHeight }));
        let frame = 0;
        let lastTime = 0;
        let inView = false;
        let pageVisible = !document.hidden;
        let disposed = false;

        const paint = () => {
            const rotation = motionRef.current;
            lines.forEach((line, index) => {
                const path = traceLine(line.points, rotation);
                frontPaths[index].setAttribute('d', path.front);
                backPaths[index].setAttribute('d', path.back);
            });

            const placed: { x: number; y: number; width: number; height: number }[] = [];
            const projected = technologies.map((technology, index) => ({ index, point: project(technology.point, rotation) }));
            projected.sort((a, b) => b.point.z - a.point.z);

            for (const { index, point } of projected) {
                const label = labels[index];
                const scale = 0.86 + (clamp(point.z, 0, 180) / 180) * 0.14;
                const size = { width: labelSizes[index].width * scale, height: labelSizes[index].height * scale };
                const x = clamp((point.x / VIEW_WIDTH) * width, size.width / 2 + 5, width - size.width / 2 - 5);
                const y = (point.y / VIEW_HEIGHT) * height;
                const collision = placed.some((other) => (
                    Math.abs(other.x - x) < (other.width + size.width) / 2 + 7
                    && Math.abs(other.y - y) < (other.height + size.height) / 2 + 7
                ));
                const opacity = collision ? 0 : clamp((point.z + 12) / 52, 0, 1);
                if (opacity > 0.1) placed.push({ x, y, ...size });
                label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
                label.style.opacity = String(opacity);
                label.style.zIndex = String(Math.round(point.z + 200));
            }
        };

        const tick = (time: number) => {
            frame = 0;
            if (disposed || !inView || !pageVisible) return;
            const elapsed = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
            lastTime = time;
            const motion = motionRef.current;
            const dragging = motion.pointerId !== null;
            const automatic = !motion.paused && !motion.reduced && !motion.hovering && !dragging;
            let moving = false;

            if (!dragging) {
                if (motion.targetYaw !== null) {
                    const distance = motion.targetYaw - motion.yaw;
                    motion.yaw += distance * (1 - Math.exp(-elapsed * 12));
                    moving = Math.abs(distance) > 0.001;
                    if (!moving) {
                        motion.yaw = motion.targetYaw;
                        motion.targetYaw = null;
                    }
                } else if (!motion.reduced && !motion.paused && Math.abs(motion.velocityYaw) + Math.abs(motion.velocityPitch) > 0.015) {
                    motion.yaw += motion.velocityYaw * elapsed;
                    motion.pitch = clamp(motion.pitch + motion.velocityPitch * elapsed, -0.8, 0.8);
                    motion.velocityYaw *= Math.exp(-elapsed * 4.2);
                    motion.velocityPitch *= Math.exp(-elapsed * 4.2);
                    moving = true;
                } else if (automatic) {
                    motion.yaw += elapsed * 0.09;
                    moving = true;
                }
            }
            paint();
            if (moving || automatic) frame = requestAnimationFrame(tick);
            else lastTime = 0;
        };

        const wake = () => {
            if (!disposed && !frame && inView && pageVisible) frame = requestAnimationFrame(tick);
        };
        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            lastTime = 0;
            motionRef.current.velocityYaw = 0;
            motionRef.current.velocityPitch = 0;
        };
        const resize = new ResizeObserver(() => {
            width = stage.clientWidth;
            height = stage.clientHeight;
            labelSizes = labels.map((label) => ({ width: label.offsetWidth, height: label.offsetHeight }));
            wake();
        });
        resize.observe(stage);
        labels.forEach((label) => resize.observe(label));

        const visibility = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            if (inView) wake();
            else stop();
        }, { threshold: 0.08 });
        visibility.observe(stage);

        const handleVisibility = () => {
            pageVisible = !document.hidden;
            if (pageVisible) wake();
            else stop();
        };
        document.addEventListener('visibilitychange', handleVisibility);
        wakeRef.current = wake;

        return () => {
            disposed = true;
            stop();
            resize.disconnect();
            visibility.disconnect();
            document.removeEventListener('visibilitychange', handleVisibility);
            wakeRef.current = () => undefined;
        };
    }, []);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
        const motion = motionRef.current;
        motion.pointerId = event.pointerId;
        motion.previousX = event.clientX;
        motion.previousY = event.clientY;
        motion.previousTime = event.timeStamp;
        motion.velocityYaw = 0;
        motion.velocityPitch = 0;
        motion.targetYaw = null;
        event.currentTarget.dataset.dragging = 'true';
        event.currentTarget.setPointerCapture(event.pointerId);
        if (event.pointerType === 'mouse') event.preventDefault();
        wakeRef.current();
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const motion = motionRef.current;
        if (motion.pointerId !== event.pointerId) return;
        const width = event.currentTarget.clientWidth || 430;
        const deltaYaw = ((event.clientX - motion.previousX) / width) * TAU * 0.9;
        const deltaPitch = ((event.clientY - motion.previousY) / width) * Math.PI * 0.8;
        const elapsed = Math.max((event.timeStamp - motion.previousTime) / 1000, 1 / 120);
        motion.yaw += deltaYaw;
        motion.pitch = clamp(motion.pitch - deltaPitch, -0.8, 0.8);
        motion.velocityYaw = clamp(deltaYaw / elapsed, -2.7, 2.7);
        motion.velocityPitch = clamp(-deltaPitch / elapsed, -1.2, 1.2);
        motion.previousX = event.clientX;
        motion.previousY = event.clientY;
        motion.previousTime = event.timeStamp;
        wakeRef.current();
    };

    const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
        const motion = motionRef.current;
        if (motion.pointerId !== event.pointerId) return;
        motion.pointerId = null;
        if (event.type !== 'pointerup' || event.timeStamp - motion.previousTime > 100 || motion.reduced || motion.paused) {
            motion.velocityYaw = 0;
            motion.velocityPitch = 0;
        }
        event.currentTarget.dataset.dragging = 'false';
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        wakeRef.current();
    };

    const rotate = (direction: number) => {
        const motion = motionRef.current;
        motion.velocityYaw = 0;
        motion.velocityPitch = 0;
        const destination = (motion.targetYaw ?? motion.yaw) + direction * Math.PI / 4;
        if (motion.reduced) motion.yaw = destination;
        else motion.targetYaw = destination;
        wakeRef.current();
    };

    return (
        <div className='orbital-scene'>
            <div
                ref={stageRef}
                className='orbital-scene__stage'
                aria-hidden='true'
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishPointer}
                onPointerCancel={finishPointer}
                onLostPointerCapture={finishPointer}
                onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') motionRef.current.hovering = true;
                }}
                onPointerLeave={(event) => {
                    if (event.pointerType === 'mouse') motionRef.current.hovering = false;
                    wakeRef.current();
                }}
            >
                <svg className='orbital-scene__drawing' viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} fill='none'>
                    <defs>
                        <radialGradient id={`${sceneId}-glow`}>
                            <stop stopColor='var(--accent)' stopOpacity='.1' />
                            <stop offset='1' stopColor='var(--accent)' stopOpacity='0' />
                        </radialGradient>
                        <radialGradient id={`${sceneId}-core`} cx='.3' cy='.25' r='.85'>
                            <stop stopColor='var(--accent)' stopOpacity='.1' />
                            <stop offset='.75' stopColor='var(--bg)' stopOpacity='.16' />
                            <stop offset='1' stopColor='var(--accent)' stopOpacity='.025' />
                        </radialGradient>
                        <linearGradient id={`${sceneId}-edge`} x1='0' y1='0' x2='1' y2='1'>
                            <stop stopColor='var(--accent)' stopOpacity='.5' />
                            <stop offset='1' stopColor='var(--accent)' stopOpacity='.08' />
                        </linearGradient>
                    </defs>
                    <circle cx={CENTER.x} cy={CENTER.y} r='194' fill={`url(#${sceneId}-glow)`} />
                    <circle cx={CENTER.x} cy={CENTER.y} r='123.8' fill={`url(#${sceneId}-core)`} stroke={`url(#${sceneId}-edge)`} strokeWidth='.8' />
                    <g className='orbital-scene__wire orbital-scene__wire--back'>
                        {initialLines.map((line) => <path key={line.id} data-wire-back d={line.back} />)}
                    </g>
                    <g className='orbital-scene__wire orbital-scene__wire--front'>
                        {initialLines.map((line) => <path key={line.id} data-wire-front d={line.front} className={line.id.includes('orbit') ? 'orbital-scene__ring' : undefined} />)}
                    </g>
                </svg>
                <div className='orbital-scene__labels'>
                    {technologies.map(({ name }) => (
                        <span key={name} className='orbital-scene__label' data-orbit-label>
                            <i />{name}
                        </span>
                    ))}
                </div>
            </div>
            <div className='orbital-scene__footer'>
                <p id={`${sceneId}-hint`}>Arrastra para girar</p>
                <div className='orbital-scene__controls' role='group' aria-label='Girar el planeta de tecnologías' aria-describedby={`${sceneId}-hint`}>
                    <button type='button' aria-label='Girar a la izquierda' title='Girar a la izquierda' onClick={() => rotate(-1)}>
                        <svg viewBox='0 0 20 20' fill='none' aria-hidden='true'><path d='m11.5 5-5 5 5 5' /></svg>
                    </button>
                    <button
                        type='button'
                        aria-label={reducedMotion ? 'Rotación automática desactivada por movimiento reducido' : paused ? 'Reanudar rotación automática' : 'Pausar rotación automática'}
                        title={reducedMotion ? 'Movimiento reducido' : paused ? 'Reanudar rotación' : 'Pausar rotación'}
                        aria-pressed={paused || reducedMotion}
                        disabled={reducedMotion}
                        onClick={() => setPaused((current) => !current)}
                    >
                        <svg viewBox='0 0 20 20' fill='none' aria-hidden='true'>
                            {paused || reducedMotion ? <path d='m7 5 7 5-7 5V5Z' /> : <path d='M7 5v10M13 5v10' />}
                        </svg>
                    </button>
                    <button type='button' aria-label='Girar a la derecha' title='Girar a la derecha' onClick={() => rotate(1)}>
                        <svg viewBox='0 0 20 20' fill='none' aria-hidden='true'><path d='m8.5 5 5 5-5 5' /></svg>
                    </button>
                </div>
            </div>
            <p className='orbital-scene__accessible-description'>Tecnologías del planeta: {technologyNames.join(', ')}. Usa los botones para girar o pausar la rotación.</p>
        </div>
    );
};
