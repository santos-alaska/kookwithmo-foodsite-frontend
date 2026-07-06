// import React, { useState, useEffect } from 'react';
// import { FiPlus, FiMinus } from 'react-icons/fi';
// import { usePaystackPayment } from 'react-paystack';
// import { useUserStore } from '../stores/useUserStore'; // 1. Import your Zustand store
// import bg from '/bg-img.png';
// import { menuOptions } from '../constants/data'; // Ensure this path is correct

// // Reusable Input Component for consistent styling
// const FormInput = ({ label, name, placeholder, value, onChange, type = 'text' }) => (
//     <div className="w-full">
//         <label htmlFor={name} className="block font-sans text-sm text-stone-300 mb-1">{label}</label>
//         <input
//             type={type}
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             value={value}
//             onChange={onChange}
//             className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white placeholder-stone-400 focus:ring-1 focus:ring-stone-200 focus:outline-none transition-shadow"
//         />
//     </div>
// );

// const OrderSummary = ({ mealPacks, setMealPacks, specialNotes, setSpecialNotes, totalPrice, handlePayment }) => {

//     const aggregatedMeals = mealPacks.reduce((acc, pack) => {
//         if (!pack.meal) return acc;
//         if (acc[pack.meal]) {
//             acc[pack.meal].quantity++;
//         } else {
//             acc[pack.meal] = { ...pack, quantity: 1 };
//         }
//         return acc;
//     }, {});
//     const orderSummaryList = Object.values(aggregatedMeals);

//     const handleIncreaseQuantity = (mealName) => {
//         const itemToAdd = mealPacks.find(p => p.meal === mealName);
//         if (itemToAdd) {
//             setMealPacks(prev => [...prev, { ...itemToAdd, id: Date.now() }]);
//         }
//     };

//     const handleDecreaseQuantity = (mealName) => {
//         const indexToRemove = mealPacks.findIndex(p => p.meal === mealName);
//         if (indexToRemove > -1) {
//             setMealPacks(prev => prev.filter((_, index) => index !== indexToRemove));
//         }
//     };

//     return (
//         <div>
//             <header className="text-center mb-10">
//                 <h1 className="font-display text-4xl text-stone-100 tracking-wider uppercase">Your Order</h1>
//             </header>
//             <section className="space-y-4">
//                 {orderSummaryList.map(item => (
//                     <div key={item.meal} className="flex justify-between items-center text-lg">
//                         <span className="font-sans text-stone-300">{item.meal}</span>
//                         <div className="flex items-center gap-4 border border-stone-500 rounded-lg px-3 py-1">
//                             <button onClick={() => handleIncreaseQuantity(item.meal)} className="text-stone-200 hover:text-white transition-colors"><FiPlus /></button>
//                             <span className="font-sans font-semibold w-4 text-center">{item.quantity}</span>
//                             <button onClick={() => handleDecreaseQuantity(item.meal)} className="text-stone-200 hover:text-white transition-colors"><FiMinus /></button>
//                         </div>
//                     </div>
//                 ))}
//             </section>
//             <hr className="border-stone-700 my-8" />
//             <section className="space-y-4">
//                 <FormInput label="Price" name="price" value={`₦${totalPrice.toLocaleString()}`} onChange={() => { }} readOnly />
//                 <div>
//                     <label className="block font-sans text-sm text-stone-300 mb-1">Special Notes</label>
//                     <textarea value={specialNotes} onChange={e => setSpecialNotes(e.target.value)} placeholder="0" rows="4" className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white" />
//                 </div>
//             </section>
//             <footer className="text-center pt-8">
//                 <button onClick={handlePayment} className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300">
//                     Make Payment
//                 </button>
//             </footer>
//         </div>
//     );
// };


// const OrderPage = () => {
//     const PAYSTACK_PUBLIC_KEY = "pk_test_92b7a907f3420fa083712395be5626b3250f075d";
//     const [view, setView] = useState('form');
//     const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });
//     const [mealPacks, setMealPacks] = useState([{ id: 1, category: '', meal: '', price: 0 }]);
//     const [specialNotes, setSpecialNotes] = useState('');
//     const [totalPrice, setTotalPrice] = useState(0);

//     const { user } = useUserStore();

//     useEffect(() => {
//         const newTotal = mealPacks.reduce((sum, pack) => sum + (pack.price || 0), 0);
//         setTotalPrice(newTotal);
//     }, [mealPacks]);

