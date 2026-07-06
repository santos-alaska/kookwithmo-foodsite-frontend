// import React from 'react';
// import { useLocation, useNavigate, Navigate } from 'react-router-dom';
// import { FiArrowLeft, FiPlus } from 'react-icons/fi';
// import bg from '/bg-img.png';

// const OrderSummaryPage = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const planSelection = state?.plan;

//     if (!planSelection) {
//         return <Navigate to="/meal-plan" />;
//     }

//     const handleProceed = () => {
//         console.log("Final Order Selection:", planSelection);
//         alert("Proceeding to order!");
//     };

//     return (
//         <div className="relative w-full min-h-screen bg-black text-stone-200">
//             <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
//             <div className="absolute inset-0 bg-black/90 z-10" />

//             <main className="relative z-20 max-w-lg mx-auto py-8 px-4 font-sans flex flex-col h-screen pt-24 md:pt-28">
//                 {/* <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-lg">
//                     <FiArrowLeft /> Back
//                 </button> */}
//                 <header className="text-center mb-10">
//                     <h1 className="font-display text-3xl uppercase tracking-wider">Your Order</h1>
//                 </header>

//                 <div className="flex-grow space-y-4 text-lg">
//                     <div className="flex justify-between">
//                         <span className="text-stone-400">Plan:</span>
//                         <span className="text-stone-100 font-semibold">{planSelection.plan}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-stone-400">Duration:</span>
//                         <span className="text-stone-100 font-semibold">{planSelection.duration}</span>
//                     </div>
//                     <div className="flex justify-between ">
//                         <span className="text-stone-400 ">Meals:</span>
//                         <span className="text-stone-100 font-semibold text-right">{planSelection.meals}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-stone-400">Start:</span>
//                         <span className="text-stone-100 font-semibold">Tomorrow</span>
//                     </div>

//                     <hr className="border-stone-700 !my-8" />

//                     <div className="flex justify-between items-center">
//                         <span className="text-stone-400">Price</span>
//                         <span className="border border-stone-500 rounded-full px-6 py-1 text-lg font-semibold">
//                             ₦{planSelection.price.toLocaleString()}
//                         </span>
//                     </div>

//                     <button className="flex items-center justify-center gap-2 w-full border border-stone-500 py-2 rounded-lg text-stone-300 hover:bg-stone-800 transition-colors !mt-8">
//                         <FiPlus /> Add Plan
//                     </button>
//                 </div>

//                 <footer className="text-center pt-8">
//                     <button onClick={handleProceed} className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300 w-full">
//                         Proceed to Order
//                     </button>
//                 </footer>
//             </main>
//         </div>
//     );
// };

// export default OrderSummaryPage;



// --------------------------------------------------------- integarted paystack
// import React from 'react';
// import { useLocation, useNavigate, Navigate } from 'react-router-dom';
// import { FiArrowLeft, FiPlus } from 'react-icons/fi';
// import bg from '/bg-img.png';
// import { useUserStore } from '../stores/useUserStore';
// import { usePaystackPayment } from 'react-paystack';

// const OrderSummaryPage = () => {
//     const PAYSTACK_PUBLIC_KEY = "pk_test_92b7a907f3420fa083712395be5626b3250f075d"; // REPLACE WITH YOUR ACTUAL PUBLIC KEY

//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const planSelection = state?.plan;

//     // 3. Get the authenticated user from the store
//     const { user } = useUserStore();

//     // If no plan data was passed, redirect back to the meal plan selection page
//     if (!planSelection) {
//         return <Navigate to="/meal-plan" />;
//     }

//     // 4. Configure Paystack with data from the plan selection
//     const config = {
//         reference: new Date().getTime().toString(),
//         email: user?.email,
//         amount: planSelection.price * 100, // Amount in Kobo
//         publicKey: PAYSTACK_PUBLIC_KEY,
//     };

//     const initializePayment = usePaystackPayment(config);

