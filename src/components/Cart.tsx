"use client"

import { CartContext } from '@/context/CartContext'
import { urlFor } from '@/sanity/lib/image'
import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import Image from 'next/image'

const Cart = () => {
    const { onRemove, toggleCartItemQty, totalPrice, totalQuantity, cartItems, showCart, setShowCart }: any = useContext(CartContext)
    
    const handleClose = () => {
        setShowCart(!showCart)
    }

    const handleCheckout = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/checkout", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ products: cartItems })
            })
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cart-wrapper">
            <div className="cart-container">
                <button className='cart-heading' onClick={handleClose}>
                    <AiOutlineLeft />
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>({totalQuantity})</span>
                </button>

                <div className='product-container space-y-4 mt-6'>
                    {cartItems.map((product: any) => (
                        <div className='product flex items-center gap-4' key={product._id}>
                            <Image
                                loader={() => urlFor(product.images[0]).url()}
                                src={urlFor(product.images[0]).url()}
                                alt={product.images[0]}
                                width={80}
                                height={80}
                                className='object-cover rounded-md'
                            />
                            <div className='item-desc flex-grow'>
                                <div className='flex justify-between items-center'>
                                    <h5 className='text-lg font-medium'>{product.name}</h5>
                                    <h4 className='text-lg font-bold'>${product.price}</h4>
                                </div>
                                <div className='flex justify-between items-center mt-2'>
                                    <div className='quantity-desc flex items-center'>
                                        <span className='minus' onClick={() => toggleCartItemQty(product._id, 'minus')}>
                                            <AiOutlineMinus />
                                        </span>
                                        <span className='num'>
                                            {product.quantity}
                                        </span>
                                        <span className='plus' onClick={() => toggleCartItemQty(product._id, 'plus')}>
                                            <AiOutlinePlus />
                                        </span>
                                    </div>
                                    <button
                                        type='button'
                                        onClick={() => onRemove(product)}
                                        className='remove-item text-2xl text-red-600 hover:text-red-800 transition-colors duration-300'
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length > 0 &&
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3 className='text-xl font-bold'>Subtotal</h3>
                            <h3 className='text-xl font-bold'>${totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                            <button onClick={handleCheckout} type='button' className='checkout-btn'>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart

