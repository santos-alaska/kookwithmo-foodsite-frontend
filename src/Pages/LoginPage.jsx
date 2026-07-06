

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '/bg-img.png';
import { useUserStore } from '../stores/useUserStore';

const FormInput = ({ label, name, type, placeholder, value, onChange }) => (
    <div>
        <label htmlFor={name} className="block font-sans text-sm text-stone-300 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white placeholder-stone-400 focus:ring-1 focus:ring-stone-200 focus:outline-none transition-shadow"
        />
    </div>
);

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login, loading } = useUserStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(formData.email, formData.password);

        const user = useUserStore.getState().user;
        if (user) {
            navigate('/');
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-black text-stone-200">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
            <div className="absolute inset-0 bg-black/90 z-10" />

            <main className="relative z-20 flex flex-col items-center justify-center min-h-screen py-10 px-4">
                <div className="w-full max-w-md bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-stone-800">
                    <header className="text-center mb-8">
                        <h1 className="font-display  text-2xl text md:text-4xl-stone-100 tracking-wider">
                            Login to Your Account
                        </h1>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput label="Email Address" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                        <FormInput label="Password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />

                        <button
                            type="submit"
                            className="w-full font-sans font-semibold text-black bg-stone-200 px-8 py-3 rounded-lg hover:bg-white transition-colors duration-300 disabled:bg-stone-400 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Login'}
                        </button>
                    </form>

                    <footer className="text-center mt-6">
                        <p className="font-sans text-sm text-stone-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-semibold text-stone-200 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;