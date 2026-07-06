// import React from 'react';
// import bg from '/bg-img.png'
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const InfoCard = ({ title, description, buttonText, onClick }) => {
//   return (
//     <div className=" w-full max-w-sm border border-stone-200/20 rounded-[2rem] p-8 bg-black/20 backdrop-blur-sm flex flex-col items-center text-center gap-4">
//       <h2 className="font-display text-[40px] text-stone-100  uppercase">
//         {title}
//       </h2>
//       <p className="font-sans text-stone-200">
//         {description}
//       </p>
//       <button className="
//         font-sans text-lg text-stone-100  border border-stone-200/60 rounded-lg  px-6 py-2 mt-4 cursor-pointer "
//         onClick={onClick}>
//         {buttonText}
//       </button>
//     </div>
//   );
// };

// function HomePage() {
//   const navigate = useNavigate();
//   return (
//     <div className="relative min-h-screen w-full text-stone-200">
//       <div
//         className="absolute inset-0 bg-cover bg-center z-0"
//         style={{
//           backgroundImage: `url(${bg})`,
//         }}
//       />

//       <div className="bg-black/80 relative z-20 flex flex-col min-h-screen">


//         <main className="grow flex flex-col items-center justify-center p-4 pt-32">
//           <div className=" w-32 h-48 mb-8 border border-stone-200/20 rounded-[2rem] p-8 bg-black/20 backdrop-blur-sm flex items-center justify-center">
//             <span className="font-serif text-[110px] text-stone-100">K</span>
//           </div>

//           <div className="flex flex-col items-center gap-8">
//             <InfoCard
//               title="Menu"
//               description="See all our dishes, categories, and prices. Order instantly."
//               buttonText="Browse Menu"
//               onClick={() => navigate('/menu')}
//             />
//             <InfoCard
//               title="Meal Plan"
//               description="Tell us your goals and we'll recommend the perfect weekly meal plan."
//               buttonText="Choose a Meal Plan"
//               onClick={() => navigate('/meal-plan')}
//             />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default HomePage;



import React from 'react';
import bg from '/bg-img.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // 1. Import Framer Motion

// --- Animation Variants ---
// This parent container will orchestrate the animation of its children.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Adds a 0.3s delay between each child animating in
    },
  },
};

// This defines the animation for each individual card (slide up and fade in).
const cardVariants = {
  hidden: { y: 50, opacity: 0 }, // Start 50px below and invisible
  visible: {
    y: 0,
    opacity: 1, // End at its original position and fully visible
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// 2. Modify InfoCard to be an animatable motion component
const InfoCard = ({ title, description, buttonText, onClick }) => {
  return (
    // We pass the cardVariants to this motion.div
    <motion.div
      variants={cardVariants}
      className="w-full max-w-sm border border-stone-200/20 rounded-[2rem] p-8 bg-black/20 backdrop-blur-sm flex flex-col items-center text-center gap-4"
    >
      <h2 className="font-display text-[40px] text-stone-100 uppercase">{title}</h2>
      <p className="font-sans text-stone-200">{description}</p>
      <button
        className="font-sans text-lg text-stone-100 border border-stone-200/60 rounded-lg px-6 py-2 mt-4 cursor-pointer hover:bg-stone-800 transition-colors"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full text-stone-200">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <div className="bg-black/80 relative z-20 flex flex-col min-h-screen">
        <main className="grow flex flex-col items-center justify-center p-4 pt-32">
          {/* 3. Wrap all animating elements in the motion container */}
          <motion.div
            className="flex flex-col items-center gap-8"
            variants={containerVariants}
            initial="hidden" // Start in the 'hidden' state
            animate="visible" // Animate to the 'visible' state on load
          >
            {/* The "K" logo card */}
            <motion.div
              variants={cardVariants}
              className="w-32 h-48 border border-stone-200/20 rounded-[2rem] p-8 bg-black/20 backdrop-blur-sm flex items-center justify-center"
            >
              <span className="font-serif text-[110px] text-stone-100">K</span>
            </motion.div>

            {/* The InfoCards */}
            <InfoCard
              title="Menu"
              description="See all our dishes, categories, and prices. Order instantly."
              buttonText="Browse Menu"
              onClick={() => navigate('/menu')}
            />
            <InfoCard
              title="Meal Plan"
              description="Tell us your goals and we'll recommend the perfect weekly meal plan."
              buttonText="Choose a Meal Plan"
              onClick={() => navigate('/meal-plan')}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
