import React from 'react';
import MealPlanTablePage from './MealPlanTablePage';
import { allMealPlans } from '../constants/data';

const GutHealthPlanPage = () => {
    const plan = allMealPlans['gut-health'];
    return <MealPlanTablePage title={plan.title} subtitle={plan.subtitle} planData={plan.data} />;
};
export default GutHealthPlanPage;