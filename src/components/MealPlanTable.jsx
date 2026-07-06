
import React from 'react';

const MealPlanTable = ({ plan }) => {
    if (!plan) return null;

    const tableHeaders = ['Day', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

    return (
        <div className="w-full">
            <header className="text-center mb-12 mt-10 md:mt-16">
                <h1 className="font-display text-4xl md:text-5xl text-stone-100 tracking-wider uppercase">
                    {plan.title}
                </h1>
                <p className="font-sans text-stone-400 mt-2">
                    {plan.subtitle}
                </p>
            </header>

            <div className="w-full overflow-x-auto">
                <table className="w-full max-w-7xl mx-auto border-collapse text-left">
                    <thead>
                        <tr>
                            {tableHeaders.map(header => (
                                <th key={header} className="border border-stone-200/30 p-3 sm:p-4 font-sans font-semibold uppercase tracking-wider text-sm">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {plan.data.map((row) => (
                            <tr key={row.day} className="bg-black/20">
                                <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans font-semibold">{row.day}</td>
                                <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans text-stone-300">{row.breakfast}</td>
                                <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans text-stone-300">{row.lunch}</td>
                                <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans text-stone-300">{row.dinner}</td>
                                <td className="border border-stone-200/30 p-3 sm:p-4 align-top font-sans text-stone-300">{row.snack}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MealPlanTable;