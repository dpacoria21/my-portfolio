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
            sceneRef.current?.style.setProperty('--orbit-x', `${-y * 8}deg`);
            sceneRef.current?.style.setProperty('--orbit-y', `${x * 10}deg`);
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
                <svg className='orbital-scene__drawing' viewBox='0 0 400 360' fill='none'>
                    <defs>
                        <linearGradient id={`${sceneId}-wire`} x1='105' y1='80' x2='310' y2='285' gradientUnits='userSpaceOnUse'>
                            <stop stopColor='#81b7ef' stopOpacity='.75' />
                            <stop offset='.55' stopColor='#81b7ef' stopOpacity='.35' />
                            <stop offset='1' stopColor='#42648a' stopOpacity='.2' />
                        </linearGradient>
                    </defs>

                    <ellipse cx='200' cy='180' rx='156' ry='69' transform='rotate(55 200 180)' stroke='#81b7ef' strokeWidth='.6' opacity='.17' />

                    <g transform='rotate(-23 200 180)' stroke={`url(#${sceneId}-wire)`} strokeWidth='.65'>
                        <circle cx='200' cy='180' r='108' />
                        <ellipse cx='200' cy='180' rx='35' ry='108' />
                        <ellipse cx='200' cy='180' rx='69' ry='108' />
                        <ellipse cx='200' cy='180' rx='96' ry='108' />
                        <ellipse cx='200' cy='180' rx='108' ry='31' />
                        <ellipse cx='200' cy='180' rx='108' ry='66' />
                        <ellipse cx='200' cy='180' rx='108' ry='94' />
                        <path d='M200 72v216M92 180h216' />
                    </g>

                    <g transform='rotate(-27 200 180)'>
                        <ellipse cx='200' cy='180' rx='176' ry='65' stroke='#81b7ef' strokeWidth='.7' opacity='.4' />
                        <circle className='orbital-scene__satellite' r='2.4' fill='#81b7ef' />
                    </g>
                </svg>
            </div>
        </div>
    );
};
