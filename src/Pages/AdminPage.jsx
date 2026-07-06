// import React, { useEffect, useState } from 'react';
// import axios from '../lib/axios';
// import { toast } from "react-hot-toast";


// const AdminPage = () => {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const res = await axios.get("/users");
//                 setUsers(res.data);
//             } catch (error) {
//                 toast.error(
//                     error?.response?.data?.message || "Failed to load users"
//                 );
//                 console.error("Fetch users error:", error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     // const handleActivate = async (userId) => {
//     //     // In a real app, this would be a form/modal
//     //     const planType = prompt("Enter Plan Type (e.g., weight-loss):");
//     //     const planName = prompt("Enter Plan Name (e.g., Premium Plan):");
//     //     const durationInDays = prompt("Enter duration in days (e.g., 30 for monthly):");

//     //     if (!planType || !planName || !durationInDays) return;

//     //     await fetch(`/api/users/${userId}/activate-plan`, {
//     //         method: 'POST',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify({ planType, planName, durationInDays }),
//     //     });

//     //     alert(`Plan activated for user ${userId}!`);
//     // };


//     const handleActivate = async (userId) => {
//         const planType = prompt("Enter Plan Type (e.g., weight-loss):");
//         const planName = prompt("Enter Plan Name (e.g., Premium Plan):");
//         const durationInDays = prompt("Enter duration in days (e.g., 30 for monthly):");

//         if (!planType || !planName || !durationInDays) return;

//         try {
//             const res = await axios.post(`/users/${userId}/activate-plan`, {
//                 planType,
//                 planName,
//                 durationInDays,
//             });

//             toast.success(res.data.message || `Plan activated for user ${userId}!`);
//         } catch (error) {
//             toast.error(
//                 error?.response?.data?.message || "Failed to activate plan"
//             );
//             console.error("Activate plan error:", error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
//             <h1 className="text-3xl font-bold mb-6">Admin Panel - User Management</h1>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-gray-800">
//                     <thead>
//                         <tr>
//                             <th className="p-3">Name</th>
//                             <th className="p-3">Email</th>
//                             <th className="p-3">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user._id} className="border-t border-gray-700">
//                                 <td className="p-3">{user.name}</td>
//                                 <td className="p-3">{user.email}</td>
//                                 <td className="p-3">
//                                     {/* <button onClick={() => handleActivate(user._id)} className="bg-green-600 px-3 py-1 rounded">
//                                         Activate Plan
//                                     </button> */}
//                                         {user.activeMealPlan?.planType && new Date(user.activeMealPlan.endDate) > new Date() ? (
//                                         <span className="bg-gray-600 text-gray-300 px-4 py-2 rounded-lg font-medium inline-block cursor-default">
//                                             Activated
//                                         </span>
//                                     ) : (
//                                         <button 
//                                             onClick={() => handleActivate(user._id)} 
//                                             className="bg-green-600 hover:bg-green-500 transition-colors px-4 py-2 rounded-lg font-medium"
//                                         >
//                                             Activate Plan
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminPage;



import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { toast } from "react-hot-toast";
import { FiX } from 'react-icons/fi';

const PLAN_TYPES = [
    { value: 'weight-loss', label: 'Weight Loss Sculpt Plan' },
    { value: 'weight-gain', label: 'Weight Gain + Lean Bulk Plan' },
    { value: 'gut-health', label: 'Gut Health / Gut Friendly Plan' },
    { value: 'anti-inflammatory', label: 'Anti-Inflammatory Wellness Plan' },
];

const DURATION_OPTIONS = [
    { value: 7, label: '1 Week (7 days)' },
    { value: 14, label: '2 Weeks (14 days)' },
    { value: 30, label: '1 Month (30 days)' },
    { value: 60, label: '2 Months (60 days)' },
    { value: 90, label: '3 Months (90 days)' },
    { value: 180, label: '6 Months (180 days)' },
    { value: 365, label: '1 Year (365 days)' },
];

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        planType: '',
        planName: '',
        durationInDays: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/users");
                setUsers(res.data);
            } catch (error) {
                toast.error(
                    error?.response?.data?.message || "Failed to load users"
                );
                console.error("Fetch users error:", error);
            }
        };

        fetchUsers();
    }, []);

    const openModal = (user) => {
        setSelectedUser(user);
        setFormData({ planType: '', planName: '', durationInDays: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setFormData({ planType: '', planName: '', durationInDays: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.planType || !formData.planName || !formData.durationInDays) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post(`/users/${selectedUser._id}/activate-plan`, {
                planType: formData.planType,
                planName: formData.planName,
                durationInDays: formData.durationInDays,
            });

            toast.success(`Plan activated for ${selectedUser.name}!`);
            closeModal();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to activate plan"
            );
            console.error("Activate plan error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
            <h1 className="text-3xl font-bold mb-6">Admin Panel - User Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-750">
                                <td className="p-4">{user.name}</td>
                                <td className="p-4 text-gray-300">{user.email}</td>
                                <td className="p-4 text-center">
                                    {user.activeMealPlan?.planType && new Date(user.activeMealPlan.endDate) > new Date() ? (
                                        <span className="bg-gray-600 text-gray-300 px-4 py-2 rounded-lg font-medium inline-block cursor-default">
                                            Activated
                                        </span>
                                    ) : (
                                        <button 
                                            onClick={() => openModal(user)} 
                                            className="bg-green-600 hover:bg-green-500 transition-colors px-4 py-2 rounded-lg font-medium"
                                        >
                                            Activate Plan
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-700">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold">Activate Meal Plan</h2>
                                <p className="text-gray-400 text-sm mt-1">
                                    For: <span className="text-white font-medium">{selectedUser?.name}</span>
                                </p>
                            </div>
                            <button 
                                onClick={closeModal}
                                className="text-gray-400 hover:text-white transition-colors p-1"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Plan Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Plan Type
                                </label>
                                <select
                                    name="planType"
                                    value={formData.planType}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select a plan type</option>
                                    {PLAN_TYPES.map(plan => (
                                        <option key={plan.value} value={plan.value}>
                                            {plan.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Plan Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Plan Name
                                </label>
                                <input
                                    type="text"
                                    name="planName"
                                    value={formData.planName}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Premium Plan, Elite Plan"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Duration
                                </label>
                                <select
                                    name="durationInDays"
                                    value={formData.durationInDays}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select duration</option>
                                    {DURATION_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    {isSubmitting ? 'Activating...' : 'Activate Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;