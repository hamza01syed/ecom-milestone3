"use client"
import Link from 'next/link';
import React, { useContext } from 'react'
import { FiShoppingBag } from "react-icons/fi";
import Cart from './Cart'
import { CartContext } from '@/context/CartContext';


const Navbar = () => {
    const {showCart,setShowCart,totalQuantity}:any=useContext(CartContext)
    const handleClick=(): void =>{
        setShowCart(!showCart)
    }

  return (
    <>
    <div className='w-full bg-white h-[80px] '>
        <div className="mx-auto max-w-[600px] px-4 md:px-0 md:max-w-[1024px] w-full h-full flex justify-between items-center">
            <Link href="/" className='font-black text-2xl'>Shop</Link>
            <button className='relative text-[25px]' onClick={handleClick}>
            <FiShoppingBag />
            <span className="absolute top-0 text-[12px] right-[-5px] bg-red-500 w-[18px] h-[18px] rounded-3xl text-center text-white font-bold">
                {totalQuantity}
            </span>
            </button>
         
        </div>
    </div>
   {
    showCart &&  <Cart/>
   }
    </>
  )
}

export default Navbar