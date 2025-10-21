import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* Left Section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt=""/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            {/* Center Section */}
            <div>
                <p className='text-xl font-medium mb-5'>Comapny</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/* Right Section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>9813087174</li>
                    <li>stha2060suzit@gmail.com</li>
                </ul>

            </div>

        </div>
        <div>
            {/* Comment Copyright*/}
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2025@ Prescripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer