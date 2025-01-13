import React, { useState } from 'react';
import { ShoppingCart, Coffee, Menu, X, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount }: { cartCount: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-amber-800 text-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-2">
            <Coffee className="h-8 w-8" />
            <span className="text-xl font-bold">Two Cups</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" onClick={handleLinkClick} className="hover:text-amber-200">Home</Link>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-amber-200 flex items-center"
              >
                Menu
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
                  <Link to="/category/chai" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-amber-100">Chai Varieties</Link>
                  <Link to="/category/snacks" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-amber-100">Snacks</Link>
                  <Link to="/category/combos" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-amber-100">Combo Offers</Link>
                </div>
              )}
            </div>
            <Link to="/track-order" onClick={handleLinkClick} className="hover:text-amber-200 flex items-center space-x-1">
              <Search size={18} />
              <span>Track Order</span>
            </Link>
            <Link to="/admin" onClick={handleLinkClick} className="hover:text-amber-200 flex items-center space-x-1">
              <User size={18} />
              <span>Admin</span>
            </Link>
            <Link to="/cart" onClick={handleLinkClick} className="relative hover:text-amber-200">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" onClick={handleLinkClick} className="block py-2 hover:text-amber-200">Home</Link>
            <Link to="/category/chai" onClick={handleLinkClick} className="block py-2 hover:text-amber-200">Chai Varieties</Link>
            <Link to="/category/snacks" onClick={handleLinkClick} className="block py-2 hover:text-amber-200">Snacks</Link>
            <Link to="/category/combos" onClick={handleLinkClick} className="block py-2 hover:text-amber-200">Combo Offers</Link>
            <Link to="/track-order" onClick={handleLinkClick} className="block py-2 hover:text-amber-200">Track Order</Link>
            <Link to="/admin" onClick={handleLinkClick} className="block py-2 hover:text-amber-200">Admin</Link>
            <Link to="/cart" onClick={handleLinkClick} className="block py-2 hover:text-amber-200">Cart ({cartCount})</Link>
          </div>
        )}
      </div>
    </nav>
  );
}