
// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiArrowLeft } from 'react-icons/fi';
// import bg from '/bg-img.png';
// import { mealPlanDetails } from '../constants/data';

// const InfoCard = ({ title, children }) => (
//     <div className="w-full  max-w-3xl mx-auto bg-black/20 backdrop-blur-sm border border-stone-800 rounded-2xl p-6 space-y-4">
//         <h3 className="text-center font-semibold text-lg">{title}</h3>
//         {children}
//     </div>
// );

// const MealPlanDetailPage = () => {
//     const { planId } = useParams();
//     console.log("planId", planId);
//     const navigate = useNavigate();
//     const planData = mealPlanDetails[planId];

//     if (!planData) {
//         return <div className="min-h-screen bg-black flex items-center justify-center text-white">Plan not found.</div>;
//     }

//     const handleSelectPlan = (name, price) => {
//         const selection = {
//             plan: planData.title.replace(/\s\+.*/, ''),
//             duration: name,
//             meals: planData.whatYouGet[0],
//             price: price,
//         };

//         navigate('/order-summary', { state: { plan: selection } });
//     };

//     return (
//         <div className="relative w-full bg-black text-stone-200">

//             <div
//                 className="absolute inset-0 bg-cover bg-center z-0"
//                 style={{
//                     backgroundImage: `url(${bg})`,
//                 }}
//             />
//             <div className="bg-black/80 relative z-20 flex flex-col min-h-screen">
//                 <main className=" py-8 px-4 font-sans">
//                     <header className="text-center mb-10 mt-20 md:mt-20">
//                         <h1 className="font-display text-2xl md:text-4xl text-stone-100 tracking-wider uppercase mb-3">
//                             {planData.title}
//                         </h1>
//                         <h2 className="font-sans text-stone-300 ">
//                             {planData.subtitle}
//                         </h2>

//                     </header>

//                     <div className="space-y-8">
//                         <InfoCard title="What You Get">
//                             <ul className="list-disc list-inside text-center text-stone-300 space-y-1">
//                                 {planData.whatYouGet.map((item, i) => <li key={i}>{item}</li>)}
//                             </ul>
//                         </InfoCard>

//                         <InfoCard title="Monthly Subscription">
//                             {planData.monthly.map((plan, i) => (
//                                 <div key={i} className="text-center">
//                                     <h4 className="font-semibold text-stone-100">{plan.name}</h4>
//                                     <button onClick={() => handleSelectPlan(plan.name, plan.price)} className="border border-stone-500 rounded-full px-6 py-1 my-2 text-lg hover:bg-stone-800 transition-colors">
//                                         ₦{plan.price.toLocaleString()}
//                                     </button>
//                                     <p className="text-stone-400 text-sm whitespace-pre-line">{plan.description}</p>
//                                 </div>
//                             ))}
//                         </InfoCard>

//                         <InfoCard title="Weekly Subscription">
//                             <div className="space-y-2">
//                                 {planData.weekly.map((plan, i) => (
//                                     <div key={i} onClick={() => handleSelectPlan(plan.label, plan.price)} className="flex justify-between items-center cursor-pointer hover:bg-stone-800/50 p-2 rounded-md transition-colors">
//                                         <span className="text-stone-300">{plan.label}</span>
//                                         <span className="font-semibold text-stone-100">{plan.price.toLocaleString()}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </InfoCard>

//                         {planData.combos && (
//                             <InfoCard title="Combo Deals">
//                                 <div className="space-y-2">
//                                     {planData.combos.map((plan, i) => (
//                                         <div key={i} onClick={() => handleSelectPlan(plan.label, plan.price)} className="flex justify-between items-center cursor-pointer hover:bg-stone-800/50 p-2 rounded-md transition-colors">
//                                             <span className="text-stone-300">{plan.label}</span>
//                                             <span className="font-semibold text-stone-100">{plan.price.toLocaleString()}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </InfoCard>
//                         )}
//                     </div>
//                 </main>
//                 <footer className="text-center py-8 px-4 md:px-0 max-w-3xl w-full mx-auto">
//                     <button className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300 w-full">
//                         Start this plan
//                     </button>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default MealPlanDetailPage;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import bg from '/bg-img.png';
import { mealPlanDetails } from '../constants/data';

const InfoCard = ({ title, children }) => (
    <div className="w-full max-w-3xl mx-auto bg-black/20 backdrop-blur-sm border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-center font-semibold text-lg">{title}</h3>
        {children}
    </div>
);

