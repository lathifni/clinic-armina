'use client'
import React from 'react';
import { AuthProvider } from '@/context/AuthContext'; 
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/components/login/LoginForm'), {
    ssr: false,
});
const LoginPage: React.FC = () => {
    return (
        <AuthProvider>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Selamat Datang</h1>
                    <LoginForm/>
                    <p className="mt-4 text-center text-gray-600">
                        Belum punya akun? <a href="/register" className="text-blue-500 hover:underline">Daftar disini</a>
                    </p>
                </div>
            </div>
        </AuthProvider>
    );
};

export default LoginPage;