//     // 5. Define Paystack callbacks
//     const onSuccess = (reference) => {
//         console.log('Paystack success reference:', reference);
//         verifyPaymentOnBackend(reference);
//     };

//     const onClose = () => {
//         alert('Transaction was not completed, window closed.');
//     };

//     // 6. Function to verify payment on the backend
//     const verifyPaymentOnBackend = async (reference) => {
//         try {
//             // The order payload is now built from the planSelection object
//             const orderPayload = {
//                 // We'll use the user's details from the store or profile for a real app
//                 customerDetails: {
//                     name: user?.name,
//                     phone: 'N/A', // You might want to collect this earlier
//                     address: 'N/A', // Or collect this earlier
//                 },
//                 // The item is the meal plan itself
//                 items: [{
//                     _id: planSelection.plan, // Use plan name as a unique ID for this item
//                     name: `${planSelection.plan} - ${planSelection.duration}`,
//                     price: planSelection.price,
//                     quantity: 1,
//                 }],
//                 specialNotes: `Meal Plan: ${planSelection.meals}`, // Use notes for extra details
//                 totalAmount: planSelection.price,
//             };

//             const res = await fetch('/api/payments/verify-paystack', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ reference: reference.reference, orderPayload })
//             });

//             const data = await res.json();
//             if (data.error) throw new Error(data.error);

//             alert('Payment Verified! Your meal plan is active.');
//             // navigate(`/plan-success/${data.orderId}`);

//         } catch (error) {
//             console.error("Payment verification failed:", error);
//             alert("There was an issue confirming your payment. Please contact support.");
//         }
//     };
//     // const handleProceed = () => {
//     //     console.log("Final Order Selection:", planSelection);
//     //     alert("Proceeding to order!");
//     // };

//     const handleProceed = () => {
//         if (!user) {
//             alert("Please log in to purchase a meal plan.");
//             navigate('/login');
//             return;
//         }
//         initializePayment(onSuccess, onClose);
//     };

//     return (
//         <div className="relative w-full min-h-screen bg-black text-stone-200">
//             <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
//             <div className="absolute inset-0 bg-black/90 z-10" />

//             <main className="relative z-20 max-w-lg mx-auto py-8 px-4 font-sans flex flex-col h-screen pt-24 md:pt-28">
//                 {/* <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-lg">
//                     <FiArrowLeft /> Back
//                 </button> */}
//                 <header className="text-center mb-10">
//                     <h1 className="font-display text-3xl uppercase tracking-wider">Your Order</h1>
//                 </header>

//                 <div className="flex-grow space-y-4 text-lg">
//                     <div className="flex justify-between">
//                         <span className="text-stone-400">Plan:</span>
//                         <span className="text-stone-100 font-semibold">{planSelection.plan}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-stone-400">Duration:</span>
//                         <span className="text-stone-100 font-semibold">{planSelection.duration}</span>
//                     </div>
//                     <div className="flex justify-between ">
//                         <span className="text-stone-400 ">Meals:</span>
//                         <span className="text-stone-100 font-semibold text-right">{planSelection.meals}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="text-stone-400">Start:</span>
//                         <span className="text-stone-100 font-semibold">Tomorrow</span>
//                     </div>

//                     <hr className="border-stone-700 !my-8" />

//                     <div className="flex justify-between items-center">
//                         <span className="text-stone-400">Price</span>
//                         <span className="border border-stone-500 rounded-full px-6 py-1 text-lg font-semibold">
//                             ₦{planSelection.price.toLocaleString()}
//                         </span>
//                     </div>
//                     {/* 
//                     <button className="flex items-center justify-center gap-2 w-full border border-stone-500 py-2 rounded-lg text-stone-300 hover:bg-stone-800 transition-colors !mt-8">
//                         <FiPlus /> Add Plan
//                     </button> */}
//                 </div>

//                 <footer className="text-center pt-8">
//                     <button onClick={handleProceed} className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300 w-full">
//                         Proceed to Order
//                     </button>
//                 </footer>
//             </main>
//         </div>
//     );
// };

