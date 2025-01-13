import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  onAddToCart: (id: string) => void;
  onOrder: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
  onAddToCart,
  onOrder
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
        <p className="text-amber-800 font-bold mt-2">₹{price.toFixed(2)}</p>
        
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onAddToCart(id)}
            className="flex-1 bg-amber-100 text-amber-800 py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-amber-200"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={() => onOrder(id)}
            className="flex-1 bg-amber-800 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-amber-900"
          >
            <Plus size={18} />
            <span>Order Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}