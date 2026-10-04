/*import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Truck, 
  MapPin, 
  Check, 
  Clock, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderTrackingPage = () => {
  const { placedOrder, navigateTo } = useStore();
  const [orderQuery, setOrderQuery] = useState(placedOrder ? placedOrder.orderId : 'HYP-884210');
  const [currentStage, setCurrentStage] = useState(2); // In transit

  const steps = [
    { title: 'Order Confirmed', time: 'Oct 04, 10:15 AM', location: 'HYPED Vault #01, CA', status: 'done' },
    { title: 'Dispatched & Manifested', time: 'Oct 04, 02:45 PM', location: 'FedEx SuperHub, Los Angeles', status: 'done' },
    { title: 'In Transit / Aviation Hub', time: 'Oct 05, 08:30 AM', location: 'En Route to Regional Hub', status: 'current' },
    { title: 'Out For Delivery', time: 'Expected Wednesday', location: 'Local Courier Fleet', status: 'pending' },
    { title: 'Delivered', time: 'Expected by 6:00 PM', location: 'Recipient Doorstep', status: 'pending' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF3E6C]">
          Amazon-Grade Carrier Tracking
        </span>
        <h1 className="text-3xl font-black uppercase text-neutral-900 tracking-tight">
          Track Your Live Shipment
        </h1>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Enter your 6-digit Order Tracking ID to inspect real-time carrier checkpoints and live delivery estimates.
        </p>
      </div>

      {/* Search Order ID Bar */}
      <div className="max-w-md mx-auto">
        <div className="flex rounded-2xl border-2 border-neutral-200 bg-white p-1.5 shadow-sm focus-within:border-black">
          <input
            type="text"
            placeholder="e.g. HYP-884210"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="flex-1 px-3 py-2 text-xs font-mono font-bold text-neutral-900 uppercase focus:outline-none"
          />
          <button className="px-5 py-2.5 bg-black text-white font-bold text-xs uppercase rounded-xl hover:bg-neutral-800 transition-colors">
            Track
          </button>
        </div>
      </div>

      {/* Shipment Status Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Top Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-neutral-400">Tracking Code:</span>
              <span className="font-mono text-xs font-black text-neutral-900">{orderQuery}</span>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                ON TIME
              </span>
            </div>
            <h3 className="text-xl font-black uppercase text-neutral-900 mt-1">
              Estimated Delivery: Wednesday, Oct 7
            </h3>
            <p className="text-xs text-neutral-500">Carrier: FedEx Priority Air Express (Standard Street Delivery)</p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-neutral-400 block">Destination</span>
            <span className="text-xs font-bold text-neutral-800 block">
              {placedOrder ? `${placedOrder.address.city}, ${placedOrder.address.state}` : 'Beverly Hills, CA 90210'}
            </span>
          </div>
        </div>

        {/* Vertical Milestones Timeline */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-neutral-200 before:z-0">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStage;
            const isCurrent = idx === currentStage;
            return (
              <div key={idx} className="relative z-10 flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all ${
                  isCurrent
                    ? 'bg-[#FF3E6C] text-white ring-4 ring-rose-100'
                    : isCompleted
                    ? 'bg-black text-[#FFA41C]'
                    : 'bg-neutral-100 text-neutral-400'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Clock className="w-4 h-4" />}
                </div>

                <div className="flex-1 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`text-xs font-black uppercase tracking-wider ${isCurrent ? 'text-[#FF3E6C]' : 'text-neutral-900'}`}>
                      {step.title}
                    </h4>
                    <span className="text-[11px] font-bold text-neutral-500 font-mono">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{step.location}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper */}
        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Package requires OTP verification at time of delivery</span>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-black hover:text-[#FF3E6C] flex items-center space-x-1"
          >
            <span>Back to Drops Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};/*
