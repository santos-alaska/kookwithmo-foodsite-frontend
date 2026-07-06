import PlanCard from '../components/PlanCard';
import bg from '/bg-img.png';

const mealPlansData = [
    {
        title: "Weight Loss Sculpt Plan",
        description: "For customers who want to reduce body fat while preserving lean muscle",
        features: [
            "Low Carbs i.e Gourmet Meal",
            "Higher Fiber + Lean Protein",
            "Minimal Refined Carbs + Sugar",
        ],
        linkTo: "/meal-plan/weight-loss"
    },
    {
        title: "Gut-Health / Gut Friendly Plan",
        description: "For customers with bloating or digestive issues.",
        features: [
            "(Probiotics + Prebiotics(Greek yoghurt, Asparagus)",
            "Higher-Fiber Meals",
        ],
        linkTo: "/meal-plan/gut-health"
    },
    {
        title: "Anti-Inflammatory Plan",
        description: "For customers with inflammation issues, fatigue or simply wanting to age gracefully.",
        features: [
            "Ginger, Leafy Greens, Berries, Fatty fish, Olive oil.",
        ],
        linkTo: "/meal-plan/anti-inflammatory"
    },
    {
        title: "Weight Gain + Lean Bulk Plan",
        description: "Increase muscle + healthy body mass",
        features: [
            "Clean Carbs + High Protein + Healthy Fat",
            "High Calorie, Nutrient-Dense Meals",
            "Smoothie, Blends and Add-ons",
        ],
        linkTo: "/meal-plan/weight-gain"
    },
];


const MealPlanPage = () => {
    return (
        <div className="relative w-full bg-black text-stone-200">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="absolute inset-0 bg-black/80 z-10" />
            <div className="relative z-20 flex flex-col items-center py-20 px-4">
                <header className="text-center mb-16 mt-10 md:mt-16">
                    <h2 className="font-sans text-stone-300 tracking-[0.3em] uppercase">
                        Discover
                    </h2>
                    <h1 className="font-display text-5xl md:text-6xl text-stone-100 tracking-wider my-2">
                        MEAL PLAN
                    </h1>
                    <p className="font-sans text-stone-300 max-w-xl mx-auto">
                        Discover flexible, balanced meal plans designed to fit your lifestyle, from weight-loss goals to everyday clean eating. Specializing in healthy and sophisticated cuisines.
                    </p>
                </header>

                <div className="flex flex-col items-center gap-10 w-full">
                    {mealPlansData.map((plan, index) => (
                        <PlanCard
                            key={index}
                            title={plan.title}
                            description={plan.description}
                            features={plan.features}
                            linkTo={plan.linkTo || '#'}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MealPlanPage;