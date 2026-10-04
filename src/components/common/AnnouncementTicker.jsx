import React from 'react';
import { Tag, Sparkles, Truck, Flame } from 'lucide-react';
import { FLASH_DEALS } from '../../data/products';

export const AnnouncementTicker = () => {
  return (
    <aside aria-label="Announcement ticker" className="bg-[#111111] text-white py-2 text-xs font-semibold tracking-wider uppercase border-b border-neutral-800 overflow-hidden relative select-none">
      <div className="flex w-max animate-marquee space-x-12 items-center">
        {/* Double the list to create a seamless infinite marquee */}/*
        {[...FLASH_DEALS, ...FLASH_DEALS].map((deal, idx) => (
          <div key={idx} className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors cursor-pointer">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#FF3E6C] text-white">
              HOT DROP
            </span>
            <span className="font-medium tracking-normal text-xs">{deal.text}</span>
            <span className="text-neutral-600 font-bold">•</span>
          </div>
        ))}
      </div>
    </aside>
  );
};
