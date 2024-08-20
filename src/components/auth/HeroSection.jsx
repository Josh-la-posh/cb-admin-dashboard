import React from 'react';
import Home from "../../assets/home.jpg";

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <img
        src={Home}
        alt="CodeByte"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
        {/* Background overlay with reduced opacity */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Text content with shadow */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4 shadow-md">
            Payments Made Easy with <span className="text-8xl text-[#272662]">MoneyXPay</span>
          </h1>
          <p className="text-lg shadow-md mt-4">
            MoneyXPay helps businesses in Africa receive payments from their customers all over the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
