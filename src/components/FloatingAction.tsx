import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import info from '../config/info.json';
import ArrowUpIcon from './icons/ArrowUpIcon';
import EmailIcon from './icons/EmailIcon';

interface Socials {
    email: string;
}

const FloatingAction = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { email } = info.socials as Socials;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.8) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        // Check initial scroll position
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const buttonContent = (
        <div className="fixed bottom-8 right-6 z-[60] pointer-events-none">
            <button
                onClick={() => {
                    if (showScrollTop) {
                        scrollToTop();
                    } else {
                        window.location.href = `mailto:${email}`;
                    }
                }}
                className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-200 hover:-translate-y-1 relative overflow-hidden pointer-events-auto"
                aria-label={showScrollTop ? "Scroll to top" : "Send Email"}
            >
                <ArrowUpIcon
                    className={`h-6 w-6 absolute transition-all duration-300 ease-in-out ${showScrollTop ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-0 -translate-y-2"}`}
                />
                <EmailIcon
                    className={`h-6 w-6 absolute transition-all duration-300 ease-in-out ${showScrollTop ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
                />
            </button>
        </div>
    );

    return createPortal(buttonContent, document.body);
};

export default FloatingAction;
