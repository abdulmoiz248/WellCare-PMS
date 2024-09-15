import React, { useEffect } from 'react';
import { cardio } from 'ldrs';

const CardioComponent = () => {
  useEffect(() => {
    cardio.register();
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

export default CardioComponent;
