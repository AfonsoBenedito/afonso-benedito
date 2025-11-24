import React from 'react';

const Header = () => {
    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Work', href: '#projects' },
        { label: 'Contact', href: '#contact' }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-24 bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-100 group-hover:border-primary-600 transition-colors">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/logo.png`}
                        alt="Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="font-bold text-lg tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors">Afonso Benedito</span>
            </a>

            {/* Navigation */}
            <nav>
                <ul className="flex items-center space-x-6 md:space-x-8">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
