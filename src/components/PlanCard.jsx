
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const PlanCard = ({ title, description, features, linkTo }) => {
    const { user, checkAuth, checkingAuth } = useUserStore();

    return (
        <div className=" w-full max-w-3xl border border-stone-200/20 rounded-[2rem] p-8 bg-black/20 backdrop-blur-sm flex flex-col items-center text-center gap-4">
            <h3 className="font-display text-3xl text-stone-100 tracking-wider uppercase">
                {title}
            </h3>
            <p className="font-sans text-stone-300">
                {description}
            </p>
            <div className="font-sans text-stone-400 text-sm">
                {features.map((feature, index) => (
                    <p key={index}>{feature}</p>
                ))}
            </div>
            <Link
                to={user ? linkTo : '/login'}
                className=" font-sans font-semibold text-black bg-stone-200 px-14 py-3 rounded-lg mt-4 hover:bg-white transition-colors duration-300">
                See More
            </Link>
        </div>
    );
};

export default PlanCard;