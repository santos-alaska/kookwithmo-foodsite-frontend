import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { toast } from "react-hot-toast";
import { FiX, FiEdit2, FiDollarSign, FiUsers, FiShoppingBag } from 'react-icons/fi';

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
    const [activeTab, setActiveTab] = useState('users');

    // ── Users state ──
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ planType: '', planName: '', durationInDays: '' });

    // ── Products / Price state ──
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [priceModal, setPriceModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const [isSavingPrice, setIsSavingPrice] = useState(false);

    // ── Fetch users ──
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("/users");
                setUsers(res.data);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Failed to load users");
            }
        };
        fetchUsers();
    }, []);

    // ── Fetch products when tab switches ──
    useEffect(() => {
        if (activeTab !== 'products') return;
        const fetchProducts = async () => {
            setLoadingProducts(true);
            try {
                const res = await axios.get("/products");
                setProducts(res.data.products || []);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Failed to load products");
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();
    }, [activeTab]);

    // ── Plan modal ──
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
            await axios.post(`/users/${selectedUser._id}/activate-plan`, {
                planType: formData.planType,
                planName: formData.planName,
                durationInDays: formData.durationInDays,
            });
            toast.success(`Plan activated for ${selectedUser.name}!`);
            closeModal();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to activate plan");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Price modal ──
    const openPriceModal = (product) => {
        setSelectedProduct(product);
        setNewPrice(product.price ?? '');
        setPriceModal(true);
    };
    const closePriceModal = () => {
        setPriceModal(false);
        setSelectedProduct(null);
        setNewPrice('');
    };
    const handleSavePrice = async (e) => {
        e.preventDefault();
        if (newPrice === '' || isNaN(newPrice) || Number(newPrice) < 0) {
            toast.error("Please enter a valid price");
            return;
        }
        setIsSavingPrice(true);
        try {
            const res = await axios.put(`/products/${selectedProduct._id}/price`, { price: Number(newPrice) });
            toast.success(`Price updated for "${selectedProduct.name}"!`);
            // Update local list
            setProducts(prev => prev.map(p =>
                p._id === selectedProduct._id ? { ...p, price: Number(newPrice) } : p
            ));
            closePriceModal();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update price");
        } finally {
            setIsSavingPrice(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-gray-400 mb-8">Manage users and food prices</p>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                        activeTab === 'users'
                            ? 'bg-gray-800 text-green-400 border-b-2 border-green-400'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <FiUsers size={16} /> User Management
                </button>
                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                        activeTab === 'products'
                            ? 'bg-gray-800 text-green-400 border-b-2 border-green-400'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <FiShoppingBag size={16} /> Manage Prices
                </button>
            </div>

            {/* ── Users Tab ── */}
            {activeTab === 'users' && (
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
            )}

            {/* ── Products / Prices Tab ── */}
            {activeTab === 'products' && (
                <div>
                    {loadingProducts ? (
                        <div className="flex items-center justify-center py-20 text-gray-400">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mr-3" />
                            Loading products...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">No products found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="p-4 text-left">Product</th>
                                        <th className="p-4 text-left">Category</th>
                                        <th className="p-4 text-right">Current Price</th>
                                        <th className="p-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {product.image && (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-10 h-10 rounded-lg object-cover bg-gray-700"
                                                        />
                                                    )}
                                                    <span className="font-medium">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-400 capitalize">{product.category}</td>
                                            <td className="p-4 text-right">
                                                <span className="text-green-400 font-semibold text-lg">
                                                    ₦{Number(product.price).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => openPriceModal(product)}
                                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-lg font-medium mx-auto"
                                                >
                                                    <FiEdit2 size={14} /> Edit Price
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* ── Activate Plan Modal ── */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold">Activate Meal Plan</h2>
                                <p className="text-gray-400 text-sm mt-1">
                                    For: <span className="text-white font-medium">{selectedUser?.name}</span>
                                </p>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors p-1">
                                <FiX size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Plan Type</label>
                                <select
                                    name="planType"
                                    value={formData.planType}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select a plan type</option>
                                    {PLAN_TYPES.map(plan => (
                                        <option key={plan.value} value={plan.value}>{plan.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name</label>
                                <input
                                    type="text"
                                    name="planName"
                                    value={formData.planName}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Premium Plan, Elite Plan"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                                <select
                                    name="durationInDays"
                                    value={formData.durationInDays}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select duration</option>
                                    {DURATION_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
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

            {/* ── Edit Price Modal ── */}
            {priceModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closePriceModal} />
                    <div className="relative bg-gray-800 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl border border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FiDollarSign className="text-green-400" /> Edit Price
                                </h2>
                                <p className="text-gray-400 text-sm mt-1 truncate max-w-[220px]">
                                    {selectedProduct.name}
                                </p>
                            </div>
                            <button onClick={closePriceModal} className="text-gray-400 hover:text-white transition-colors p-1">
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Product preview */}
                        <div className="flex items-center gap-3 bg-gray-700/50 rounded-xl p-3 mb-5">
                            {selectedProduct.image && (
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="w-14 h-14 rounded-lg object-cover"
                                />
                            )}
                            <div>
                                <p className="font-medium text-sm">{selectedProduct.name}</p>
                                <p className="text-gray-400 text-xs capitalize">{selectedProduct.category}</p>
                                <p className="text-gray-500 text-xs mt-0.5">
                                    Current: <span className="text-green-400 font-semibold">₦{Number(selectedProduct.price).toLocaleString()}</span>
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSavePrice} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    New Price (₦)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₦</span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={newPrice}
                                        onChange={e => setNewPrice(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-semibold"
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closePriceModal}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSavingPrice}
                                    className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {isSavingPrice ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                            Saving...
                                        </>
                                    ) : 'Save Price'}
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