import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { FiMenu, FiX, FiCalendar, FiSettings } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useUserStore();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
        navigate('/login');
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="absolute top-0 left-0 w-full py-6 px-4 sm:px-12 z-50">
            <nav className="relative flex justify-between items-center">
                <Link to="/">
                    <div>
                        <img src="/logo.png" alt="logo" className='w-52 absolute -top-22 -left-5 md:left-0' />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-x-6">
                    {/* Main Nav Links */}
                    <div className="flex items-center gap-x-6 font-sans text-lg text-stone-200">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/menu" className="hover:text-white transition-colors">Menu</Link>
                        <Link to="/meal-plan" className="hover:text-white transition-colors">Meal Plan</Link>
                        {user && <Link to="/order" className="hover:text-white transition-colors">Place Order</Link>}
                    </div>

                    {/* User-specific links (My Plan & Admin) */}
                    {user && (
                        <>
                            <div className="w-[1px] h-6 bg-stone-200/30"></div>
                            <div className="flex items-center gap-x-4">
                                <Link 
                                    to="/my-plan" 
                                    className="flex items-center gap-x-2 text-lg text-white font-medium"
                                >
                                    {/* <FiCalendar className="text-base" /> */}
                                    My Plan
                                </Link>
                                {user.role === 'admin' && (
                                    <Link 
                                        to="/admin" 
                                        className="flex items-center gap-x-2 bg-stone-800/60 border border-stone-600/50 text-stone-200 hover:bg-stone-700/60 hover:text-white transition-all px-3 py-1.5 rounded-lg text-sm font-medium"
                                    >
                                        <FiSettings className="text-sm" />
                                        Admin
                                    </Link>
                                )}
                            </div>
                        </>
                    )}

                    <div className="w-[1px] h-6 bg-stone-200/30"></div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-x-4 font-sans text-stone-200">
                        {user ? (
                            <>
                                <span className="text-lg">Hi, {user.name.split(' ')[0]}!</span>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-600/80 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-white transition-colors text-lg">Login</Link>
                                <Link to="/signup" className="bg-stone-200 text-black font-semibold px-5 py-2 rounded-lg hover:bg-white transition-colors">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-200 text-3xl">
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#060a09]/95 backdrop-blur-md shadow-xl border-t border-stone-800/50">
                    <div className="flex flex-col items-center gap-y-5 py-8 font-sans text-lg text-stone-200">
                        {/* Main Links */}
                        <Link to="/" onClick={handleLinkClick} className="hover:text-white transition-colors">Home</Link>
                        <Link to="/menu" onClick={handleLinkClick} className="hover:text-white transition-colors">Menu</Link>
                        <Link to="/meal-plan" onClick={handleLinkClick} className="hover:text-white transition-colors">Meal Plan</Link>
                        {user && <Link to="/order" onClick={handleLinkClick} className="hover:text-white transition-colors">Place Order</Link>}

                        {/* User-specific Section */}
                        {user && (
                            <>
                                <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-stone-600 to-transparent my-2"></div>
                                <Link 
                                    to="/my-plan" 
                                    onClick={handleLinkClick} 
                                    className="flex items-center gap-x-2 text-white font-medium"
                                >
                                    {/* <FiCalendar /> */}
                                    My Plan
                                </Link>
                                {user.role === 'admin' && (
                                    <Link 
                                        to="/admin" 
                                        onClick={handleLinkClick} 
                                        className="flex items-center gap-x-2 bg-stone-800/80 border border-stone-600/50 text-stone-200 px-4 py-2 rounded-lg font-medium"
                                    >
                                        <FiSettings />
                                        Admin Panel
                                    </Link>
                                )}
                            </>
                        )}

                        <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-stone-600 to-transparent my-2"></div>

                        {/* Auth Section */}
                        {user ? (
                            <div className="flex flex-col items-center gap-y-4">
                                <span className="text-stone-400">Hi, <span className="text-white font-medium">{user.name.split(' ')[0]}</span>!</span>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-600/80 text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-y-4 w-full px-8">
                                <Link to="/login" onClick={handleLinkClick} className="w-full text-center hover:text-white transition-colors">Login</Link>
                                <Link to="/signup" onClick={handleLinkClick} className="w-full text-center bg-stone-200 text-black font-semibold py-2.5 rounded-lg hover:bg-white transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;