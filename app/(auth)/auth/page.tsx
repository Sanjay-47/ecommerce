"use client";

import {useState} from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function AuthPage() {
    const [isSignUp,setIsSignUp]=useState(true);
    const router=useRouter();
    const toggleForm = () =>{
        setIsSignUp(!isSignUp);
    }
  return (
    <div className='flex min-h-screen mt-7'>
      <div className='w-full max-w-3xl mx-auto flex flex-col lg:flex-row p-3'>
        <div>

        <div className='mb-8 lg:mb-12 cursor-pointer' onClick={()=>router.push('/')}>
        <ChevronLeft className='text-gray-500 h-6 w-6 sm:h-8 sm:w-8 border-2 rounded-full p-1'/>
        </div>
        {/*Form */}
        <div>
          <h2 className='text-3xl sm:text-4xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-300 via-red-400 to-blue-300 bg-clip-text text-transparent pb-3'>{isSignUp?'Sign Up':'Sign In'}</h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8'>
            {isSignUp? 'Join Store today and Avail the massive Offers for you!':'Welcome back to the store!! Login to continue your experience'}
          </p>
        </div>
        {/* Toggle Form*/}
        <div className='mt-4 sm:mt-5 flex items-center justify-center'>
          <p className='text-base sm:text-lg lg:text-xl text-gray-600'>
            {isSignUp? 'Already a member?':"Don't have an account"}
          </p>

          <Button variant='link' className='text-lg sm:text-xl lg:text-2xl text-gray-500 cursor-pointer' onClick={toggleForm}>{isSignUp?'Sign In':'Sign Up'}</Button>

        </div>
        </div>
      </div>
    </div>
  )
}
