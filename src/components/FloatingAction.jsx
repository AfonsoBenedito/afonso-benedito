import { useState, useEffect } from 'react';
import info from '../data/info.json';

const FloatingAction = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { email } = info.socials;

    useEffect(() => {
        const handleScroll = () => {
            // Show scroll-to-top button after scrolling down 100vh (past Hero)
            if (window.scrollY > window.innerHeight * 0.8) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-8 right-6 z-40">
            {showScrollTop ? (
                <button
                    onClick={scrollToTop}
                    className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-200 hover:-translate-y-1"
                    aria-label="Scroll to top"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            ) : (
                <a
                    href={`mailto:${email}`}
                    className="block w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-200 hover:-translate-y-1"
                    aria-label="Send Email"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </a>
            )}
        </div>
    );
};

export default FloatingAction;
