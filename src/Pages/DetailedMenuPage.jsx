import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '/bg-img.png';
import { useMenuPrices } from '../hooks/useMenuPrices';

// ─────────────────────────────────────────────────────────────────────────────
// fullMenuData — prices are now stored as { productRef, fallbackPrice } so
// the component can look them up live from the database.
//
// Each item can be one of:
//   { label, productRef, fallbackPrice, description }  ← single product with heading
//   { heading, subItems: [{ productRef, fallbackPrice }] } ← heading + list of priced items
// ─────────────────────────────────────────────────────────────────────────────
const fullMenuData = [
    {
        categoryTitle: "Main Meals",
        columns: [
            {
                items: [
                    {
                        heading: "STEWS & SOUP",
                        subItems: [
                            { productRef: "Efo Riro Soup", fallbackPrice: 9500 },
                            { productRef: "Egusi Soup", fallbackPrice: 7000 },
                            { productRef: "Ogbono Soup", fallbackPrice: 7000 },
                            { productRef: "Okro Soup", fallbackPrice: 7000 },
                            { productRef: "Ewedu Soup", fallbackPrice: null },
                        ]
                    },
                    {
                        label: "OBE (YORUBA RED STEW)",
                        productRef: "Obe (Yoruba Red Stew)",
                        fallbackPrice: 6000,
                        description: ["Selected meat or fish Sauteed in a stew of slow cooked tomato, onion, and pepper mix.", "Served with a side of choice."]
                    },
                    {
                        label: "HOME MADE PEPPERSOUP",
                        productRef: "Home Made Peppersoup",
                        fallbackPrice: 8600,
                        description: ["Spicy broth infused in herbs and spices served with your choice of fish, chicken, goat or assorted offals."]
                    },
                ]
            },
            {
                items: [
                    { label: "OFADA SAUCE (Ayamase)", productRef: "Ofada Sauce (Ayamase)", fallbackPrice: 10000 },
                    { label: "BUKKA STEW (Naija style)", productRef: "Bukka Stew (Naija style)", fallbackPrice: 9500 },
                    {
                        heading: "PROTEINS",
                        subItems: [
                            { productRef: "Grilled Tiger Prawns", fallbackPrice: 25000 },
                            { productRef: "Salmon Fillet", fallbackPrice: 27000 },
                            { productRef: "Honey Glazed Spicy Chicken Wings", fallbackPrice: 10000 },
                            { productRef: "Peppered Snail", fallbackPrice: 15000 },
                            { productRef: "Grilled Chicken Breast", fallbackPrice: 10000 },
                            { productRef: "Turkey Fingers", fallbackPrice: 9000 },
                            { productRef: "Turkey Wings", fallbackPrice: 9000 },
                            { productRef: "Spicy Chicken Wings", fallbackPrice: 8000 },
                        ]
                    },
                    {
                        heading: "SWALLOW",
                        subItems: [
                            { productRef: "1 wrap of eba", fallbackPrice: 600 },
                            { productRef: "1 wrap of wheat", fallbackPrice: 1050 },
                            { productRef: "1 wrap of oats swallow", fallbackPrice: 1050 },
                            { productRef: "1 wrap of semo", fallbackPrice: 1050 },
                            { productRef: "1 wrap of amala", fallbackPrice: 6000 },
                            { productRef: "1 wrap of poundo", fallbackPrice: 800 },
                        ]
                    },
                ]
            }
        ]
    },
    {
        categoryTitle: "Chef's Special",
        columns: [
            {
                items: [
                    {
                        label: "HIGH PROTEIN BOWL",
                        productRef: "High Protein Bowl",
                        fallbackPrice: 13700,
                        description: ["Fried & stewed Mackerel", "Chicken", "Fried eggs", "Fries."]
                    },
                    {
                        label: "Honey-buttered corn-cob",
                        productRef: "Honey-buttered corn-cob",
                        fallbackPrice: 12500,
                        description: ["Crispy Irish potatoes", "Shrimps", "Veggies."]
                    },
                ]
            },
            {
                items: [
                    {
                        label: "ULTIMATE BUKKA COMBO",
                        productRef: "Ultimate Bukka Combo",
                        fallbackPrice: 8800,
                        description: ["White rice", "Beans", "Stewed beef", "Fried fish", "Dodo", "Boiled egg", "Pepper sauce."]
                    },
                    {
                        label: "Beef gomiti Pasta (Asun pasta style)",
                        productRef: "Beef gomiti Pasta (Asun pasta style)",
                        fallbackPrice: 8500,
                    },
                ]
            }
        ]
    },
    {
        categoryTitle: "Breakfast",
        columns: [
            {
                items: [
                    {
                        heading: "FULL NIGERIAN BREAKFAST",
                        subItems: [
                            { productRef: "Boiled yam with sauce of choice", label: "Boiled or fried yam with sauce of your choice and steamed veggies.", fallbackPrice: 5500 },
                            { productRef: "Boiled plantain with sauce of choice", label: "Boiled or fried plantain with sauce of your choice and steamed veggies.", fallbackPrice: 5500 },
                        ]
                    },
                ]
            },
            {
                items: [
                    {
                        heading: "EGG & SAUCES",
                        subItems: [
                            { productRef: "Nigerian egg sauce", fallbackPrice: 3300 },
                            { productRef: "Plain fried eggs", fallbackPrice: 1500 },
                            { productRef: "Boiled eggs", fallbackPrice: 600 },
                            { productRef: "Sunny-side-up egg", fallbackPrice: 1900 },
                            { productRef: "Poached egg", fallbackPrice: 1400 },
                        ]
                    },
                    { label: "Avocado Toast", productRef: "Avocado Toast", fallbackPrice: 13000 },
                ]
            }
        ]
    },
    {
        categoryTitle: "Sides",
        columns: [
            {
                items: [
                    { label: "Smoky Jollof Rice", productRef: "Smoky Jollof Rice", fallbackPrice: 3000 },
                    { label: "Fried Rice", productRef: "Fried Rice", fallbackPrice: 3500 },
                    { label: "Steamed Basmati Rice", productRef: "Steamed Basmati Rice", fallbackPrice: 2500 },
                    { label: "Fries (sweet potatoes, yam)", productRef: "Fries (sweet potatoes, yam)", fallbackPrice: 2500 },
                    { label: "Steamed Vegetable", productRef: "Steamed Vegetable", fallbackPrice: 3500 },
                    { label: "Mashed Potatoes", productRef: "Mashed Potatoes", fallbackPrice: 6500 },
                ]
            },
            {
                items: [
                    { label: "Stir-fry veggie", productRef: "Stir-fry veggie", fallbackPrice: 3800 },
                    { label: "Fried Plantain (dodo)", productRef: "Fried Plantain (dodo)", fallbackPrice: 1500 },
                    { label: "Creamy Corn-cobs", productRef: "Creamy Corn-cobs", fallbackPrice: 2700 },
                    { label: "Coleslaw", productRef: "Coleslaw", fallbackPrice: 1500 },
                    { label: "Guacamole", productRef: "Guacamole", fallbackPrice: 1500 },
                    { label: "Steamed broccoli", productRef: "Steamed broccoli", fallbackPrice: 6500 },
                ]
            }
        ]
    },
    {
        categoryTitle: "Sauce",
        columns: [
            {
                items: [
                    {
                        label: "SMOKED CHICKEN SAUCE",
                        productRef: "Smoked Chicken Sauce",
                        fallbackPrice: 4500,
                        description: ["Smoked chicken with tomato sauce, mixed with veggies."]
                    },
                ]
            },
            {
                items: [
                    { label: "Fish Sauce", productRef: "Fish Sauce", fallbackPrice: 3400 },
                    { label: "Naija Pepper Sauce", productRef: "Naija Pepper Sauce", fallbackPrice: 950 },
                    { label: "Gizdodo/Beefdodo", productRef: "Gizdodo/Beefdodo", fallbackPrice: 5500 },
                    { label: "Mixed Herb Sauce", productRef: "Mixed Herb Sauce", fallbackPrice: 2600 },
                ]
            }
        ]
    },
    {
        categoryTitle: "Salad",
        columns: [
            {
                items: [
                    {
                        label: "MIXED VEGGIES SALAD",
                        productRef: "Mixed Veggies Salad",
                        fallbackPrice: 7500,
                        description: ["Cabbage, lettuce, raisins, carrot, corn, garlic croutons & chicken breast."]
                    },
                    {
                        label: "PRAWN SALAD",
                        productRef: "Prawn Salad",
                        fallbackPrice: 10500,
                        description: ["Grilled prawn and shrimp, cherry tomatoes, lettuce, cabbage & nuts finished with dressing."]
                    },
                ]
            },
            {
                items: [
                    {
                        label: "FRUIT SALAD",
                        productRef: "Fruit Salad",
                        fallbackPrice: 11700,
                        description: ["Pineapples, strawberries, blueberries, grapes, kiwi, clementines with honey and lemon dressing."]
                    },
                    {
                        label: "Potato and chicken salad",
                        productRef: "Potato and chicken salad",
                        fallbackPrice: 8300,
                        description: ["mixed with veggies and beetroot."]
                    },
                    {
                        label: "Cucumber & avocado salad",
                        productRef: "Cucumber & avocado salad",
                        fallbackPrice: 6500,
                        description: ["mixed with eggs & chicken."]
                    },
                ]
            }
        ]
    },
    {
        categoryTitle: "Raw-Cold Pressed Juices",
        columns: [
            {
                items: [
                    {
                        label: "NATURAL RETINOL",
                        productRef: "Natural Retinol",
                        fallbackPrice: 5000,
                        description: ["Carrot, orange & ginger juice."]
                    },
                    {
                        label: "GREEN JUICE",
                        productRef: "Green Juice",
                        fallbackPrice: 5500,
                        description: ["Apple, spinach, pineapple, cucumber, lemon & ginger."]
                    },
                    { label: "Pineapple ginger juice", productRef: "Pineapple ginger juice", fallbackPrice: 5500 },
                    { label: "Watermelon refresher", productRef: "Watermelon refresher", fallbackPrice: 4500 },
                ]
            },
            {
                items: [
                    {
                        label: "IMMUNITY BOOSTER",
                        productRef: "Immunity Booster",
                        fallbackPrice: 5500,
                        description: ["Lemon, lime, tumeric, cucumber, ginger & pineapple."]
                    },
                    {
                        label: "SWEET SUNSHINE",
                        productRef: "Sweet Sunshine",
                        fallbackPrice: 6500,
                        description: ["Oranges, clementines, & strawberry juice."]
                    },
                ]
            }
        ]
    },
    {
        categoryTitle: "Yoghurt Bowls",
        columns: [
            {
                items: [
                    {
                        label: "MORNING FUEL",
                        productRef: "Morning Fuel",
                        fallbackPrice: 8500,
                        description: ["Sweetened greek yoghurt, Granola, plum, kiwi, honey, with nuts & seed.", "(specify if allergic)"]
                    },
                    {
                        label: "YOGHURT PARFAIT",
                        productRef: "Yoghurt Parfait",
                        fallbackPrice: 8500,
                        description: ["Greek yoghurt, almonds, granola, blueberries, strawberries, honey."]
                    },
                ]
            },
            {
                items: [
                    {
                        label: "CHIA PUDDING BOWL",
                        productRef: "Chia Pudding Bowl",
                        fallbackPrice: 7500,
                        description: ["Sweetened/unsweetened greek yoghurt, golden raisins, chia pudding, apples, dried cranberries, kiwi."]
                    },
                    {
                        label: "SUPER FOOD BOWL",
                        productRef: "Super Food Bowl",
                        fallbackPrice: 10000,
                        description: ["Vegan yoghurt, bananas, passionfruit, plum, sunflower seeds, walnuts, apple slices."]
                    },
                ]
            }
        ]
    },
    {
        categoryTitle: "Oatmeal Bowls",
        columns: [
            {
                items: [
                    {
                        label: "OATS PORRIDGE",
                        productRef: "Oats Porridge",
                        fallbackPrice: 8000,
                        description: ["Oats, white milk, sugar, ground cinnamon, blueberries, bananas, strawberries."]
                    },
                    {
                        label: "MANGO STICKY OATS",
                        productRef: "Mango Sticky Oats",
                        fallbackPrice: 6500,
                        description: ["Coconut milk, maple syrup(optional), sliced mangoes, Sesame seed(optional).", "Warm, creamy, perfectly sweet."]
                    },
                ]
            },
            {
                items: [
                    {
                        label: "OVERNIGHT OATS",
                        productRef: "Overnight Oats",
                        fallbackPrice: 6500,
                        description: ["Oats, chia seeds, honey, milk, apples, pumpkin seeds."]
                    },
                    {
                        label: "Oatmeal with toppings",
                        productRef: "Oatmeal with toppings",
                        fallbackPrice: 8000,
                        description: ["Pumpkin seeds, seedless grapes, coconut milk, honey, apple slices."]
                    },
                ]
            }
        ]
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: formats a price number as ₦9,500 or returns "" if null
// ─────────────────────────────────────────────────────────────────────────────
const fmt = (price) =>
    price !== null && price !== undefined
        ? ` ₦${Number(price).toLocaleString()}`
        : '';


// ─────────────────────────────────────────────────────────────────────────────
// MenuSection — renders one category block
// ─────────────────────────────────────────────────────────────────────────────
const MenuSection = ({ title, columns, id, navigate, getPriceByName }) => {
    return (
        <section id={id} className="w-full max-w-5xl mx-auto py-16 scroll-mt-20">
            <div className="text-center">
                <h2 className="font-display text-4xl text-stone-100 tracking-widest uppercase">{title}</h2>
                <div className="w-48 h-[1px] bg-stone-200/50 mx-auto mt-4 mb-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-y-6">
                        {column.items.map((item, itemIndex) => {
                            // ── Heading + subItems (e.g. STEWS & SOUP, PROTEINS) ──
                            if (item.heading) {
                                return (
                                    <div key={itemIndex}>
                                        <h3 className="font-sans font-semibold text-stone-200 tracking-wider uppercase">
                                            {item.heading}
                                        </h3>
                                        {item.subItems.map((sub, si) => {
                                            const livePrice = getPriceByName(sub.productRef, sub.fallbackPrice);
                                            return (
                                                <p key={si} className="font-sans text-stone-400 text-sm mt-1">
                                                    {sub.label || sub.productRef}
                                                    {fmt(livePrice)}
                                                </p>
                                            );
                                        })}
                                    </div>
                                );
                            }

                            // ── Single item with optional description ──
                            const livePrice = getPriceByName(item.productRef, item.fallbackPrice);
                            return (
                                <div key={itemIndex}>
                                    <h3 className="font-sans font-semibold text-stone-200 tracking-wider uppercase">
                                        {item.label || item.productRef}
                                        <span className="text-stone-400 font-normal">{fmt(livePrice)}</span>
                                    </h3>
                                    {item.description && item.description.map((line, li) => (
                                        <p key={li} className="font-sans text-stone-400 text-sm mt-1">{line}</p>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    className="font-sans font-semibold text-black bg-stone-200 px-8 py-3 rounded-lg hover:bg-white transition-colors duration-300"
                    onClick={() => navigate('/order')}
                >
                    Place an Order
                </button>
            </div>
        </section>
    );
};


// ─────────────────────────────────────────────────────────────────────────────
// DetailedMenuPage
// ─────────────────────────────────────────────────────────────────────────────
const DetailedMenuPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { getPriceByName } = useMenuPrices();

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
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="bg-black/80 relative z-20 flex flex-col min-h-screen">
                <main className="relative z-20 pt-12 pb-4 px-4">
                    {fullMenuData.map((section, index) => (
                        <MenuSection
                            key={index}
                            title={section.categoryTitle}
                            columns={section.columns}
                            id={createSlug(section.categoryTitle)}
                            navigate={navigate}
                            getPriceByName={getPriceByName}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default DetailedMenuPage;