import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  onOrderComplete: () => void;
}

export default function Checkout({ items, onOrderComplete }: CheckoutProps) {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random order token
    const orderToken = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // In a real app, you would send this to your backend
    const order = {
      token: orderToken,
      customerName,
      phoneNumber,
      items,
      total,
      status: 'preparing',
      timestamp: new Date().toISOString()
    };
    
    // For demo purposes, we'll store it in localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    onOrderComplete();
    navigate(`/order-status/${orderToken}`);
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-amber-800 text-white py-3 px-4 rounded-md hover:bg-amber-900 transition-colors"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}