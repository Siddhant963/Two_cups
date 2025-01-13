import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Order {
  token: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  timestamp: string;
}

export default function OrderStatus() {
  const { token } = useParams<{ token: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const currentOrder = orders.find((o: Order) => o.token === token);
    setOrder(currentOrder || null);
  }, [token]);
  
  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Status</h2>
          <p className="text-amber-800 font-semibold">Order Token: {order.token}</p>
        </div>
        
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Order Details</h3>
          <p>Customer: {order.customerName}</p>
          <p>Status: <span className="text-green-600 font-semibold capitalize">{order.status}</span></p>
          <p>Time: {new Date(order.timestamp).toLocaleString()}</p>
        </div>
        
        <div className="border-t pt-6 mb-6">
          <h3 className="font-semibold mb-4">Items</h3>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}