import React from 'react'

export default function Hero() {
  return (
    <>
    <section className="bg-[#eaeaea98] dark:text-gray-800">
    
    <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
      <img
  src="images/logo.png"
  alt="img"
  className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 rounded-full shadow-lg"
/>
  
      </div>
      <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <h1 className="text-5xl font-bold leading-none sm:text-6xl">WellCare
         
        </h1>
        <p className="mt-6 mb-8 text-lg sm:mb-12">The Well-Care is a streamlined platform for efficiently managing patient
          <br  className="hidden md:inline lg:hidden" /> data, appointments, and medical records, ensuring optimal care delivery and patient engagement.
        </p>
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          <a rel="noopener noreferrer" href="/patient/register" className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50 hover:bg-[#b6b6b6]">Register</a>
          <a rel="noopener noreferrer" href="/patient/login" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800 hover:bg-[#b6b6b6]">Login</a>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}
