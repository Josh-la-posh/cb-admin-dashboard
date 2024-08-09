import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative h-full">
      <img
        src="your-image-url.jpg"
        alt="CodeByte"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-8">
        <h1 className="text-4xl font-bold">Payments Made Easy with <span className="text-blue-800">CodeByte</span></h1>
        <p className="mt-4 text-lg">CodeByte helps businesses in Africa receive payments from their customers all over the world.</p>
      </div>
    </div>
  );
};

export default HeroSection;
