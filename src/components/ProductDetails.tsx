"use client"

import Image from 'next/image'
import React, { useContext, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { CartContext } from '../context/CartContext';
import { urlFor } from '@/sanity/lib/image';

const ProductDetails = ({product}:any) => {
    const [index,setIndex] = useState(0);
    const {  addProduct, qty, decQty, incQty}:any = useContext(CartContext);
    
    return (
        <div className='product-details-section'>
            <div className='product-details-container'>
                {/* Left */}
                <div className='space-y-6'>
                    {/* TOP */}
                    <div className='h-[300px] md:h-[450px] flex items-center'>
                        <Image
                            loader={()=>urlFor(product.images[index]).url()}
                            src={urlFor(product.images[index]).url()}
                            alt={product.images[index]}
                            width={350}
                            height={350}
                            className='object-contain w-full h-full mx-auto'
                        />
                    </div>

                    {/* BOTTOM */}
                    <div className='small-images-container'>
                        {product.images?.map((item:any,i:number)=>(
                            <Image
                                key={i}
                                loader={()=>urlFor(product.images[i]).url()}
                                src={urlFor(product.images[i]).url()}
                                alt={product.images[0]}
                                width={100}
                                height={100}
                                className='object-cover h-20 w-20 md:h-24 md:w-24 border rounded-xl hover:cursor-pointer transition-transform duration-300 hover:scale-105'
                                onClick={()=>setIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className='flex flex-col gap-6 md:gap-8 pt-6 md:pt-0'>
                    <div className='space-y-2'>
                        <div className='text-2xl md:text-3xl font-bold'>{product.name}</div>
                        <div className='text-lg md:text-xl font-medium'>${product.price}</div>
                    </div>

                    <div className='flex items-center gap-4'>
                        <h3 className='text-lg'>Quantity</h3>
                        <div className='quantity-desc flex items-center border-black'>
                            <span className='minus' onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </div>
                    </div>

                    <button 
                        className='btn add-to-cart'
                        onClick={()=>addProduct(product,qty)}
                    >
                        Add To Cart
                    </button>
                </div> 
            </div>
        </div>
    )
}

export default ProductDetails

