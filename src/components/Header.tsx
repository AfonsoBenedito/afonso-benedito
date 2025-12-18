import { createPortal } from 'react-dom';
import { useScrollSpy } from '../hooks/useScrollSpy';
import Navigation from './Navigation';

interface NavItem {
    label: string;
    href: string;
}

const Header = () => {
    const { showName, activeSection } = useScrollSpy();

    const navItems: NavItem[] = [
        { label: 'About Me', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Education', href: '#education' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ];

    const headerContent = (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-1 py-3 md:px-12 lg:px-24 bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300">
            <a href="#" className="flex items-center gap-1 md:gap-2 group flex-shrink-0">
                <div className="relative w-6 h-6 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary-100 group-hover:border-primary-600 transition-colors">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/logo.png`}
                        alt="Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className={`font-heading font-bold text-xs md:text-xl tracking-tight text-primary-600 transition-all duration-300 transform ${showName ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                    Afonso Coelho
                </span>
            </a>
            <Navigation navItems={navItems} activeSection={activeSection} />
        </header>
    );

    return createPortal(headerContent, document.body);
};

export default Header;
