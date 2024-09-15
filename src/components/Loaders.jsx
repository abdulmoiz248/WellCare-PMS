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

export default Loading;