// export default OrderSummaryPage;



// --------------------------------------------------------- integarted whatsapp-------------------------------
import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import bg from '/bg-img.png';
import { useUserStore } from '../stores/useUserStore';
// We no longer need the Paystack hook
// import { usePaystackPayment } from 'react-paystack';

const OrderSummaryPage = () => {
    // 1. DEFINE YOUR WHATSAPP NUMBER HERE
    const WHATSAPP_NUMBER = "2348136570214"; // Replace with your actual WhatsApp number

    const { state } = useLocation();
    const navigate = useNavigate();
    const planSelection = state?.plan;

    // Get the authenticated user from the store
    const { user } = useUserStore();

    // If no plan data was passed, redirect back to the meal plan selection page
    if (!planSelection) {
        return <Navigate to="/meal-plan" />;
    }

    // 2. REMOVE ALL PAYSTACK-RELATED CODE
    // (config, initializePayment, onSuccess, onClose, verifyPaymentOnBackend are no longer needed)

    // 3. CREATE THE NEW WHATSAPP HANDLER
    const handleProceed = () => {
        if (!user) {
            alert("Please log in to purchase a meal plan.");
            navigate('/login');
            return;
        }

        // Build the message string using data from the planSelection and user objects
        let message = `*New Meal Plan Order*\n\n`;
        message += `*Customer:* ${user.name}\n`;
        message += `*Email:* ${user.email}\n\n`;
        message += `*--- ORDER DETAILS ---*\n`;
        message += `*Plan:* ${planSelection.plan}\n`;
        message += `*Duration:* ${planSelection.duration}\n`;
        message += `*Includes:* ${planSelection.meals}\n\n`;
        message += `*TOTAL: ₦${planSelection.price.toLocaleString()}*`;

        // Encode the message for a URL
        const encodedMessage = encodeURIComponent(message);

        // Create the WhatsApp URL
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        // Optional: you can show a confirmation message
        alert("You are being redirected to WhatsApp to complete your order. Your plan will be activated by an admin after payment is confirmed.");

        // Optional: redirect user to their profile or a "pending" page
        navigate('/');
    };

    return (
        <div className="relative w-full min-h-screen bg-black text-stone-200">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
            <div className="absolute inset-0 bg-black/90 z-10" />

            <main className="relative z-20 max-w-lg mx-auto py-8 px-4 font-sans flex flex-col h-screen pt-24 md:pt-28">
                <header className="text-center mb-10">
                    <h1 className="font-display text-3xl uppercase tracking-wider">Your Order</h1>
                </header>

                <div className="flex-grow space-y-4 text-lg">
                    <div className="flex justify-between">
                        <span className="text-stone-400">Plan:</span>
                        <span className="text-stone-100 font-semibold">{planSelection.plan}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-stone-400">Duration:</span>
                        <span className="text-stone-100 font-semibold">{planSelection.duration}</span>
                    </div>
                    <div className="flex justify-between ">
                        <span className="text-stone-400 ">Meals:</span>
                        <span className="text-stone-100 font-semibold text-right">{planSelection.meals}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-stone-400">Start:</span>
                        <span className="text-stone-100 font-semibold">Tomorrow</span>
                    </div>

                    <hr className="border-stone-700 !my-8" />

                    <div className="flex justify-between items-center">
                        <span className="text-stone-400">Price</span>
                        <span className="border border-stone-500 rounded-full px-6 py-1 text-lg font-semibold">
                            ₦{planSelection.price.toLocaleString()}
                        </span>
                    </div>
                </div>

                <footer className="text-center pt-8">
                    {/* The "Proceed to Order" button now triggers the WhatsApp flow */}
                    <button onClick={handleProceed} className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300 w-full">
                        Order via WhatsApp
                    </button>
                </footer>
            </main>
        </div>
    );
};

export default OrderSummaryPage;