"use client";

import { useState } from 'react';

export default function DonateCard({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>("10");

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="font-open-sans text-[#3A504B] font-semibold mb-3">{title}</h3>
      <div className="flex items-center space-x-3">
        <input
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (EUR)"
          className="flex-1 px-4 py-3 border border-[#8ECDCF] rounded-lg font-open-sans text-[#3A504B] focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]"
        />
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-3 bg-[#E8A96F] text-white rounded-lg font-open-sans font-semibold hover:opacity-90"
        >
          Donate
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-[380px] max-w-[90vw] shadow-xl">
            <h4 className="text-lg font-playfair text-[#3A504B] mb-4">Card details</h4>
            <p className="text-sm text-[#3A504B] mb-3">
              We will process a secure card payment of <strong>{amount}</strong> EUR.
            </p>
            <div className="space-y-3">
              <input placeholder="Card number" className="w-full px-3 py-2 border rounded" />
              <div className="flex space-x-3">
                <input placeholder="MM/YY" className="w-1/2 px-3 py-2 border rounded" />
                <input placeholder="CVC" className="w-1/2 px-3 py-2 border rounded" />
              </div>
              <input placeholder="Name on card" className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setOpen(false)} className="px-3 py-2 border rounded">Cancel</button>
              <button
                onClick={() => {
                  alert('Payment processing is a placeholder. Integrate Revolut Checkout with your keys.');
                  setOpen(false);
                }}
                className="px-3 py-2 bg-[#8ECDCF] text-white rounded"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


