
import React from 'react';
import bg from '/bg-img.png';

const MealPlanTablePage = ({ title, subtitle, planData }) => {
    const tableHeaders = ['Day', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

    return (
        <div className="relative w-full min-h-screen bg-black text-stone-200">
            {/* Background & Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="absolute inset-0 bg-black/90 z-10" />

            {/* Main Content */}
            <main className="relative z-20 flex flex-col items-center py-20 px-4 sm:px-8">

                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="font-display text-4xl md:text-5xl text-stone-100 tracking-wider uppercase">
                        {title}
                    </h1>
                    <p className="font-sans text-stone-400 mt-2">
                        {subtitle}
                    </p>
                </header>

                {/* Table Container */}
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
                            {planData.map((row) => (
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

            </main>
        </div>
    );
};

export default MealPlanTablePage;