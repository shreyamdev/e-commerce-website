import React, { useState } from 'react';
import { 
  Check, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Package, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  ArrowLeft,
  QrCode,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export const CheckoutPage = () => {
  const { cartItems, grandTotal, subtotal, discountAmount, shippingFee, appliedCoupon, clearCart } = useCart();
  const { navigateTo, placedOrder, setPlacedOrder } = useStore();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [addressForm, setAddressForm] = useState({
    fullName: 'Alex Rivera',
    email: 'alex.hype@college.edu',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'Metro City',
    state: 'California',
    zipCode: '90210',
    phone: '+1 (555) 234-8901'
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'cod'
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'Alex Rivera',
    expiry: '12/28',
    cvv: '•••'
  });

  // Timeline tracking stage for confirmation screen
  const [orderStage, setOrderStage] = useState(1); // 0: Placed, 1: Packed, 2: Shipped, 3: Out for Delivery, 4: Delivered

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const orderId = `HYP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      items: [...cartItems],
      total: grandTotal,
      subtotal,
      discountAmount,
      shippingFee,
      coupon: appliedCoupon ? appliedCoupon.code : null,
      address: { ...addressForm },
      paymentMethod,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      estimatedDelivery: 'Oct 7, 2026'
    };

    setPlacedOrder(newOrder);
    clearCart();
    setStep(3);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  const timelineSteps = [
    { title: 'Order Placed', time: '10:30 AM, Today', desc: 'Received & authorized' },
    { title: 'Packed & Dispatched', time: '01:15 PM, Today', desc: 'Quality checked at Vault 01' },
    { title: 'In Transit / Shipped', time: 'Expected Tomorrow', desc: 'FedEx Express Air Cargo' },
    { title: 'Out for Delivery', time: 'Wednesday Morning', desc: 'Courier assigned with OTP' },
    { title: 'Delivered', time: 'Wednesday, Oct 7', desc: 'Handed to recipient' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Multi-Step Checkout Progress Bar */}
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-black -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
              step >= 1 ? 'bg-black text-white shadow-md' : 'bg-neutral-200 text-neutral-600'
            }`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className="text-xs font-bold uppercase mt-2 text-neutral-800">Shipping</span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
              step >= 2 ? 'bg-black text-white shadow-md' : 'bg-neutral-200 text-neutral-600'
            }`}>
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className="text-xs font-bold uppercase mt-2 text-neutral-800">Payment</span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
              step === 3 ? 'bg-emerald-500 text-white shadow-md ring-4 ring-emerald-100' : 'bg-neutral-200 text-neutral-600'
            }`}>
              {step === 3 ? <Sparkles className="w-5 h-5" /> : '3'}
            </div>
            <span className="text-xs font-bold uppercase mt-2 text-neutral-800">Status</span>
          </div>
        </div>
      </div>

      {/* Step 1: Shipping Address Form */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-neutral-100">
              <MapPin className="w-5 h-5 text-neutral-800" />
              <h2 className="text-lg font-black uppercase text-neutral-900 tracking-wider">
                Shipping Destination
              </h2>
            </div>

            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Email for Tracking</label>
                  <input
                    type="email"
                    required
                    value={addressForm.email}
                    onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">ZIP / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={addressForm.zipCode}
                    onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Mobile Phone (for delivery SMS & OTP)</label>
                <input
                  type="text"
                  required
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 bg-black hover:bg-neutral-800 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-[0.98] shadow-lg"
              >
                <span>Continue to Payment Method</span>
                <ChevronRight className="w-4 h-4 text-[#FFA41C]" />
              </button>
            </form>
          </div>

          {/* Quick Summary Sidebar */}
          <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs h-fit space-y-4">
            <h3 className="font-black text-sm uppercase text-neutral-900 pb-2 border-b border-neutral-100">
              Order Preview
            </h3>
            <div className="space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span className="font-semibold text-neutral-900">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-black text-base text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Due</span>
                <span className="text-[#FF3E6C]">${grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Payment Method */}
      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-neutral-800" />
                <h2 className="text-lg font-black uppercase text-neutral-900 tracking-wider">
                  Payment Method
                </h2>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-neutral-500 hover:text-black flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Address</span>
              </button>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-black bg-neutral-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2 text-neutral-800" />
                <span className="block text-xs font-black uppercase text-neutral-900">Card</span>
                <span className="text-[10px] text-neutral-400">Visa / MC / Amex</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-black bg-neutral-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <QrCode className="w-6 h-6 mx-auto mb-2 text-[#FF3E6C]" />
                <span className="block text-xs font-black uppercase text-neutral-900">UPI / QR</span>
                <span className="text-[10px] text-neutral-400">Instant Scan & Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border-2 text-center transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-black bg-neutral-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                <span className="block text-xs font-black uppercase text-neutral-900">Cash on Delivery</span>
                <span className="text-[10px] text-neutral-400">Pay at doorstep</span>
              </button>
            </div>

            {/* Simulated Payment Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black font-mono focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Security CVV</label>
                    <input
                      type="password"
                      maxLength="4"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 border border-neutral-300 rounded-xl focus:border-black font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-center space-y-3">
                <div className="w-32 h-32 bg-white mx-auto rounded-xl p-2 border border-neutral-300 shadow-xs flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-neutral-800" />
                </div>
                <p className="text-xs font-bold text-neutral-700">Scan QR Code with Google Pay, PhonePe, or Paytm</p>
                <p className="text-[11px] text-neutral-400">Dynamic QR generated for exact order amount (${grandTotal})</p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 space-y-1">
                <p className="font-bold">Doorstep Cash Payment Selected</p>
                <p className="text-amber-700">Please keep exact change of ${grandTotal} ready at the time of delivery.</p>
              </div>
            )}

            {/* Place Order CTA Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 py-4 bg-[#FF3E6C] hover:bg-[#e0355f] text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-[0.98] shadow-xl"
            >
              <span>Authorize & Place Order (${grandTotal})</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery Address Review */}
          <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 h-fit">
            <h3 className="font-black text-sm uppercase text-neutral-900 pb-2 border-b border-neutral-100">
              Delivering To
            </h3>
            <div className="text-xs text-neutral-600 space-y-1">
              <p className="font-bold text-neutral-900">{addressForm.fullName}</p>
              <p>{addressForm.street}</p>
              <p>{addressForm.city}, {addressForm.state} {addressForm.zipCode}</p>
              <p className="text-neutral-500 pt-1">Phone: {addressForm.phone}</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Order Confirmation & Real-Time Status Timeline Tracker */}
      {step === 3 && placedOrder && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Success Banner */}
          <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                Payment Authorized & Confirmed
              </span>
              <h2 className="text-3xl font-black uppercase text-neutral-900 tracking-tight mt-1">
                Thank You For Your Drop Order!
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Order ID: <strong className="font-mono text-black text-sm">{placedOrder.orderId}</strong>
              </p>
            </div>
            <p className="text-xs text-neutral-600 max-w-md mx-auto">
              A tracking receipt has been sent to <strong>{placedOrder.address.email}</strong>. Estimated delivery: <strong>{placedOrder.estimatedDelivery}</strong>.
            </p>
          </div>

          {/* Amazon-Inspired Order Status Timeline Step Tracker (Required) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
              <div>
                <h3 className="text-base font-black uppercase text-neutral-900 tracking-wider">
                  Real-Time Shipment Journey
                </h3>
                <p className="text-xs text-neutral-500">Live GPS milestone updates from carrier</p>
              </div>

              {/* Simulation step switcher for review/demo purposes */}
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-neutral-400 uppercase">Simulate Progress:</span>
                <div className="flex bg-neutral-100 p-1 rounded-xl">
                  {timelineSteps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setOrderStage(idx)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-colors ${
                        orderStage === idx ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      Step {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Horizontal Timeline Tracker */}
            <div className="relative pt-4 pb-2">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative">
                {timelineSteps.map((stepItem, index) => {
                  const isCompleted = index <= orderStage;
                  const isCurrent = index === orderStage;
                  return (
                    <div key={index} className="flex sm:flex-col items-start sm:items-center text-left sm:text-center space-x-4 sm:space-x-0 relative group">
                      
                      {/* Milestone Icon Circle */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                        isCompleted
                          ? 'bg-black text-[#FFA41C] shadow-md ring-4 ring-neutral-100'
                          : 'bg-neutral-100 text-neutral-400'
                      }`}>
                        {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Clock className="w-4 h-4" />}
                      </div>

                      {/* Content */}
                      <div className="mt-0 sm:mt-3">
                        <span className={`text-xs font-black uppercase tracking-tight block ${
                          isCurrent ? 'text-[#FF3E6C]' : isCompleted ? 'text-neutral-900' : 'text-neutral-400'
                        }`}>
                          {stepItem.title}
                        </span>
                        <span className="text-[10px] font-semibold text-neutral-500 block mt-0.5">
                          {stepItem.time}
                        </span>
                        <span className="text-[10px] text-neutral-400 hidden sm:block mt-0.5">
                          {stepItem.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 bg-black hover:bg-neutral-800 text-white rounded-full font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              Shop More Drops
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className="px-8 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full font-bold text-xs uppercase tracking-wider transition-colors"
            >
              View in Admin Orders
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
