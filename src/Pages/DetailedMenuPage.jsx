
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '/bg-img.png'

// const fullMenuData = [
//     {
//         categoryTitle: "Main Meals",
//         columns: [
//             { // Column 1
//                 items: [
//                     { name: "Stews & Soup", description: ["Efo Riro Soup", "Egusi Soup", "Ogbono Soup", "Okro Soup", "Ewedu Soup"] },
//                     { name: "Obe (Yoruba Red Stew)", description: ["Select from tripe or fish sauteed in a stew of slow cooked tomato, onion, and peppers.", "Served with a side of choice."] },
//                     { name: "Home Made Pepper Soup", description: ["Spicy broth infused with herbs and spices served with your choice of fish, chicken, goat or assorted offals."] }
//                 ]
//             },
//             { // Column 2
//                 items: [
//                     { name: "Ofada Sauce (Ayamase)." },
//                     { name: "Bukka Stew (Naija style)." },
//                     { name: "Proteins", description: ["Grilled Tiger Prawns", "Salmon Fillet", "Honey Glazed Spicy Chicken Wings", "Peppered Snail", "Chicken Breast", "Turkey Wings", "Spicy Chicken Wings."] }
//                 ]
//             }
//         ]
//     },
//     {
//         categoryTitle: "Chef's Special",
//         columns: [
//             {
//                 items: [
//                     { name: "Chef's Special", description: ["High Protein Bowl", "Fried & Stewed Mackerel", "Chicken", "Fried eggs", "Fries."] },
//                     { name: "Honey-buttered corn-cob", description: ["Crispy Irish potatoes", "Shrimps", "Veggies."] }
//                 ]
//             },
//             {
//                 items: [
//                     { name: "Ultimate Bukka Combo", description: ["White rice", "Beef", "Stewed beef", "Fried fish", "Dodo", "Boiled egg", "Pepper Sauce."] },
//                     { name: "Beef graniti" },
//                     { name: "Pasta (Asun pasta style)." }
//                 ]
//             }
//         ]
//     },
//     {
//         categoryTitle: "Breakfast",
//         columns: [
//             {
//                 items: [
//                     { name: "Full Nigerian Breakfast", description: ["Boiled or fried yam with sauce of your choice and steamed veggies.", "Boiled or fried plantain with sauce of your choice and steamed veggies."] }
//                 ]
//             },
//             {
//                 items: [
//                     { name: "Egg & Sauces", description: ["Nigerian egg sauce", "Plain fried eggs", "Boiled eggs", "Sunny-side-up egg", "Poached egg."] },
//                     { name: "Avocado Toast" }
//                 ]
//             }
//         ]
//     },
//     {
//         categoryTitle: "Sides",
//         columns: [
//             {
//                 items: [
//                     { name: "Smoky Jollof Rice" }, { name: "Fried Rice" }, { name: "Steamed Basmati Rice" },
//                     { name: "Fries (sweet potatoes, yam)" }, { name: "Steamed Vegetable" }, { name: "Mashed Potatoes" }
//                 ]
//             },
//             {
//                 items: [
//                     { name: "Stir-fry veggies" }, { name: "Fried Plantain" }, { name: "Corn cobs" },
//                     { name: "Coleslaw" }, { name: "Guacamole" }, { name: "Steamed Broccoli" }
//                 ]
//             }
//         ]
//     },
//     {
//         categoryTitle: "Salad",
//         columns: [
//             { // Column 1
//                 items: [
//                     { name: "Mixed Veggies Salad", description: ["Cabbage, lettuce, raisins, carrot, corn, garlic croutons & chicken breast."] },
//                     { name: "Prawn Salad", description: ["Grilled prawn and shrimp, cherry tomatoes, lettuce, cabbage & nuts finished with dressing."] }
//                 ]
//             },
//             { // Column 2
//                 items: [
//                     { name: "Fruit Salad", description: ["Pineapples, strawberries, blueberries, grapes, kiwi, clementines with honey and lemon dressing."] },
//                     { name: "Potato and chicken salad", description: ["mixed with veggies and beetroot."] },
//                     { name: "Cucumber & avocado salad", description: ["mixed with eggs & chicken."] }
//                 ]
//             }
//         ]
//     },
//     {
//         categoryTitle: "Raw-Cold Pressed Juices",
//         columns: [
//             {
//                 items: [
//                     { name: "Natural Retinol", description: ["Carrot, orange & ginger juice."] },
//                     { name: "Green Juice", description: ["Apple, spinach, pineapple, cucumber, lemon 7 ginger."] },
//                     { name: "Pineapple ginger juice." },
//                     { name: "Watermelon refresher." }
//                 ]
//             },
//             {
//                 items: [
//                     { name: "Immunity Booster", description: ["Lemon, lime, tumeric, strawberry, ginger, & pineapple."] },
//                     { name: "Sweet Sunshine", description: ["Oranges, clementines,& strawberry juice."] }
//                 ]
//             }
//         ]
//     },
//     {
//         categoryTitle: "Yoghurt Bowls",
//         columns: [
//             {
//                 items: [
//                     { name: "Morning Fuel", description: ["Sweetened greek yoghurt, Granola, plum, kiwi, honey, with nuts & seed.", "(specify if allergic)"] },
//                     { name: "Yoghurt Parfait", description: ["Greek yoghurt, almonds, granola, blueberries, strawberries, honey."] }
//                 ]
//             },
//             {
//                 items: [
//                     { name: "Chia Pudding Bowl", description: ["Sweetened/unsweetened greek yoghurt, golden raisins, chia pudding, apples, dried cranberries, kiwi."] },
//                     { name: "Super Food Bowl", description: ["Vegan yoghurt, bananas, passionfruit, plum, sunflower seeds, walnuts, apple slices."] }
//                 ]
//             }
//         ]
//     },
//     {
//         categoryTitle: "Oatmeal Bowls",
//         columns: [
//             {
//                 items: [
//                     { name: "Oats Porridge", description: ["Oats, white milk, sugar, ground cinnamon, blueberries, bananas, strawberries."] },
//                     { name: "Mango Sticky Oats", description: ["Coconut milk, maple syrup(optional), sliced mangoes, Sesame seed(optional).", "Warm, creamy, perfectly sweet."] }
//                 ]
//             },
//             {
//                 items: [
//                     { name: "Overnight Oats", description: ["Oats, chia seeds, honey, milk, apples, pumpkin seeds."] },
//                     { name: "Oatmeal, pumpkin seeds, seedless grapes, coconut milk, honey, apple slices." }
//                 ]
//             }
//         ]
//     }
// ];
const fullMenuData = [
    {
        categoryTitle: "Main Meals",
        columns: [
            { // Column 1
                items: [
                    { name: "STEWS & SOUP", description: ["Efo Riro Soup 9,500", "Egusi Soup 7,000", "Ogbono Soup 7,000", "Okro Soup 7,000", "Ewedu Soup"] },
                    { name: "OBE (YORUBA RED STEW) 6,000", description: ["Selected meat or fish Sauteed in a stew of slow cooked tomato, onion, and pepper mix.", "Served with a side of choice."] },
                    { name: "HOME MADE PEPPERSOUP 8,600", description: ["Spicy broth infused in herbs and spices served with your choice of fish, chicken, goat or assorted offals."] }
                ]
            },
            { // Column 2
                items: [
                    { name: "OFADA SAUCE (Ayamase) 10,000" },
                    { name: "BUKKA STEW (Naija style) 9,500" },
                    { name: "PROTEINS", description: ["Grilled Tiger Prawns 25,000", "Salmon Fillet 27,000", "Honey Glazed Spicy Chicken Wings 10,000", "Peppered Snail 15,000", "Grilled Chicken Breast 10,000", "Turkey Fingers 9,000", "Turkey Wings 9,000", "Spicy Chicken Wings 8,000"] },
                    { name: "SWALLOW", description: ["1 wrap of eba 600", "1 wrap of wheat 1,050", "1 wrap of oats swallow 1,050", "1 wrap of semo 1,050", "1 wrap of amala 6,000", "1 wrap of poundo 800"] }
                ]
            }
        ]
    },
    {
        categoryTitle: "Chef's Special",
        columns: [
            {
                items: [
                    { name: "HIGH PROTEIN BOWL 13,700", description: ["Fried & stewed Mackerel", "Chicken", "Fried eggs", "Fries."] },
                    { name: "Honey-buttered corn-cob 12,500", description: ["Crispy Irish potatoes", "Shrimps", "Veggies."] }
                ]
            },
            {
                items: [
                    { name: "ULTIMATE BUKKA COMBO 8,800", description: ["White rice", "Beans", "Stewed beef", "Fried fish", "Dodo", "Boiled egg", "Pepper sauce."] },
                    { name: "Beef gomiti Pasta (Asun pasta style) 8,500" }
                ]
            }
        ]
    },
    {
        categoryTitle: "Breakfast",
        columns: [
            {
                items: [
                    { name: "FULL NIGERIAN BREAKFAST", description: ["Boiled or fried yam with sauce of your choice and steamed veggies. 5,500", "Boiled or fried plantain with sauce of your choice and steamed veggies. 5,500"] }
                ]
            },
            {
                items: [
                    { name: "EGG & SAUCES", description: ["Nigerian egg sauce 3,300", "Plain fried eggs 1,500", "Boiled eggs 600", "Sunny-side-up egg 1,900", "Poached egg. 1,400"] },
                    { name: "Avocado Toast 13,000" }
                ]
            }
        ]
    },
    {
        categoryTitle: "Sides",
        columns: [
            {
                items: [
                    { name: "Smoky Jollof Rice 3,000" }, { name: "Fried Rice 3,500" }, { name: "Steamed Basmati Rice 2,500" },
                    { name: "Fries (sweet potatoes, yam) 2,500" }, { name: "Steamed Vegetable 3,500" }, { name: "Mashed Potatoes 6,500" }
                ]
            },
            {
                items: [
                    { name: "Stir-fry veggie 3,800" }, { name: "Fried Plantain(dodo) 1,500" }, { name: "Creamy Corn-cobs 2,700" },
                    { name: "Coleslaw 1,500" }, { name: "Guacamole 1,500" }, { name: "Steamed broccoli 6,500" }
                ]
            }
        ]
    },
    // --- NEWLY ADDED SAUCE SECTION ---
    {
        categoryTitle: "Sauce",
        columns: [
            {
                items: [
                    { name: "SMOKED CHICKEN SAUCE 4,500", description: ["Smoked chicken with tomato sauce, mixed with veggies."] }
                ]
            },
            {
                items: [
                    { name: "Fish Sauce 3,400" },
                    { name: "Naija Pepper Sauce 950" },
                    { name: "Gizdodo/Beefdodo 5,500" },
                    { name: "Mixed Herb Sauce 2,600" }
                ]
            }
        ]
    },
    // --- NEWLY ADDED SALAD SECTION ---
    {
        categoryTitle: "Salad",
        columns: [
            {
                items: [
                    { name: "MIXED VEGGIES SALAD 7,500", description: ["Cabbage, lettuce, raisins, carrot, corn, garlic croutons & chicken breast."] },
                    { name: "PRAWN SALAD 10,500", description: ["Grilled prawn and shrimp, cherry tomatoes, lettuce, cabbage & nuts finished with dressing."] }
                ]
            },
            {
                items: [
                    { name: "FRUIT SALAD 11,700", description: ["Pineapples, strawberries, blueberries, grapes, kiwi, clementines with honey and lemon dressing."] },
                    { name: "Potato and chicken salad 8,300", description: ["mixed with veggies and beetroot."] },
                    { name: "Cucumber & avocado salad 6,500", description: ["mixed with eggs & chicken."] }
                ]
            }
        ]
    },
    {
        categoryTitle: "Raw-Cold Pressed Juices",
        columns: [
            {
                items: [
                    { name: "NATURAL RETINOL 5,000", description: ["Carrot, orange & ginger juice."] },
                    { name: "GREEN JUICE 5,500", description: ["Apple, spinach, pineapple, cucumber, lemon 7 ginger."] },
                    { name: "Pineapple ginger juice 5,500" },
                    { name: "Watermelon refresher 4,500" }
                ]
            },
            {
                items: [
                    { name: "IMMUNITY BOOSTER 5,500", description: ["Lemon, lime, tumeric, cucumber, ginger & pineapple."] },
                    { name: "SWEET SUNSHINE 6,500", description: ["Oranges, clementines, & strawberry juice."] }
                ]
            }
        ]
    },
    {
        categoryTitle: "Yoghurt Bowls",
        columns: [
            {
                items: [
                    { name: "MORNING FUEL 8,500", description: ["Sweetened greek yoghurt, Granola, plum, kiwi, honey, with nuts & seed.", "(specify if allergic)"] },
                    { name: "YOGHURT PARFAIT 8,500", description: ["Greek yoghurt, almonds, granola, blueberries, strawberries, honey."] }
                ]
            },
            {
                items: [
                    { name: "CHIA PUDDING BOWL 7,500", description: ["Sweetened/unsweetened greek yoghurt, golden raisins, chia pudding, apples, dried cranberries, kiwi."] },
                    { name: "SUPER FOOD BOWL 10,000", description: ["Vegan yoghurt, bananas, passionfruit, plum, sunflower seeds, walnuts, apple slices."] }
                ]
            }
        ]
    },
    {
        categoryTitle: "Oatmeal Bowls",
        columns: [
            {
                items: [
                    { name: "OATS PORRIDGE 8,000", description: ["Oats, white milk, sugar, ground cinnamon, blueberries, bananas, strawberries."] },
                    { name: "MANGO STICKY OATS 6,500", description: ["Coconut milk, maple syrup(optional), sliced mangoes, Sesame seed(optional).", "Warm, creamy, perfectly sweet."] }
                ]
            },
            {
                items: [
                    { name: "OVERNIGHT OATS 6,500", description: ["Oats, chia seeds, honey, milk, apples, pumpkin seeds."] },
                    { name: "Oatmeal, pumpkin seeds, seedless grapes, coconut milk, honey, apple slices. 8,000" }
                ]
            }
        ]
    }
];

