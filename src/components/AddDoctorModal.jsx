'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce'; 

export default function AddDoctorModal({ isOpen, onClose }) {

  const router = useRouter();

  useEffect(() => {
 
    if (typeof window !== 'undefined') {
     
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };

     
      const doctorEmail = getCookie('doctor-register');

      if (doctorEmail) {
        router.push('/admin/dashboard/completeDetails');
      }
    }
  }, []);
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const debouncedEmail = useDebounce(email, 1000); 


  useEffect(() => {
    const verifyEmail = async () => {
      if (!debouncedEmail) return;
      try {
        const response = await axios.get(`/api/admin/verify-doctor-email?email=${debouncedEmail}`);
        setIsEmailValid(response.data.success);
      } catch (error) {
        console.error(error);
        setIsEmailValid(false);
      }
    };

    verifyEmail();
  }, [debouncedEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) return;
    try {
      const response = await axios.post('/api/admin/add-doctor', { email: debouncedEmail, password });
      if (response.data.success) {
        onClose();
        router.push('/admin/dashboard/completeDetails');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Doctor</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Immediate input state change
              className={`w-full px-4 py-3 border ${isEmailValid ? 'border-gray-300' : 'border-red-500'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out`}
              required
              placeholder="doctor@example.com"
            />
            {!isEmailValid && <p className="mt-2 text-sm text-red-600">This email is already in use.</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              required
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end mt-8 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-3 ${isEmailValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={!isEmailValid}
            >
              Add Doctor
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
