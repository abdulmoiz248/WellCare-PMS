'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '@/components/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  let patient = useSelector((store: any) => store.patient);
  let router=useRouter();
  const [formData, setFormData] = useState({
    CNIC: '',
    dob: '',
    address: '',
    city: '',
    bloodGroup: '',
    gender: '',
    phoneNumber: ''
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  let [message, setMessage]=useState('All fields are required');
  let [title, setTitle]=useState('Error');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { CNIC, dob, address, city, bloodGroup, gender, phoneNumber } = formData;

    if (!CNIC || !dob || !address || !city || !bloodGroup || !gender || !phoneNumber) {
      openModal();
      return;
    }
     
    let { email } = patient;
   try {
     let res=await axios.post('/api/patient/complete-register', {
       CNIC,
       dob,
       address,
       city,
       bloodGroup,
       gender,
       phoneNumber,
       email,
     
     });
 
     if(res.data.success){
       setMessage('Kindly Login Again');
       setTitle('Registration Successful');
       openModal();
       setTimeout(()=>{router.push('/patient/login')},1500)
     }
   } catch (error) {
       setTitle('Error Occured');
       setMessage( 'Sorry.!! An Error Occured');
       openModal();
   }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-6">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        message={message}
      />
      <div className="max-w-4xl w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
          Complete Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* CNIC */}
            <div>
              <label htmlFor="CNIC" className="block text-sm text-gray-600 dark:text-gray-300">CNIC</label>
              <input
                id="CNIC"
                type="text"
                value={formData.CNIC}
                onChange={handleInputChange}
                placeholder="Enter your CNIC"
                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm text-gray-600 dark:text-gray-300">Date of Birth</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            {/* Address */}
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm text-gray-600 dark:text-gray-300">Address</label>
              <input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm text-gray-600 dark:text-gray-300">City</label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            {/* Blood Group */}
            <div>
              <label htmlFor="bloodGroup" className="block text-sm text-gray-600 dark:text-gray-300">Blood Group</label>
              <input
                id="bloodGroup"
                type="text"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                placeholder="Enter your blood group"
                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm text-gray-600 dark:text-gray-300">Gender</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm text-gray-600 dark:text-gray-300">Phone Number</label>
              <input
                id="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </fieldset>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:ring-4 focus:ring-violet-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