//     // 3. Configure the Paystack payment, now using the user's email from the store
//     const config = {
//         reference: new Date().getTime().toString(),
//         email: user?.email, // Use optional chaining in case user is null
//         amount: totalPrice * 100, // Amount in Kobo
//         publicKey: PAYSTACK_PUBLIC_KEY,
//     };

//     const initializePayment = usePaystackPayment(config);

//     const onSuccess = (reference) => {
//         console.log('Paystack success reference:', reference);
//         verifyPaymentOnBackend(reference);
//     };

//     const onClose = () => {
//         alert('Transaction was not completed, window closed.');
//     };

//     const verifyPaymentOnBackend = async (reference) => {
//         try {
//             const orderPayload = {
//                 customerDetails,
//                 items: Object.values(mealPacks.reduce((acc, pack) => {
//                     if (!pack.meal) return acc;
//                     if (acc[pack.meal]) {
//                         acc[pack.meal].quantity++;
//                     } else {
//                         acc[pack.meal] = { _id: pack.id, name: pack.meal, price: pack.price, quantity: 1 };
//                     }
//                     return acc;
//                 }, {})),
//                 specialNotes,
//                 totalAmount: totalPrice
//             };

//             const res = await fetch('/payments/verify-paystack', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ reference: reference.reference, orderPayload })
//             });

//             const data = await res.json();
//             if (data.error) throw new Error(data.error);

//             alert('Payment Verified! Your order has been placed.');
//             // navigate(`/order-success/${data.orderId}`);
//         } catch (error) {
//             console.error("Payment verification failed:", error);
//             alert("There was an issue confirming your payment. Please contact support.");
//         }
//     };

//     // 4. Update the handlePayment function to check for the user from the store
//     const handlePayment = () => {
//         if (!user) {
//             alert("Please log in to make a payment.");
//             return;
//         }
//         initializePayment(onSuccess, onClose);
//     };

//     // --- The rest of your form handlers (no changes) ---
//     const handleProceedToOrder = (e) => {
//         e.preventDefault();
//         const validPacks = mealPacks.filter(pack => pack.meal);
//         if (validPacks.length === 0) {
//             alert('Please add at least one meal to your order.');
//             return;
//         }
//         setMealPacks(validPacks);
//         setView('summary');
//     };
//     const handleCustomerDetailsChange = (e) => {
//         setCustomerDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };
//     const handlePackChange = (id, field, value) => {
//         setMealPacks(prevPacks =>
//             prevPacks.map(pack => {
//                 if (pack.id === id) {
//                     if (field === 'category') return { ...pack, category: value, meal: '', price: 0 };
//                     if (field === 'meal') {
//                         const selectedCategory = menuOptions.find(opt => opt.category === pack.category);
//                         const selectedItem = selectedCategory?.items.find(item => item.name === value);
//                         return { ...pack, meal: value, price: selectedItem?.price || 0 };
//                     }
//                 }
//                 return pack;
//             })
//         );
//     };
//     const handleAddPack = () => {
//         setMealPacks(prev => [...prev, { id: Date.now(), category: '', meal: '', price: 0 }]);
//     };
//     const handleDeletePack = (id) => {
//         setMealPacks(prev => prev.filter(pack => pack.id !== id));
//     };

