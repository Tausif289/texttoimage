import React from 'react'
import { assets } from '../assets/assets'
import { m, motion } from 'framer-motion'

const Description = () => {
  return (
    <motion.div
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
     className='flex flex-col items-center justify-center my-24 p-6 md:px-28 '>
       <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI images</h1>
       <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>
       <div  className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt=""  className='w-80 xl:w-96 rounded-lg'/>
        <div >
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the Ai-powered text to image Generator</h2>
            <p className=' text-gray-600 mb-4'>This all-inclusive design resource boasts a variety of adaptable, pixel-perfect templates and components, perfect for crafting engaging user interfaces. Dive into our collection and unlock endless possibilities for your next web project.</p>
            <p className='text-gray-600'>Imagify is a premium and high-quality UI Kit with a fully functional AI video generator mobile app. With Imagify, effortlessly create AI-powered videos with customizable aspect ratios and styles. Organize your videos seamlessly in the library, and unlock additional features with a Pro subscription.</p>

        </div>
       </div>
    </motion.div>
  )
}

export default Description
