// // src/pages/SignupPage.jsx

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import bg from '../../src/assets/bg-img.png';

// // Reusable Input Component for consistent styling
// const FormInput = ({ label, name, type, placeholder, value, onChange }) => (
//     <div>
//         <label htmlFor={name} className="block font-sans text-sm text-stone-300 mb-1">
//             {label}
//         </label>
//         <input
//             type={type}
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             value={value}
//             onChange={onChange}
//             required
//             className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white placeholder-stone-400 focus:ring-1 focus:ring-stone-200 focus:outline-none transition-shadow"
//         />
//     </div>
// );

// const SignupPage = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }
//         // In a real app, you would send this data to your backend for registration
//         console.log('Signup data:', formData);
//         alert('Account created successfully! (See console for data)');
//         navigate('/login'); // Redirect to login page after successful signup
//     };

//     return (
//         <div className="relative min-h-screen w-full bg-black text-stone-200">
//             <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
//             <div className="absolute inset-0 bg-black/90 z-10" />

//             <main className="relative z-20 flex flex-col items-center justify-center min-h-screen py-10 px-4">
//                 <div className="w-full max-w-md bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-stone-800">
//                     <header className="text-center mb-8">
//                         <h1 className="font-display text-4xl text-stone-100 tracking-wider">
//                             Create an Account
//                         </h1>
//                     </header>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <FormInput label="Full Name" name="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} />
//                         <FormInput label="Email Address" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
//                         <FormInput label="Password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
//                         <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />

//                         <button type="submit" className="w-full font-sans font-semibold text-black bg-stone-200 px-8 py-3 rounded-lg hover:bg-white transition-colors duration-300">
//                             Sign Up
//                         </button>
//                     </form>

//                     <footer className="text-center mt-6">
//                         <p className="font-sans text-sm text-stone-400">
//                             Already have an account?{' '}
//                             <Link to="/login" className="font-semibold text-stone-200 hover:underline">
//                                 Login
//                             </Link>
//                         </p>
//                     </footer>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default SignupPage;


// src/pages/SignupPage.jsx

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

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (formData.password !== formData.confirmPassword) {
    //         alert("Passwords do not match!");
    //         return;
    //     }

    //     setLoading(true); // Start loading

    //     try {
    //         // Prepare the data for the backend (it expects 'name', not 'fullName')
    //         const requestBody = {
    //             name: formData.name,
    //             email: formData.email,
    //             password: formData.password,
    //         };

    //         // Send the request to the backend
    //         const res = await fetch("/api/auth/signup", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(requestBody),
    //         });

    //         const data = await res.json();

    //         // Handle potential errors from the backend
    //         if (data.error) {
    //             throw new Error(data.error);
    //         }

    //         // Handle success
    //         alert('Account created successfully!');
    //         navigate('/login'); // Redirect to login page

    //     } catch (error) {
    //         // Show any error to the user
    //         alert(error.message);
    //     } finally {
    //         setLoading(false); // Stop loading, whether it succeeded or failed
    //     }
    // };

    const { signup, loading } = useUserStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        signup(formData);
    };

    return (
        <div className="relative min-h-screen w-full bg-black text-stone-200">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
            <div className="absolute inset-0 bg-black/90 z-10" />

            <main className="relative z-20 flex flex-col items-center justify-center min-h-screen py-10 px-4 pt-32">
                <div className="w-full max-w-md bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-stone-800">
                    <header className="text-center mb-8">
                        <h1 className="font-display text-2xl md:text-4xl text-stone-100 tracking-wider">
                            Create an Account
                        </h1>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput label="Full Name" name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                        <FormInput label="Email Address" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                        <FormInput label="Password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                        <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />

                        <button
                            type="submit"
                            className="w-full font-sans font-semibold text-black bg-stone-200 px-8 py-3 rounded-lg hover:bg-white transition-colors duration-300 disabled:bg-stone-400 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <footer className="text-center mt-6">
                        <p className="font-sans text-sm text-stone-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-stone-200 hover:underline">
                                Login
                            </Link>
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default SignupPage;