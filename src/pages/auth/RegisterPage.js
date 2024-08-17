import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'
import HeroSection from '../../components/auth/HeroSection'

const RegisterPage = () => {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 hidden lg:block">
                <HeroSection />
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage