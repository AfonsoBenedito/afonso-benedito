import { useEffect, useState } from 'react';
import info from '../config/info.json';
import HeroBackground from './HeroBackground';

interface PersonalInfo {
    name: string;
    image: string;
    title: string;
}

const landscape = () => window.matchMedia('(orientation: landscape)').matches;

const Hero = () => {
    const { name, image, title } = info.personal_info as PersonalInfo;
    const [isLandscape, setIsLandscape] = useState(landscape);

    useEffect(() => {
        const mq = window.matchMedia('(orientation: landscape)');
        const handler = (e: MediaQueryListEvent) => setIsLandscape(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return (
        <section id="hero" className="min-h-[40vh] md:min-h-[75vh] flex flex-col items-center justify-start pt-10 md:pt-20 relative">
            {isLandscape && (
                <>
                    <HeroBackground />
                    {/* Soft fade at the top */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-24 pointer-events-none z-[1]"
                        style={{ background: 'linear-gradient(to top, transparent, rgba(248,250,252,0.6))' }}
                    />
                    {/* Stronger fade at the bottom */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-[1]"
                        style={{ background: 'linear-gradient(to bottom, transparent, #f8fafc)' }}
                    />
                </>
            )}
            <div className="text-center z-10">
                <h1 id="welcome-text" className="text-4xl md:text-6xl font-light text-gray-900 mb-4 font-handwriting">
                    Welcome, I'm <span className="font-normal text-primary-600">{name.split(' ')[0]}</span>
                </h1>

                <p className="text-lg md:text-xl font-heading font-medium text-gray-600 mb-12 tracking-wide">
                    {title}
                </p>

                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto relative ring-4 ring-primary-100">
                    <img
                        src={image.startsWith('http') ? image : `${import.meta.env.BASE_URL}${image}`}
                        alt={name}
                        className="w-full h-full object-cover brightness-75"
                    />
                </div>
            </div>

        </section>
    );
};

export default Hero;
