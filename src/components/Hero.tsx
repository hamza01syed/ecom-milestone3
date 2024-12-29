"use client"
import React from 'react'
import Image from 'next/image'
import {motion} from "framer-motion"

const Hero = () => {
    const variants={
        hidden:{x:0 ,y:70,opacity:0.25},
        visible:{x:0 ,y:-10,opacity:1,transition:{delay:0.05}}
    }
  return (
    <div className='w-full md:h-[450px] h-[200px] flex items-center'>
        <div className="h-full md:max-w-[1024px] relative  max-w-[600px] mx-auto flex items-center justify-center px-4 md:px-0">
            <div className="object-cover">
                <Image src={"/images/AirPods.png"} alt="hero" height={100} width={1400}/>
            </div>
            <div className="absolute md:top-48 top-20">
                <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                >
                <Image src={"/images/image11.png"} alt="airpods" height={100} width={700}/>
                </motion.div>
               
            </div>
        </div>
    </div>
  )
}

export default Hero