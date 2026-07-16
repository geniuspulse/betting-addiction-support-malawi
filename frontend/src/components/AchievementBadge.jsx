import React from 'react';

export default function AchievementBadge({ badge }) {
  const { id, nameEn, nameNy, descEn, descNy, icon, unlocked, date } = badge;

  return (
    <div className={`relative flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 ${
      unlocked 
        ? 'bg-white border-yellow-200 shadow-md scale-100 hover:scale-105' 
        : 'bg-gray-50 border-gray-100 opacity-60'
    }`}>
      {/* Icon Sphere */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner ${
        unlocked 
          ? 'bg-gradient-to-br from-yellow-100 to-amber-200 text-amber-800 border-2 border-yellow-300' 
          : 'bg-gray-200 text-gray-400 border-2 border-gray-300'
      }`}>
        {icon}
      </div>

      {/* Badge Name */}
      <h4 className={`text-sm font-bold text-center ${unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
        {nameEn}
      </h4>
      <p className="text-[10px] text-gray-400 text-center italic mt-0.5">
        {nameNy}
      </p>

      {/* Description */}
      <p className="text-xs text-gray-600 text-center mt-2 leading-tight">
        {descEn}
      </p>
      
      {/* Unlocked Date or Lock Icon */}
      {unlocked ? (
        <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-3 font-semibold">
          🎉 {date || 'Unlocked'}
        </span>
      ) : (
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mt-3">
          🔒 Locked
        </span>
      )}
    </div>
  );
}
