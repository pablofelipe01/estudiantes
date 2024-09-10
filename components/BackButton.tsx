// components/BackButton.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BackButton = () => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push('/')}
      className="absolute top-4 left-4 ml-4 sm:ml-6 md:ml-8 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
    >
      <Image 
        src="/arrow-left.svg" 
        alt="Back to Home" 
        width={24} 
        height={24}
      />
    </button>
  );
};

export default BackButton;