import { useState, useEffect } from 'react';

export const useScrollSpy = () => {
    const [showName, setShowName] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            // Check if we are at the bottom of the page
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
                setActiveSection('#contact');
                return;
            }

            // Check if welcome text is out of view
            const welcomeText = document.getElementById('welcome-text');
            if (welcomeText) {
                const rect = welcomeText.getBoundingClientRect();
                // If the bottom of the welcome text is above the top of the viewport (or close to it), show the name
                // Adding a small buffer (e.g., 50px) so it appears just as it leaves
                if (rect.bottom < 50) {
                    setShowName(true);
                } else {
                    setShowName(false);
                }
            } else {
                // Fallback if element not found
                const threshold = window.innerHeight * 0.3;
                setShowName(window.scrollY > threshold);
            }

            // Detect active section
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            // Check if we're still in hero section
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                const { offsetTop, offsetHeight } = heroSection;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActiveSection('');
                    return;
                }
            }

            // Check other sections
            const sections = ['about', 'experience', 'education', 'projects', 'contact'];
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(`#${sectionId}`);
                        return;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { showName, activeSection };
};
