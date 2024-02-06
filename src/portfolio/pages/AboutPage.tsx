import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import './AboutPage.css';
import { experiences } from '../data/experiences';
import {motion} from 'framer-motion';
import { useEffect } from 'react';

export const AboutPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section>
            {/* <p>Saludos bebita wax</p> */}
            <VerticalTimeline
                className='vertical-timeline'
                lineColor = {'var(--background-secondary-color)'}
            >
                {
                    experiences.map(({title, icon, subtitle = '', content, date, color = 'var(--background-primary-color)', link = '', secondColor = 'var(--background-secondary-color)'}, i) => (
                        <VerticalTimelineElement
                            key={title+i}
                            className="vertical-timeline-element--education"
                            contentStyle={{ background: 'var(--background-secondary-color)', color: 'var(--text-color)'}}
                            contentArrowStyle={{ borderRight: '7px solid  var(--background-secondary-color)' }}
                            date={date}
                            iconStyle={{
                                background: color,
                                color: '#000',
                                boxShadow: `0 0 0 4px ${secondColor}, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)`
                            }}
                            iconClassName='timeline__icon'
                            icon={icon}
                        >
                            <h3 className="vertical-timeline-element-title">{title}</h3>
                            <h4 className="vertical-timeline-element-subtitle" style={{marginTop: '13px'}}>{subtitle}</h4>
                            <p>
                                {content}
                            </p>
                            <div className='certificate__container'>
                                {
                                    !link ? ''
                                        :
                                        (<a href={link} target='_blank' rel="noreferrer" className='certificate'>
                                            <motion.svg whileHover={{rotate: [0, 360]}} transition={{duration: 0.7, type: 'spring'}}  xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill='var(--text-color)' viewBox="0 0 256 256"><path d="M232 88.86V56a16 16 0 0 0-16-16H40a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h112v24a8 8 0 0 0 11.58 7.16L192 216.94l28.42 14.22A8 8 0 0 0 232 224v-56.86a55.87 55.87 0 0 0 0-78.28M128 144H72a8 8 0 0 1 0-16h56a8 8 0 0 1 0 16m0-32H72a8 8 0 0 1 0-16h56a8 8 0 0 1 0 16m88 99.06l-20.42-10.22a8 8 0 0 0-7.16 0L168 211.06v-32.47a55.94 55.94 0 0 0 48 0ZM192 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40"/></motion.svg>
                                        </a>)
                                }
                            </div>
                        </VerticalTimelineElement>
                    ))
                }
                
                <VerticalTimelineElement
                    contentStyle={{color: 'var(--text-color)'}}
                    iconStyle={{ 
                        background: 'var(--background-primary-color)',
                        color: '#fff',
                        boxShadow: '0 0 0 4px var(--background-secondary-color), inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)'
                    }}
                    date='Proximamente 2024 ...'
                />
                
            </VerticalTimeline>
            {/* <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <ButtonDownload />
            </div> */}
        </section>
    );
};

export default AboutPage;