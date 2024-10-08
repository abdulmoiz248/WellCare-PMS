'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Modal from '@/components/Modal';

import { useRouter } from 'next/navigation';
;

const loadBouncy = async () => {
  if (typeof window !== 'undefined') {
    const { bouncy } = await import('ldrs');
    bouncy.register();
  }
};

function Page() {


  let router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [title, setTitle] = useState('OTP SENT');
  let [message,setMessage]=useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  
  useEffect(() => {
    setTitle('OTP SENT');
    setMessage('OTP SENT TO YOUR EMAIL'); 
    openModal();
    loadBouncy();
    setTitle('Error');
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (otp == '') {
      setMessage( 'OTP is required')
      openModal();
        setLoading(false);
        return;
      }

      if(isNaN(Number(otp))){
        setMessage( 'OTP must be a number')
        openModal();
          setLoading(false);
          return;
      }

      
      if (!(otp.length == 5)) {
        setMessage('Invalid OTP length');
        openModal();
        setLoading(false);
        return;
      }
      let email = '';
      if (typeof window !== 'undefined') {
        const patientCookie = document.cookie.split('; ').find(row => row.startsWith('patient='));
        if (patientCookie) {
          const patientData = JSON.parse(decodeURIComponent(patientCookie.split('=')[1]));
          email = patientData.email || '';
        }
      }
      const response = await axios.get('/api/patient/verifyOtp', {
        params: { otp,email:email }

      });

      if (response.data.success) {
        setTitle('Verified');
        setMessage( 'OTP Verified')
         openModal();
         
        setTimeout(()=>{router.push('/patient/completeRegister')},1500)
      } else {
        setMessage( 'Invalid OTP')
        openModal();
      }
    } catch (error: any) {
      setMessage(
        'Not Valid OTP'
      );
      openModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        message={message}
      />
      
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Enter OTP</h2>
        <form className="flex flex-col space-y-4" onSubmit={submit}>
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loading ? (
            <div className="text-white py-2 rounded-lg transition duration-300 flex justify-center items-center">
              <l-bouncy
                size="45"
                speed="1.75"
                color="blue"
              />
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Page;