//     return (
//         <div className="relative w-full min-h-screen bg-black text-stone-200">
//             <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
//             <div className="absolute inset-0 bg-black/90 z-10" />
//             <main className="relative z-20 flex flex-col items-center py-16 px-4">
//                 <div className="w-full max-w-2xl">
//                     {view === 'form' ? (
//                         <div>
//                             <header className="text-center mb-10 font-sans mt-10 md:mt-14">
//                                 <h1 className="font-display text-3xl md:text-4xl text-stone-100 tracking-wider uppercase">Place Your Order</h1>
// </header>
//                             <form onSubmit={handleProceedToOrder} className="space-y-8">
//                                 <section className="space-y-4">
//                                     <h2 className="font-sans font-semibold text-stone-200">Your Details</h2>
//                                     <FormInput label="Name" name="name" placeholder="Enter your full name" value={customerDetails.name} onChange={handleCustomerDetailsChange} />
//                                     <FormInput label="Phone Number" name="phone" placeholder="080..." value={customerDetails.phone} onChange={handleCustomerDetailsChange} />
//                                     <FormInput label="Delivery Address" name="address" placeholder="Street, house number..." value={customerDetails.address} onChange={handleCustomerDetailsChange} />
//                                 </section>
//                                 <hr className="border-stone-700" />
//                                 <section className="space-y-6">
//                                     <h2 className="font-sans font-semibold text-stone-200">Choose Your Meals</h2>
//                                     {mealPacks.map((pack, index) => {
//                                         const availableItems = menuOptions.find(opt => opt.category === pack.category)?.items || [];
//                                         return (
//                                             <div key={pack.id} className="bg-black/30 p-4 rounded-lg space-y-4 border border-stone-800">
//                                                 <div className="flex justify-between items-center">
//                                                     <h3 className="font-sans font-medium text-stone-300">Add Pack {index + 1}</h3>
//                                                     {mealPacks.length > 1 && (<button type="button" onClick={() => handleDeletePack(pack.id)} className="text-sm text-red-400 hover:text-red-300">Delete Pack</button>)}
//                                                 </div>
//                                                 <div>
//                                                     <label className="block font-sans text-sm text-stone-300 mb-1">Categories</label>
//                                                     <select value={pack.category} onChange={e => handlePackChange(pack.id, 'category', e.target.value)} className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white">
//                                                         <option className='bg-black' value="" >Choose a meal option</option>
//                                                         {menuOptions.map(opt => <option className='bg-black' key={opt.category} value={opt.category}>{opt.category}</option>)}
//                                                     </select>
//                                                 </div>
//                                                 <div>
//                                                     <label className="block font-sans text-sm text-stone-300 mb-1">What Would you like?</label>
//                                                     <select value={pack.meal} onChange={e => handlePackChange(pack.id, 'meal', e.target.value)} disabled={!pack.category} className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white disabled:opacity-50">
//                                                         <option className='bg-black' value="">Choose a meal option</option>
//                                                         {availableItems.map(item => <option className='bg-black' key={item.name} value={item.name}>{item.name} - ₦{item.price.toLocaleString()}</option>)}
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                     <button type="button" onClick={handleAddPack} className="flex items-center gap-2 border border-stone-500 px-4 py-2 rounded-lg text-stone-300 hover:bg-stone-800 transition-colors"><FiPlus /> Add meal</button>
//                                 </section>
//                                 <hr className="border-stone-700" />
//                                 <section className="space-y-4">
//                                     <FormInput label="Price" name="price" value={`₦${totalPrice.toLocaleString()}`} onChange={() => { }} readOnly />
//                                     <div>
//                                         <label className="block font-sans text-sm text-stone-300 mb-1">Special Notes</label>
//                                         <textarea value={specialNotes} onChange={e => setSpecialNotes(e.target.value)} placeholder="0" rows="4" className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white" />
//                                     </div>
//                                 </section>
//                                 <footer className="text-center pt-4">
//                                     <p className="text-xs text-stone-400 mb-4">By proceeding, you agree to our <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a></p>
//                                     <button type="submit" className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300">Proceed to Order</button>
//                                 </footer>
//                             </form>
//                         </div>
//                     ) : (
//                         <OrderSummary
//                             mealPacks={mealPacks}
//                             setMealPacks={setMealPacks}
//                             specialNotes={specialNotes}
//                             setSpecialNotes={setSpecialNotes}
//                             totalPrice={totalPrice}
//                             handlePayment={handlePayment}
//                         />
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default OrderPage;





// ------------------------------------------without paystack connect through whatsapp

