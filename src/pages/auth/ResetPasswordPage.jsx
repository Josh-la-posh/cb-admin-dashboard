import React from 'react';
import HeroSection from '../../components/auth/HeroSection';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className="block bg-priColor lg:bg-[transparent] lg:flex h-screen items-center">
      <div className="w-1/2 hidden lg:block overflow-hidden">
        <HeroSection />
      </div>
      <div className='w-[full] h-[100%] lg:h-[60%] lg:w-1/2 p-[20px]'>
        <div className="w-full h-full flex items-center justify-center">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;