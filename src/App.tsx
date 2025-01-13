import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderStatus from './components/OrderStatus';
import AdminLogin from './components/AdminLogin';
import AdminOrders from './components/AdminOrders';
import TrackOrder from './components/TrackOrder';
import Footer from './components/Footer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Sample product data
const products = [
  {
    id: '1',
    name: 'Masala Chai',
    price: 20,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Classic Indian masala chai with aromatic spices'
  },
  {
    id: '2',
    name: 'Samosa',
    price: 15,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Crispy pastry filled with spiced potatoes'
  },
  {
    id: '3',
    name: 'Vada Pav',
    price: 30,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Mumbai\'s favorite street food'
  },
  {
    id: '4',
    name: 'Butter Chai',
    price: 25,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Rich and creamy butter tea'
  },
  {
    id: '5',
    name: 'Pakora',
    price: 40,
    image: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    description: 'Assorted fritters perfect with chai'
  }
];

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    setCartItems(items => {
      const existingItem = items.find(item => item.id === id);
      if (existingItem) {
        return items.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
        <Routes>
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          
          {/* Customer routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={
                      <>
                        <Carousel />
                        <section className="max-w-7xl mx-auto px-4 py-12">
                          <h2 className="text-3xl font-bold text-amber-900 mb-8">Our Specialties</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                              <ProductCard
                                key={product.id}
                                {...product}
                                onAddToCart={handleAddToCart}
                                onOrder={handleAddToCart}
                              />
                            ))}
                          </div>
                        </section>
                      </>
                    } />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/cart" element={
                      <Cart
                        items={cartItems}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                      />
                    } />
                    <Route path="/checkout" element={
                      <Checkout
                        items={cartItems}
                        onOrderComplete={handleOrderComplete}
                      />
                    } />
                    <Route path="/order-status/:token" element={<OrderStatus />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;