const MealPlanDetailPage = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const planData = mealPlanDetails[planId];

    const [selectedPlan, setSelectedPlan] = useState(null);

    if (!planData) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Plan not found.</div>;
    }

    const handleSelectPlan = (name, price) => {
        const selection = {
            plan: planData.title.replace(/\s\+.*/, ''),
            duration: name,
            meals: planData.whatYouGet[0],
            price: price,
        };
        setSelectedPlan(selection);
    };

    const handleProceedToSummary = () => {
        if (!selectedPlan) {
            alert("Please select a subscription option before proceeding.");
            return;
        }
        navigate('/order-summary', { state: { plan: selectedPlan } });
    };

    return (
        <div className="relative w-full bg-black text-stone-200">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="bg-black/80 relative z-20 flex flex-col min-h-screen">
                <main className="py-8 px-4 font-sans">
                    <header className="text-center mb-10 mt-20 md:mt-20">
                        <h1 className="font-display text-2xl md:text-4xl text-stone-100 tracking-wider uppercase mb-3">
                            {planData.title}
                        </h1>
                        <h2 className="font-sans text-stone-300 ">
                            {planData.subtitle}
                        </h2>
                    </header>

                    <div className="space-y-8">
                        <InfoCard title="What You Get">
                            <ul className="list-disc list-inside text-center text-stone-300 space-y-1">
                                {planData.whatYouGet.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </InfoCard>

                        <InfoCard title="Monthly Subscription">
                            <p className='text-center text-stone-300 -mt-3 text-sm tracking-wider'>Choose a monthly subscription plan</p>
                            {planData.monthly.map((plan, i) => (
                                <div key={i} className="text-center">
                                    <h4 className="font-semibold text-stone-100">{plan.name}</h4>
                                    {/* --- 5. ENHANCED CONDITIONAL STYLING FOR BUTTONS --- */}
                                    <button
                                        onClick={() => handleSelectPlan(plan.name, plan.price)}
                                        className={`border rounded-lg px-6 py-1 my-2 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${selectedPlan?.duration === plan.name
                                            ? 'bg-stone-200 text-black border-stone-200 scale-105' // -- SELECTED STATE --
                                            : 'border-stone-500 text-stone-200 hover:bg-stone-800' // -- UNSELECTED STATE --
                                            }`}
                                    >
                                        ₦{plan.price.toLocaleString()}
                                    </button>
                                    <p className="text-stone-400 text-sm whitespace-pre-line">{plan.description}</p>
                                </div>
                            ))}
                        </InfoCard>

                        <InfoCard title="Weekly Subscription">
                            <p className='text-center text-stone-300 -mt-3 text-sm tracking-wider'>Choose a weekly subscription plan</p>
                            <div className="space-y-2">
                                {planData.weekly.map((plan, i) => (
                                    // --- 5. ENHANCED CONDITIONAL STYLING FOR DIVS ---
                                    <div
                                        key={i}
                                        onClick={() => handleSelectPlan(plan.label, plan.price)}
                                        className={`flex justify-between items-center cursor-pointer p-3 rounded-md transition-all duration-200 ease-in-out ${selectedPlan?.duration === plan.label
                                            ? 'bg-stone-700 ring-2 ring-stone-400' // -- SELECTED STATE --
                                            : 'hover:bg-stone-800/50' // -- UNSELECTED STATE --
                                            }`}
                                    >
                                        <span className="text-stone-300">{plan.label}</span>
                                        <span className="font-semibold text-stone-100">{plan.price.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </InfoCard>

                        {planData.combos && (
                            <InfoCard title="Combo Deals">
                                <p className='text-center text-stone-300 -mt-3 text-sm tracking-wider'>Choose a combo deal</p>
                                <div className="space-y-2">
                                    {planData.combos.map((plan, i) => (
                                        // --- 5. ENHANCED CONDITIONAL STYLING FOR DIVS ---
                                        <div
                                            key={i}
                                            onClick={() => handleSelectPlan(plan.label, plan.price)}
                                            className={`flex justify-between items-center cursor-pointer p-3 rounded-md transition-all duration-200 ease-in-out ${selectedPlan?.duration === plan.label
                                                ? 'bg-stone-700 ring-2 ring-stone-400' // -- SELECTED STATE --
                                                : 'hover:bg-stone-800/50' // -- UNSELECTED STATE --
                                                }`}
                                        >
                                            <span className="text-stone-300">{plan.label}</span>
                                            <span className="font-semibold text-stone-100">{plan.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </InfoCard>
                        )}
                    </div>
                </main>
                <footer className="text-center py-8 px-4 md:px-0 max-w-3xl w-full mx-auto mt-auto">
                    <button
                        onClick={handleProceedToSummary}
                        disabled={!selectedPlan}
                        className="font-sans font-semibold text-black bg-stone-200 px-12 py-3 rounded-lg hover:bg-white transition-colors duration-300 w-full disabled:bg-stone-500 disabled:cursor-not-allowed"
                    >
                        Start this plan
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default MealPlanDetailPage;