const MenuSection = ({ title, columns, id, navigate }) => {
    return (
        <section id={id} className="w-full max-w-5xl mx-auto py-16 scroll-mt-20">
            <div className="text-center">
                <h2 className="font-display text-4xl text-stone-100 tracking-widest uppercase">{title}</h2>
                <div className="w-48 h-[1px] bg-stone-200/50 mx-auto mt-4 mb-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-y-6">
                        {column.items.map((item, itemIndex) => (
                            <div key={itemIndex}>
                                <h3 className="font-sans font-semibold text-stone-200 tracking-wider uppercase">
                                    {item.name}
                                </h3>
                                {item.description && item.description.map((line, lineIndex) => (
                                    <p key={lineIndex} className="font-sans text-stone-400 text-sm mt-1">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button className="font-sans font-semibold text-black bg-stone-200 px-8 py-3 rounded-lg hover:bg-white transition-colors duration-300"
                    onClick={() => {
                        navigate('/order');
                        console.log('Order placed');
                    }}>
                    Place an Order
                </button>
            </div>
        </section>
    );
};


const DetailedMenuPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const createSlug = (title) => title.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className="relative w-full bg-black text-stone-200">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: `url(${bg})`,
                }}
            />
            <div className="bg-black/80 relative z-20 flex flex-col min-h-screen">
                {/* Content */}
                <main className="relative z-20 pt-12 pb-4 px-4">
                    {fullMenuData.map((section, index) => (
                        <MenuSection
                            key={index}
                            title={section.categoryTitle}
                            columns={section.columns}
                            id={createSlug(section.categoryTitle)}
                            navigate={navigate}

                        />
                    ))}
                </main>
            </div>

        </div>
    );
};

export default DetailedMenuPage;