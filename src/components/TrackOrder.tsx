import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Order {
  token: string;
  customerName: string;
  phoneNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  timestamp: string;
}

export default function TrackOrder() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const customerOrders = allOrders.filter((order: Order) => 
      order.phoneNumber === phoneNumber
    );
    setOrders(customerOrders);
    setSearched(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Track Your Order</h2>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex space-x-2">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <button
              type="submit"
              className="bg-amber-800 text-white px-6 py-2 rounded-md hover:bg-amber-900 flex items-center space-x-2"
            >
              <Search size={18} />
              <span>Track</span>
            </button>
          </div>
        </form>

        {searched && orders.length === 0 ? (
          <div className="text-center text-gray-600">
            No orders found for this phone number
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.token} className="border rounded-lg p-4 mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">Order Token: {order.token}</p>
                  <p className="text-gray-600">Customer: {order.customerName}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium capitalize
                  ${order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'ready' ? 'bg-green-100 text-green-800' :
                    order.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }"
                >
                  {order.status}
                </span>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Ordered on: {new Date(order.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}