import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const MenuCategoryCard = ({ imageSrc, title, description, buttonText, imagePosition = 'left', slug }) => {
    const containerClasses = `
    flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16
    w-full max-w-5xl
    ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}
  `;

    const textAlignClasses = `
    flex flex-col items-center md:items-start text-center md:text-left
    ${imagePosition === 'right' ? 'md:items-end md:text-right' : ''}
  `;

    const { user, checkAuth, checkingAuth } = useUserStore();


    return (
        <div className="w-full max-w-3xl border border-stone-200/20 rounded-[2rem] p-8 bg-black/20 backdrop-blur-sm">
            <div className={containerClasses}>
                <div className="flex-shrink-0">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover"
                    />
                </div>
                <div className={textAlignClasses}>
                    <h3 className="font-display text-3xl text-stone-100 tracking-widest uppercase">
                        {title}
                    </h3>
                    <p className="font-sans text-stone-300 mt-2 max-w-md">
                        {description}
                    </p>
                    <Link
                        to={user ? `/full-menu#${slug}` : '/login'}
                        className="font-sans font-semibold text-black bg-stone-200 px-8 py-3 rounded-lg mt-6 hover:bg-white transition-colors duration-300">
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuCategoryCard;