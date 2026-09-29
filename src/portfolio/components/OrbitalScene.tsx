import { useEffect, useId, useRef } from 'react';
import type { PointerEvent } from 'react';
import './OrbitalScene.css';

export const OrbitalScene = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef(0);
    const canInteractRef = useRef(false);
    const sceneId = useId().replace(/:/g, '');

    useEffect(() => {
        const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => {
            canInteractRef.current = pointerQuery.matches && !motionQuery.matches;

            if (!canInteractRef.current) {
                cancelAnimationFrame(frameRef.current);
                sceneRef.current?.style.setProperty('--orbit-x', '0deg');
                sceneRef.current?.style.setProperty('--orbit-y', '0deg');
            }
        };

        updatePreference();
        pointerQuery.addEventListener('change', updatePreference);
        motionQuery.addEventListener('change', updatePreference);

        return () => {
            cancelAnimationFrame(frameRef.current);
            pointerQuery.removeEventListener('change', updatePreference);
            motionQuery.removeEventListener('change', updatePreference);
        };
    }, []);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!canInteractRef.current) return;

        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
            sceneRef.current?.style.setProperty('--orbit-x', `${-y * 12}deg`);
            sceneRef.current?.style.setProperty('--orbit-y', `${x * 16}deg`);
        });
    };

    const handlePointerLeave = () => {
        cancelAnimationFrame(frameRef.current);
        sceneRef.current?.style.setProperty('--orbit-x', '0deg');
        sceneRef.current?.style.setProperty('--orbit-y', '0deg');
    };

    return (
        <div
            ref={sceneRef}
            className='orbital-scene'
            aria-hidden='true'
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <div className='orbital-scene__stage'>
                <svg className='orbital-scene__drawing' viewBox='0 0 560 480' fill='none'>
                    <defs>
                        <radialGradient id={`${sceneId}-atmosphere`}>
                            <stop stopColor='#d5f279' stopOpacity='.14' />
                            <stop offset='.48' stopColor='#a1c74c' stopOpacity='.06' />
                            <stop offset='1' stopColor='#d5f279' stopOpacity='0' />
                        </radialGradient>
                        <radialGradient id={`${sceneId}-core`} cx='.34' cy='.3' r='.8'>
                            <stop stopColor='#dceab3' stopOpacity='.25' />
                            <stop offset='.42' stopColor='#a1ba62' stopOpacity='.08' />
                            <stop offset='1' stopColor='#151b14' stopOpacity='.8' />
                        </radialGradient>
                        <linearGradient id={`${sceneId}-wire`} x1='170' y1='110' x2='390' y2='350' gradientUnits='userSpaceOnUse'>
                            <stop stopColor='#f0f7d9' stopOpacity='.85' />
                            <stop offset='.5' stopColor='#d5f279' stopOpacity='.48' />
                            <stop offset='1' stopColor='#7c9857' stopOpacity='.16' />
                        </linearGradient>
                        <linearGradient id={`${sceneId}-ring`} x1='70' y1='100' x2='455' y2='360' gradientUnits='userSpaceOnUse'>
                            <stop stopColor='#d5f279' stopOpacity='.12' />
                            <stop offset='.48' stopColor='#d5f279' stopOpacity='.8' />
                            <stop offset='1' stopColor='#ecf4d7' stopOpacity='.22' />
                        </linearGradient>
                    </defs>

                    <ellipse cx='280' cy='238' rx='258' ry='226' fill={`url(#${sceneId}-atmosphere)`} />

                    <g className='orbital-scene__guides' stroke='#d9e5c7' strokeWidth='.6'>
                        <circle cx='280' cy='238' r='201' strokeDasharray='2 9' opacity='.2' />
                        <path d='M280 23v26M267 36h26M280 427v26M267 440h26M65 238h26M78 225v26M469 238h26M482 225v26' opacity='.25' />
                        <path d='M116 75h-8v8M444 75h8v8M116 401h-8v-8M444 401h8v-8' opacity='.35' />
                    </g>

                    <g className='orbital-scene__outer-orbits' stroke={`url(#${sceneId}-ring)`}>
                        <ellipse cx='280' cy='238' rx='216' ry='79' transform='rotate(-29 280 238)' strokeWidth='1.3' />
                        <ellipse cx='280' cy='238' rx='210' ry='71' transform='rotate(-29 280 238)' strokeWidth='.5' opacity='.55' />
                        <ellipse cx='280' cy='238' rx='191' ry='73' transform='rotate(55 280 238)' strokeWidth='.9' />
                        <ellipse cx='280' cy='238' rx='176' ry='103' transform='rotate(109 280 238)' strokeWidth='.6' opacity='.5' />
                    </g>

                    <g className='orbital-scene__globe' transform='rotate(-24 280 238)'>
                        <circle cx='280' cy='238' r='117' fill={`url(#${sceneId}-core)`} />
                        <g stroke={`url(#${sceneId}-wire)`} strokeWidth='.75'>
                            <circle cx='280' cy='238' r='117' />
                            <ellipse cx='280' cy='238' rx='29' ry='117' />
                            <ellipse cx='280' cy='238' rx='59' ry='117' />
                            <ellipse cx='280' cy='238' rx='87' ry='117' />
                            <ellipse cx='280' cy='238' rx='108' ry='117' />
                            <ellipse cx='280' cy='238' rx='117' ry='25' />
                            <ellipse cx='280' cy='238' rx='117' ry='58' />
                            <ellipse cx='280' cy='238' rx='117' ry='91' />
                            <path d='M280 121v234M163 238h234' />
                        </g>
                        <path d='M168 203a117 117 0 0 1 123-81' stroke='#eef7d4' strokeWidth='1.7' strokeLinecap='round' opacity='.8' />
                    </g>

                    <g transform='rotate(-29 280 238)'>
                        <path d='M64 238a216 79 0 0 0 432 0' stroke={`url(#${sceneId}-ring)`} strokeWidth='1.3' />
                        <circle cx='464' cy='280' r='4.5' fill='#d5f279' />
                        <circle cx='464' cy='280' r='9' stroke='#d5f279' strokeOpacity='.22' />
                    </g>

                    <g className='orbital-scene__satellite'>
                        <circle cx='280' cy='55' r='4' fill='#e9f5c8' />
                        <circle cx='280' cy='55' r='10' stroke='#d5f279' strokeOpacity='.18' />
                    </g>
                    <g className='orbital-scene__satellite orbital-scene__satellite--slow'>
                        <circle cx='280' cy='413' r='2.5' fill='#d5f279' />
                    </g>

                    <g className='orbital-scene__label orbital-scene__label--react'>
                        <path d='M392 101h-27l-25 28' stroke='#d5f279' strokeOpacity='.35' strokeWidth='.75' />
                        <rect x='391' y='85' width='90' height='32' rx='16' />
                        <circle cx='408' cy='101' r='3' fill='#d5f279' />
                        <text x='420' y='105'>React</text>
                    </g>
                    <g className='orbital-scene__label orbital-scene__label--typescript'>
                        <path d='M154 359h24l25-32' stroke='#d5f279' strokeOpacity='.35' strokeWidth='.75' />
                        <rect x='43' y='343' width='113' height='32' rx='16' />
                        <circle cx='60' cy='359' r='3' fill='#d5f279' />
                        <text x='72' y='363'>TypeScript</text>
                    </g>
                    <g className='orbital-scene__label orbital-scene__label--node'>
                        <path d='M423 318h-24l-18-17' stroke='#d5f279' strokeOpacity='.35' strokeWidth='.75' />
                        <rect x='422' y='302' width='95' height='32' rx='16' />
                        <circle cx='439' cy='318' r='3' fill='#d5f279' />
                        <text x='451' y='322'>Node.js</text>
                    </g>
                </svg>
            </div>
        </div>
    );
};
