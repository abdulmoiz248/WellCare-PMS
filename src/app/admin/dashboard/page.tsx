
'use client';

import React, { useState } from 'react';
import AddDoctorModal from '@/components/AddDoctorModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function AdminDashboard({ user }: { user: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let router=useRouter();

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <AddDoctorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
        onClick={(e) => {
          setIsModalOpen(true);
          e.preventDefault();
          console.log('clicked');
        }}
      >
        Add Doctor
      </button>
       
    </div>
  );
}


