import React from 'react';
import { Truck, Flame } from 'lucide-react';
import { FLASH_DEALS } from '../../data/products';

export const AnnouncementTicker = () => {
  const items = Array.isArray(FLASH_DEALS) && FLASH_DEALS.length
    ? [...FLASH_DEALS, ...FLASH_DEALS, ...FLASH_DEALS]
    : [
        { text: 'FREE EXPRESS SHIPPING ON QUALIFYING ORDERS' },
        { text: 'NEW DROPS LIVE NOW' },
        { text: 'HYPED20 · 20% OFF SELECT DROPS' }
      ];

  return (
    <aside aria-label="Announcement ticker" className="bg-[#111111] text-white py-2.5 text-xs font-semibold tracking-wider uppercase border-b border-neutral-800 overflow-hidden relative select-none">
      <div className="ticker-track flex w-max items-center hover:[animation-play-state:paused]">
        {items.map((deal, idx) => (
          <div key={`${deal.text}-${idx}`} className="flex items-center space-x-3 px-8 text-neutral-300 hover:text-white transition-colors">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#FF3E6C] text-white">
              HOT DROP
            </span>
            <span className="font-medium tracking-normal text-xs whitespace-nowrap">{deal.text}</span>
            <span className="text-neutral-600 font-bold">•</span>
            <Flame className="w-3 h-3 text-[#FFA41C] fill-[#FFA41C] shrink-0" />
          </div>
        ))}
      </div>
    </aside>
  );
};
