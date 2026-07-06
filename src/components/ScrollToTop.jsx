// src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // The useLocation hook returns the location object that represents the current URL.
    const { pathname } = useLocation();

    // This useEffect hook will run every time the pathname changes.
    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic part.
        // It scrolls the window to the top left corner of the page.
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional: Use "auto" or "smooth" for a scrolling animation.
        });
    }, [pathname]); // The effect dependency is the pathname.

    // This component does not render any visible content.
    // Its only purpose is to run the effect.
    return null;
};

export default ScrollToTop;