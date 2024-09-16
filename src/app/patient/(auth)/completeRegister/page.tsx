import React from 'react'
export default function Page() {
  return (
    <section className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <form action="" className="container flex flex-col mx-auto space-y-12">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-lg bg-white dark:bg-gray-800">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium text-lg text-gray-700 dark:text-gray-200">Personal Information</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Please verify your personal information</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="CNIC" className="text-sm text-gray-600 dark:text-gray-300">CNIC</label>
              <input
                id="CNIC"
                type="text"
                placeholder="Enter your CNIC"
                className="w-full px-3 py-2 mt-1 rounded-md focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="dob" className="text-sm text-gray-600 dark:text-gray-300">Date of Birth</label>
              <input
                id="dob"
                type="date"
                className="w-full px-3 py-2 mt-1 rounded-md focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="address" className="text-sm text-gray-600 dark:text-gray-300">Address</label>
              <input
                id="address"
                type="text"
                placeholder="Enter your address"
                className="w-full px-3 py-2 mt-1 rounded-md focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label htmlFor="city" className="text-sm text-gray-600 dark:text-gray-300">City</label>
              <input
                id="city"
                type="text"
                placeholder="Enter your city"
                className="w-full px-3 py-2 mt-1 rounded-md focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label htmlFor="bloodGroup" className="text-sm text-gray-600 dark:text-gray-300">Blood Group</label>
              <input
                id="bloodGroup"
                type="text"
                placeholder="Enter your blood group"
                className="w-full px-3 py-2 mt-1 rounded-md focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
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
    </section>
  );
}
