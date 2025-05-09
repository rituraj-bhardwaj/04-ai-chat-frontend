import React from 'react';

const Cards = () => {
  return (
    <div 
      className='w-[300px] h-[200px] bg-[#343D4B] text-white p-4 flex flex-col justify-around items-center rounded-xl shadow hover:scale-105 transition-all duration-300'
    >
      <div className="text-xl font-semibold mb-2">🤖 Chat-AI says</div>
      <p className="text-sm text-gray-300">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolores? Praesentium laudantium sapiente consequuntur nulla!</p>
    </div>
  );
};

export default Cards;