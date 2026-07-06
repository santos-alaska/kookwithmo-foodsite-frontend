import React from 'react';
import MealPlanTablePage from './MealPlanTablePage';
import { allMealPlans } from '../constants/data';

const AntiInflammatoryPlanPage = () => {
    const plan = allMealPlans['anti-inflammatory'];
    return <MealPlanTablePage title={plan.title} subtitle={plan.subtitle} planData={plan.data} />;
};
export default AntiInflammatoryPlanPage;