import React, { useState, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
// `usePaystackPayment` is no longer needed
import { useUserStore } from '../stores/useUserStore';
import bg from '/bg-img.png';
import { menuOptions } from '../constants/data';

// Reusable Input Component (No changes)
const FormInput = ({ label, name, placeholder, value, onChange, type = 'text' }) => (
    <div className="w-full">
        <label htmlFor={name} className="block font-sans text-sm text-stone-300 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white placeholder-stone-400 focus:ring-1 focus:ring-stone-200 focus:outline-none transition-shadow"
        />
    </div>
);

// Order Summary Component
const OrderSummary = ({ mealPacks, setMealPacks, specialNotes, setSpecialNotes, totalPrice, handlePayment }) => {
    const aggregatedMeals = mealPacks.reduce((acc, pack) => {
        if (!pack.meal) return acc;
        if (acc[pack.meal]) {
            acc[pack.meal].quantity++;
        } else {
            acc[pack.meal] = { ...pack, quantity: 1 };
        }
        return acc;
    }, {});
    const orderSummaryList = Object.values(aggregatedMeals);

    const handleIncreaseQuantity = (mealName) => {
        const itemToAdd = mealPacks.find(p => p.meal === mealName);
        if (itemToAdd) {
            setMealPacks(prev => [...prev, { ...itemToAdd, id: Date.now() }]);
        }
    };
    const handleDecreaseQuantity = (mealName) => {
        const indexToRemove = mealPacks.findIndex(p => p.meal === mealName);
        if (indexToRemove > -1) {
            setMealPacks(prev => prev.filter((_, index) => index !== indexToRemove));
        }
    };

    return (
        <div>
            <header className="text-center mb-10 font-sans mt-10 md:mt-14">
                <h1 className="font-display text-3xl md:text-4xl text-stone-100 tracking-wider uppercase">Place Your Order</h1>
            </header>
            <section className="space-y-4">
                {orderSummaryList.map(item => (
                    <div key={item.meal} className="flex justify-between items-center text-lg">
                        <span className="font-sans text-stone-300">{item.meal}</span>
                        <div className="flex items-center gap-4 border border-stone-500 rounded-lg px-3 py-1">
                            <button onClick={() => handleIncreaseQuantity(item.meal)} className="text-stone-200 hover:text-white transition-colors"><FiPlus /></button>
                            <span className="font-sans font-semibold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => handleDecreaseQuantity(item.meal)} className="text-stone-200 hover:text-white transition-colors"><FiMinus /></button>
                        </div>
                    </div>
                ))}
            </section>
            <hr className="border-stone-700 my-8" />
            <section className="space-y-4">
                <FormInput label="Price" name="price" value={`₦${totalPrice.toLocaleString()}`} onChange={() => { }} readOnly />
                <div>
                    <label className="block font-sans text-sm text-stone-300 mb-1">Special Notes</label>
                    <textarea value={specialNotes} onChange={e => setSpecialNotes(e.target.value)} placeholder="0" rows="4" className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white" />
                </div>
            </section>
            <footer className="text-center pt-8">
                <button onClick={handlePayment} className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300">
                    Place Order via WhatsApp
                </button>
            </footer>
        </div>
    );
};

// Main OrderPage Component
const OrderPage = () => {
    const WHATSAPP_NUMBER = "2348136570214";
    const [view, setView] = useState('form');
    const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });
    const [mealPacks, setMealPacks] = useState([{ id: 1, category: '', meal: '', price: 0 }]);
    const [specialNotes, setSpecialNotes] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const { user } = useUserStore();

    useEffect(() => {
        const newTotal = mealPacks.reduce((sum, pack) => sum + (pack.price || 0), 0);
        setTotalPrice(newTotal);
    }, [mealPacks]);

    const handleWhatsAppPayment = () => {
        if (!user) {
            alert("Please log in to make an order.");
            return;
        }
        const aggregatedMeals = mealPacks.reduce((acc, pack) => {
            if (!pack.meal) return acc;
            if (acc[pack.meal]) {
                acc[pack.meal].quantity++;
            } else {
                acc[pack.meal] = { ...pack, quantity: 1 };
            }
            return acc;
        }, {});
        const orderSummaryList = Object.values(aggregatedMeals);
        let message = `*New Order from ${customerDetails.name || user.name}*\n\n`;
        message += `*Contact:* ${customerDetails.phone}\n`;
        message += `*Address:* ${customerDetails.address}\n\n`;
        message += `*--- ORDER DETAILS ---*\n`;
        orderSummaryList.forEach(item => {
            message += `- ${item.quantity}x ${item.meal}\n`;
        });
        if (specialNotes) {
            message += `\n*Special Notes:*\n${specialNotes}\n`;
        }
        message += `\n*TOTAL: ₦${totalPrice.toLocaleString()}*`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleProceedToOrder = (e) => {
        e.preventDefault();
        const validPacks = mealPacks.filter(pack => pack.meal);
        if (validPacks.length === 0) {
            alert('Please add at least one meal to your order.');
            return;
        }
        if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
            alert('Please fill in your details (Name, Phone, Address).');
            return;
        }
        setMealPacks(validPacks);
        setView('summary');

        window.scrollTo(0, 0);
    };
    const handleCustomerDetailsChange = (e) => { setCustomerDetails(prev => ({ ...prev, [e.target.name]: e.target.value })); };
    const handlePackChange = (id, field, value) => {
        setMealPacks(prevPacks =>
            prevPacks.map(pack => {
                if (pack.id === id) {
                    if (field === 'category') return { ...pack, category: value, meal: '', price: 0 };
                    if (field === 'meal') {
                        const selectedCategory = menuOptions.find(opt => opt.category === pack.category);
                        const selectedItem = selectedCategory?.items.find(item => item.name === value);
                        return { ...pack, meal: value, price: selectedItem?.price || 0 };
                    }
                }
                return pack;
            })
        );
    };
    const handleAddPack = () => { setMealPacks(prev => [...prev, { id: Date.now(), category: '', meal: '', price: 0 }]); };
    const handleDeletePack = (id) => { setMealPacks(prev => prev.filter(pack => pack.id !== id)); };

    return (
        <div className="relative w-full min-h-screen bg-black text-stone-200">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
            <div className="absolute inset-0 bg-black/90 z-10" />
            <main className="relative z-20 flex flex-col items-center py-16 px-4">
                <div className="w-full max-w-2xl">
                    {view === 'form' ? (
                        <div>
                            <header className="text-center mb-10 font-sans mt-10 md:mt-14">
                                <h1 className="font-display text-3xl md:text-4xl text-stone-100 tracking-wider uppercase">Place Your Order</h1>
                            </header>
                            <form onSubmit={handleProceedToOrder} className="space-y-8">
                                <section className="space-y-4">
                                    <h2 className="font-sans font-semibold text-stone-200">Your Details</h2>
                                    <FormInput label="Name" name="name" placeholder="Enter your full name" value={customerDetails.name} onChange={handleCustomerDetailsChange} />
                                    <FormInput label="Phone Number" name="phone" placeholder="080..." value={customerDetails.phone} onChange={handleCustomerDetailsChange} />
                                    <FormInput label="Delivery Address" name="address" placeholder="Street, house number..." value={customerDetails.address} onChange={handleCustomerDetailsChange} />
                                </section>
                                <hr className="border-stone-700" />
                                <section className="space-y-6">
                                    <h2 className="font-sans font-semibold text-stone-200">Choose Your Meals</h2>
                                    {mealPacks.map((pack, index) => {
                                        const availableItems = menuOptions.find(opt => opt.category === pack.category)?.items || [];
                                        return (
                                            <div key={pack.id} className="bg-black/30 p-4 rounded-lg space-y-4 border border-stone-800">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-sans font-medium text-stone-300">Add Pack {index + 1}</h3>
                                                    {mealPacks.length > 1 && (<button type="button" onClick={() => handleDeletePack(pack.id)} className="text-sm text-red-400 hover:text-red-300">Delete Pack</button>)}
                                                </div>
                                                <div>
                                                    <label className="block font-sans text-sm text-stone-300 mb-1">Categories</label>
                                                    <select value={pack.category} onChange={e => handlePackChange(pack.id, 'category', e.target.value)} className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white">
                                                        <option className='bg-black' value="" >Choose a meal option</option>
                                                        {menuOptions.map(opt => <option className='bg-black' key={opt.category} value={opt.category}>{opt.category}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block font-sans text-sm text-stone-300 mb-1">What Would you like?</label>
                                                    <select value={pack.meal} onChange={e => handlePackChange(pack.id, 'meal', e.target.value)} disabled={!pack.category} className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white disabled:opacity-50">
                                                        <option className='bg-black' value="">Choose a meal option</option>
                                                        {availableItems.map(item => <option className='bg-black' key={item.name} value={item.name}>{item.name} - ₦{item.price.toLocaleString()}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <button type="button" onClick={handleAddPack} className="flex items-center gap-2 border border-stone-500 px-4 py-2 rounded-lg text-stone-300 hover:bg-stone-800 transition-colors"><FiPlus /> Add meal</button>
                                </section>
                                <hr className="border-stone-700" />
                                <section className="space-y-4">
                                    <FormInput label="Price" name="price" value={`₦${totalPrice.toLocaleString()}`} onChange={() => { }} readOnly />
                                    <div>
                                        <label className="block font-sans text-sm text-stone-300 mb-1">Special Notes</label>
                                        <textarea value={specialNotes} onChange={e => setSpecialNotes(e.target.value)} placeholder="0" rows="4" className="w-full bg-transparent border border-stone-500 rounded-lg p-3 text-white" />
                                    </div>
                                </section>
                                <footer className="text-center pt-4">
                                    <p className="text-xs text-stone-400 mb-4">By proceeding, you agree to our <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a></p>
                                    <button type="submit" className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300">Proceed to Order</button>
                                </footer>
                            </form>
                        </div>
                    ) : (
                        <OrderSummary
                            mealPacks={mealPacks}
                            setMealPacks={setMealPacks}
                            specialNotes={specialNotes}
                            setSpecialNotes={setSpecialNotes}
                            totalPrice={totalPrice}
                            handlePayment={handleWhatsAppPayment}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default OrderPage;