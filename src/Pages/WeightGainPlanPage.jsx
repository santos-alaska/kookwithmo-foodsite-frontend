import React from 'react';
import MealPlanTablePage from './MealPlanTablePage';
import { allMealPlans } from '../constants/data';

const WeightGainPlanPage = () => {
    const plan = allMealPlans['weight-gain'];
    return <MealPlanTablePage title={plan.title} subtitle={plan.subtitle} planData={plan.data} />;
};
export default WeightGainPlanPage;