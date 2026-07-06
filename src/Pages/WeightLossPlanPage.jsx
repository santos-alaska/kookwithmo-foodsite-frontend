// import React from 'react';
// import bg from '../../src/assets/bg-img.png'; // Assuming you have a background image

// // Data for the 7-day meal plan
// const planData = [
// {
//     day: 'Day 1',
//     breakfast: 'Oatmeal Bowl (Oats, Milk, Ground cinnamon, Banana, Honey, Berries).',
//     lunch: 'Smoked chicken Sauce with Veggies, Steamed broccoli, Steamed Basmati rice.',
//     dinner: 'Grilled mackerel fish (Titus), Sauteed veggie, Pepper sauce, Steamed rice.',
//     snack: 'Watermelon refresher.'
// },
// {
//     day: 'Day 2',
//     breakfast: 'Sweet potatoes, Egg sauce, Steamed veggies.',
//     lunch: 'Chicken thigh pepper soup, Corn cobs.',
//     dinner: 'Beef gomiti pasta (Asun Pasta style).',
//     snack: 'Yoghurt parfait (Yoghurt, Almonds, Honey).'
// },
// {
//     day: 'Day 3',
//     breakfast: 'Overnight Oats (Oats, Whole milk, Apples, Chia seeds, Pumpkin Seeds).',
//     lunch: 'Potatoes and Chicken salad mixed with varieties of veggies.',
//     dinner: 'Grilled Jumbo prawns, Fried plantain, Stir-fry veggies.',
//     snack: 'Apple slices with Guacamole.'
// },
// {
//     day: 'Day 4',
//     breakfast: 'Skip Breakfast',
//     lunch: 'Spicy shrimp salad (Grilled shrimp, Cherry tomatoes, Lettuce and Nuts finished with dressing.',
//     dinner: 'Turkey Fingers, Okro soup and oat swallow.',
//     snack: 'Pineapple and Ginger juice.'
// },
// {
//     day: 'Day 5',
//     breakfast: 'Boiled plantain, Fish sauce, Mixed herb sauce, Steamed veggies.',
//     lunch: 'Salmon fillet + Mixed veggies salad.',
//     dinner: 'Fried rice and Gizdodo.',
//     snack: 'Sweet potato fries and Guacamole.'
// },
// {
//     day: 'Day 6',
//     breakfast: 'Super Food Bowl (Vegan yoghurt, Banana, Plum, Apples, Passionfruit, Walnuts).',
//     lunch: 'Cucumber, Avocado and Chicken salad with Pear.',
//     dinner: 'Peppered snails, Steamed basmati rice, Pepper sauce.',
//     snack: 'Fruit salad.'
// },
// {
//     day: 'Day 7',
//     breakfast: 'Green juice, Steamed veggies, Boiled potatoes, Fried eggs.',
//     lunch: 'Beef Dodo, Smoky jollof rice and Coleslaw.',
//     dinner: 'Fish sauce, Boiled yam (Small portion and Boiled eggs).',
//     snack: 'Mixed nuts.'
// }
// ];

// const WeightLossPlanPage = () => {
//     const tableHeaders = ['Day', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

//     return (
//         <div className="relative w-full min-h-screen bg-black text-stone-200">
//             {/* Background & Overlay */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center z-0"
//                 style={{ backgroundImage: `url(${bg})` }}
//             />
//             <div className="absolute inset-0 bg-black/90 z-10" />

//             {/* Main Content */}
//             <main className="relative z-20 flex flex-col items-center py-20 px-4 sm:px-8">

//                 {/* Header */}
//                 <header className="text-center mb-12">
//                     <h1 className="font-display text-4xl md:text-5xl text-stone-100 tracking-wider uppercase">
//                         Weight Loss Sculpt Plan
//                     </h1>
//                     <p className="font-sans text-stone-400 mt-2">
//                         (Specify if allergic to any of these ingredients)
//                     </p>
//                 </header>

//                 {/* Table Container - allows horizontal scrolling on small screens */}
//                 <div className="w-full overflow-x-auto">
//                     <table className="w-full max-w-7xl mx-auto border-collapse text-left">
//                         <thead>
//                             <tr>
//                                 {tableHeaders.map(header => (
//                                     <th key={header} className="border border-stone-200/30 p-3 sm:p-4 font-sans font-semibold uppercase tracking-wider text-sm">
//                                         {header}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {planData.map((row) => (
//                                 <tr key={row.day} className="bg-black/20">
//                                     <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans font-semibold">{row.day}</td>
//                                     <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans text-stone-300">{row.breakfast}</td>
//                                     <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans text-stone-300">{row.lunch}</td>
//                                     <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans text-stone-300">{row.dinner}</td>
//                                     <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans text-stone-300">{row.snack}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//             </main>
//         </div>
//     );
// };

// export default WeightLossPlanPage;


import React from 'react';
import MealPlanTablePage from './MealPlanTablePage';
import { allMealPlans } from '../constants/data';

const WeightGainPlanPage = () => {
    const plan = allMealPlans['weight-loss'];
    return <MealPlanTablePage title={plan.title} subtitle={plan.subtitle} planData={plan.data} />;
};
export default WeightGainPlanPage;