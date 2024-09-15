<<<<<<< HEAD
'use client';

import React, { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    // Dynamic import of the 'ldrs' library
    const loadLdrs = async () => {
      const { cardio } = await import('ldrs');
      cardio.register();
    };

    loadLdrs();
=======
import React, { useEffect } from 'react';
import { cardio } from 'ldrs';

const CardioComponent = () => {
  useEffect(() => {
    cardio.register();
>>>>>>> 05a279f6cce6733dad6f06701041191d8445d065
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <l-cardio
        size="50"
        stroke="4"
        speed="2"
        color="black"
      ></l-cardio>
    </div>
  );
};

<<<<<<< HEAD
export default Loading;
=======
export default CardioComponent;
>>>>>>> 05a279f6cce6733dad6f06701041191d8445d065
