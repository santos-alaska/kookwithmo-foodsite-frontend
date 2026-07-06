
import React from 'react';
import MenuCategoryCard from '../components/MenuCategoryCard';
import bg from '/bg-img.png'


// Store all menu data in an array of objects for easy management
const menuData = [
    {
        imageSrc: '/menu-img1.jpg',
        title: 'Main Meals',
        slug: 'main-meals',
        description: 'Hearty, satisfying dishes made for your biggest cravings, crafted with rich flavors and balanced nutrition.',
        buttonText: 'Explore Main Meal',
        imagePosition: 'left',
    },
    {
        imageSrc: '/menu-img2.jpg',
        title: 'Chef\'s Special',
        slug: 'chef-s-special',
        description: 'Signature dishes you won\'t find anywhere else: chef-crafted, exclusive, and packed with unforgettable taste.',
        buttonText: 'Try the Chef\'s Special',
        imagePosition: 'right',
    },
    {
        imageSrc: '/menu-img3.jpg',
        title: 'Breakfast',
        slug: 'breakfast',
        description: 'Fresh, energizing breakfasts to start your day right, from light bites to full, power-packed plates.',
        buttonText: 'Order Breakfast',
        imagePosition: 'left',
    },
    {
        imageSrc: '/menu-img4.jpg',
        title: 'Sides',
        slug: 'sides',
        description: 'Perfect add-ons to complete your meal, crunchy, creamy, or savory sides that elevates every plates.',
        buttonText: 'Add a Side',
        imagePosition: 'right',
    },
    {
        imageSrc: '/menu-img5.jpg',
        title: 'Sauce',
        slug: 'sauce',
        description: 'Rich, flavorful sauces prepared to elevate every meal. From spicy to creamy, each one adds the perfect finishing touch.',
        buttonText: 'See Sauces',
        imagePosition: 'left',
    },
    {
        imageSrc: '/menu-img6.jpg',
        title: 'Salads',
        slug: 'salads',
        description: 'Colorful, nutrient-rich salads made with fresh ingredients. Light, refreshing, and deliciously healthy.',
        buttonText: 'View Salads',
        imagePosition: 'right',
    },
    {
        imageSrc: '/menu-img7.jpg',
        title: 'Yoghurt Bowls',
        slug: 'yoghurt-bowls',
        description: 'Whether you crave a cool, creamy yoghurt bowl or a warm, cozy oatmeal blend, these bowls deliver, comfort flavor and nourishment in every bite.',
        buttonText: 'Browse Yoghurt Bowls',
        imagePosition: 'left',
    },
    {
        imageSrc: '/menu-img8.jpg',
        title: 'Fresh Drinks',
        slug: 'raw-cold-pressed-juices',
        description: 'Refreshing beverages and natural juices to cool, energize, and complement your meal perfectly.',
        buttonText: 'See Drinks & Juices',
        imagePosition: 'right',
    },
    {
        imageSrc: '/menu-img9.jpg',
        title: 'Oat Meal Bowls',
        slug: 'oatmeal-bowls',
        description: 'Whether you crave a cool, creamy yoghurt bowl or a warm, cozy oatmeal blend, these bowls deliver, comfort flavor and nourishment in every bite.',
        buttonText: 'Browse Healthy Bowls',
        imagePosition: 'left',
    },
];


const MenuPage = () => {
    return (
        <div className="relative w-full bg-black text-stone-200">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: `url(${bg})`,
                }}
            />
            <div className="bg-black/80 relative z-20 flex flex-col min-h-screen">

                {/* Main Content */}
                <div className="relative z-20 flex flex-col items-center py-20 px-4">

                    {/* Header Section */}
                    <header className="text-center mb-16 mt-10 md:mt-14">
                        <h2 className="font-sans text-stone-300 tracking-[0.3em] uppercase">
                            Discover
                        </h2>
                        <h1 className="font-display text-5xl md:text-6xl text-stone-100 tracking-wider my-2">
                            OUR MENU
                        </h1>
                        <p className="font-sans text-stone-300 max-w-xl mx-auto">
                            Explore a curated selection of meals, drinks, and treats made to satisfy every craving.
                        </p>
                    </header>

                    {/* Menu Cards Section */}
                    <div className="flex flex-col items-center gap-10 w-full">
                        {menuData.map((item, index) => (
                            <MenuCategoryCard
                                key={index}
                                imageSrc={item.imageSrc}
                                title={item.title}
                                description={item.description}
                                buttonText={item.buttonText}
                                imagePosition={item.imagePosition}
                                slug={item.slug}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MenuPage;