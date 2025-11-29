interface NavItem {
    label: string;
    href: string;
}

interface NavigationProps {
    navItems: NavItem[];
    activeSection: string;
}

const Navigation = ({ navItems, activeSection }: NavigationProps) => {
    return (
        <nav>
            <ul className="flex items-center gap-1 sm:gap-4 md:gap-8">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.href}
                            className="text-[10px] sm:text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors relative group whitespace-nowrap"
                        >
                            <span className={item.label === 'About Me' ? 'hidden sm:inline' : ''}>
                                {item.label}
                            </span>
                            <span className={item.label === 'About Me' ? 'sm:hidden' : 'hidden'}>
                                About
                            </span>
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-600 transition-all duration-500 ${activeSection === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
