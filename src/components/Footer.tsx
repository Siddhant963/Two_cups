import React from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a href="tel:+919876543210" className="flex items-center space-x-2 hover:text-amber-200">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@chaitapri.com" className="flex items-center space-x-2 hover:text-amber-200">
                <Mail size={18} />
                <span>info@chaitapri.com</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <p>Monday - Sunday</p>
            <p>6:00 AM - 10:00 PM</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-800 text-center">
          <p>&copy; {new Date().getFullYear()} Chai Tapri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}