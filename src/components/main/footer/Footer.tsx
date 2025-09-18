import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full">
      <div className="container mx-auto py-16 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between md:space-x-10 space-y-10 md:space-y-0 flex-wrap">
          {/* Exclusive Section */}
          <div className="w-full sm:w-1/2 md:w-auto flex-1 min-w-[200px]">
            <h2 className="text-xl font-semibold mb-6">Exclusive</h2>
            <p className="text-gray-400 mb-2">Subscribe</p>
            <p className="text-gray-400 text-sm mb-4">Get 10% off your first order</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-white text-white py-2 focus:outline-none focus:border-gray-400 pr-10"
              />
              <svg
                className="absolute right-0 bottom-2 text-white w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </div>
          </div>

          {/* Support Section */}
          <div className="w-full sm:w-1/2 md:w-auto flex-1 min-w-[200px]">
            <h2 className="text-xl font-semibold mb-6">Support</h2>
            <p className="text-gray-400 mb-2">
              111 Bijoy sarani, Dhaka,
              <br /> DH 1515, Bangladesh.
            </p>
            <p className="text-gray-400 mb-2">exclusive@gmail.com</p>
            <p className="text-gray-400">+88015-88888-9999</p>
          </div>

          {/* Account Section */}
          <div className="w-full sm:w-1/2 md:w-auto flex-1 min-w-[200px]">
            <h2 className="text-xl font-semibold mb-6">Account</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link Section */}
          <div className="w-full sm:w-1/2 md:w-auto flex-1 min-w-[200px]">
            <h2 className="text-xl font-semibold mb-6">Quick Link</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Download App Section */}
          <div className="w-full sm:w-1/2 md:w-auto flex-1 min-w-[200px]">
            <h2 className="text-xl font-semibold mb-6">Download App</h2>
            <p className="text-gray-400 text-sm mb-4">Save $3 with App New User Only</p>
            <div className="flex space-x-2 mb-4">
              <a href="#">
                <Image
                  src="/google-play.png" 
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="rounded-lg"
                />
              </a>
              <a href="#">
                <Image
                  src="/app-store.png" 
                  alt="App Store"
                  width={120}
                  height={40}
                  className="rounded-lg"
                />
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 text-center text-gray-400 text-sm border-t border-gray-700">
          <p>&copy; Copyright 2025  All right reserved</p>
        </div>
      </div>
    </footer>
  );
}
