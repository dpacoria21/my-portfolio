import { KeyboardEvent, MouseEvent, useEffect, useId, useMemo, useRef, useState } from 'react';
import './CommandPalette.css';

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    href: string;
    external?: boolean;
}

interface CommandPaletteProps {
    open: boolean;
    onClose: () => void;
    items: CommandItem[];
}

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');

const isSafeHref = (href: string) => {
    if (href.startsWith('#')) return true;
    try {
        if (href.startsWith('/') && !href.startsWith('//') && !href.includes('\\')) {
            return new URL(href, 'https://portfolio.local').origin === 'https://portfolio.local';
        }
        return href.startsWith('https://') && new URL(href).protocol === 'https:';
    } catch {
        return false;
    }
};

export function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLUListElement>(null);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const id = useId();
    const resultsId = `${id}-results`;
    const filteredItems = useMemo(() => {
        const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
        return items.filter(item => {
            const searchable = normalize(`${item.label} ${item.description ?? ''}`);
            return isSafeHref(item.href) && terms.every(term => searchable.includes(term));
        });
    }, [items, query]);
    const selectedIndex = Math.min(activeIndex, Math.max(0, filteredItems.length - 1));

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (!open) {
            if (dialog.open) dialog.close();
            return;
        }
        if (!dialog.open) dialog.showModal();
        inputRef.current?.focus();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    useEffect(() => {
        if (open) {
            resultsRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
        }
    }, [open, selectedIndex, filteredItems]);

    const close = () => dialogRef.current?.close();

    const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            close();
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.altKey || event.ctrlKey || event.metaKey || filteredItems.length === 0) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const direction = event.key === 'ArrowDown' ? 1 : -1;
            setActiveIndex((selectedIndex + direction + filteredItems.length) % filteredItems.length);
            inputRef.current?.focus();
        }
        if (event.key === 'Enter' && event.target === inputRef.current && !event.nativeEvent.isComposing) {
            event.preventDefault();
            resultsRef.current?.querySelector<HTMLAnchorElement>('[aria-selected="true"]')?.click();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className='command-dialog'
            aria-labelledby={`${id}-title`}
            onClick={handleBackdrop}
            onClose={() => {
                setQuery('');
                setActiveIndex(0);
                if (open) onClose();
            }}
        >
            <header className='command-header'>
                <h2 id={`${id}-title`}>Explora el portafolio</h2>
                <button type='button' className='command-close' onClick={close} aria-label='Cerrar búsqueda'>
                    <span aria-hidden='true'>×</span>
                </button>
            </header>
            <div onKeyDown={handleKeyDown}>
                <div className='command-search'>
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' aria-hidden='true'>
                        <circle cx='10.5' cy='10.5' r='6.5' />
                        <path d='m16 16 4 4' />
                    </svg>
                    <label className='command-sr-only' htmlFor={`${id}-search`}>Buscar una sección, proyecto o enlace</label>
                    <input
                        ref={inputRef}
                        id={`${id}-search`}
                        type='search'
                        role='combobox'
                        aria-autocomplete='list'
                        aria-expanded={open}
                        aria-controls={resultsId}
                        aria-activedescendant={filteredItems.length > 0 ? `${id}-option-${selectedIndex}` : undefined}
                        placeholder='¿Qué te gustaría explorar?'
                        autoComplete='off'
                        spellCheck={false}
                        value={query}
                        onChange={event => { setQuery(event.target.value); setActiveIndex(0); }}
                    />
                    <kbd className='command-escape' aria-hidden='true'>esc</kbd>
                </div>
                <p className='command-results-label'>{query.trim() ? 'Resultados de búsqueda' : 'Accesos directos'}</p>
                <ul ref={resultsRef} id={resultsId} className='command-results' role='listbox' aria-label='Accesos del portafolio'>
                    {filteredItems.map((item, index) => (
                        <li key={item.id} role='presentation'>
                            <a
                                id={`${id}-option-${index}`}
                                className='command-result'
                                role='option'
                                aria-selected={index === selectedIndex}
                                href={item.href}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noopener noreferrer' : undefined}
                                tabIndex={index === selectedIndex ? 0 : -1}
                                onPointerMove={() => setActiveIndex(index)}
                                onFocus={() => setActiveIndex(index)}
                                onClick={close}
                            >
                                <span className='command-result-index' aria-hidden='true'>{String(index + 1).padStart(2, '0')}</span>
                                <span className='command-result-copy'>
                                    <span className='command-result-title'>{item.label}</span>
                                    {item.description && <span className='command-result-description'>{item.description}</span>}
                                </span>
                                <span className='command-result-arrow' aria-hidden='true'>{item.external ? '↗' : '↵'}</span>
                                {item.external && <span className='command-sr-only'>Se abre en una pestaña nueva</span>}
                            </a>
                        </li>
                    ))}
                </ul>
                {filteredItems.length === 0 && (
                    <div className='command-empty' role='status'>
                        <span>No encontré coincidencias.</span>
                        <p>Prueba con «proyectos», «experiencia» o «CV».</p>
                    </div>
                )}
            </div>
            <footer className='command-footer'>
                <span><kbd>↑</kbd><kbd>↓</kbd> para explorar</span>
                <span><kbd>↵</kbd> para abrir</span>
                <span className='command-footer-note'>Sigue tu curiosidad.</span>
            </footer>
        </dialog>
    );
}
