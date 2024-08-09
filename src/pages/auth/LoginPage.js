import React from 'react';
import HeroSection from '../../components/auth/HeroSection';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 hidden lg:block">
        <HeroSection />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
