
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
       <button onClick={async()=>{
        try {
           let res=await axios.post('/api/admin/logout');
           if(res.data.success){
            router.push('/admin/login');
           }
        } catch (error) {
           console.log(error);
        }
         
       }}>
          logout
      </button>
    </div>
  );
}


