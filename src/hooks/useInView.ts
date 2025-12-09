import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    keepVisibleOnScrollPast?: boolean;
}

export const useInView = (options: UseInViewOptions = {}): [RefObject<HTMLElement | null>, boolean] => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // If we only want to trigger once and it's already visible, do nothing.
        if (options.triggerOnce && isVisible) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;

                if (isIntersecting) {
                    setIsVisible(true);
                    if (options.triggerOnce && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else {
                    // If not intersecting
                    if (options.keepVisibleOnScrollPast) {
                        // If element is above the viewport (scrolled past down), keep it visible
                        if (entry.boundingClientRect.top < 0) {
                            return;
                        }
                    }

                    if (!options.triggerOnce) {
                        setIsVisible(false);
                    }
                }
            },
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options.threshold, options.rootMargin, options.triggerOnce, options.keepVisibleOnScrollPast, isVisible]);

    return [ref, isVisible];
};
