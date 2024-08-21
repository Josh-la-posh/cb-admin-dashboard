import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
import HeroSection from '../../components/auth/HeroSection'

const RegisterPage = () => {
    return (
        <div className="block bg-priColor lg:bg-[transparent] lg:flex h-screen items-center">
            <div className="w-1/2 hidden lg:block overflow-hidden">
                <HeroSection />
            </div>
            <div className="w-[full] h-[95%] lg:w-1/2 p-[20px]">
                <div className='w-full h-[100%] block lg:flex items-center justify-center overflow-y-auto'>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage