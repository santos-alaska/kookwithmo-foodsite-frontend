import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import MealPlanTable from '../components/MealPlanTable'; // Import our new table component
import bg from '/bg-img.png';
import { allMealPlans } from '../constants/data';

const MyPlanPage = () => {
    const { user, checkAuth, checkingAuth } = useUserStore();

    // Re-fetch user data when the page loads to get the latest plan status
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Show loading while checking auth or if user is not loaded yet
    if (checkingAuth || !user) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading your plan...</div>;
    }

    const { activeMealPlan } = user;

    if (!activeMealPlan || !activeMealPlan.planType) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-3xl font-bold">You do not have an active meal plan.</h1>
                <p className="mt-2 text-stone-300">Please choose a plan to get started.</p>
                <Link to="/meal-plan" className="mt-6 bg-stone-200 text-black font-semibold px-6 py-2 rounded-lg hover:bg-white">
                    Browse Meal Plans
                </Link>
            </div>
        );
    }

    const planEndDate = new Date(activeMealPlan.endDate);
    if (planEndDate < new Date()) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-3xl font-bold">Your meal plan has expired.</h1>
                <p className="mt-2 text-stone-300">Please renew your plan to continue.</p>
                <Link to="/meal-plan" className="mt-6 bg-stone-200 text-black font-semibold px-6 py-2 rounded-lg hover:bg-white">
                    View Meal Plans
                </Link>
            </div>
        );
    }

    // Find the full data for the user's active plan
    const currentPlanData = allMealPlans[activeMealPlan.planType];
    console.log("currentPlanData", currentPlanData);

    return (
        <div className="relative w-full min-h-screen bg-black text-stone-200">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bg})` }} />
            <div className="absolute inset-0 bg-black/90 z-10" />
            <main className="relative z-20 flex flex-col items-center py-20 px-4 sm:px-8">
                {currentPlanData ? (
                    <MealPlanTable plan={currentPlanData} />
                ) : (
                    <div>Error: Could not find details for your plan type "{activeMealPlan.planType}".</div>
                )}
            </main>
        </div>
    );
};

export default MyPlanPage;