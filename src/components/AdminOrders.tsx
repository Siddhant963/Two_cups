import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [credentials, setCredentials] = useState({ userId: 'root', password: '1234' });
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.sort((a: Order, b: Order) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));

    const savedCreds = JSON.parse(localStorage.getItem('adminCreds') || 
      '{"userId": "root", "password": "1234"}');
    setCredentials(savedCreds);
  }, [navigate]);

  const handleStatusUpdate = (token: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.token === token ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleCredentialsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adminCreds', JSON.stringify(credentials));
    setShowCredentials(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900">Order Management</h2>
          <div className="space-x-4">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="px-4 py-2 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200"
            >
              Update Credentials
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {showCredentials && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Update Admin Credentials</h3>
            <form onSubmit={handleCredentialsUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <input
                  type="text"
                  value={credentials.userId}
                  onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900"
              >
                Update
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Token</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.token}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.token}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.items.map(item => (
                        <div key={item.name}>
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.token, e.target.value)}
                        className="text-sm border rounded-md px-2 py-1"
                      >
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}