import { client } from '@/sanity/lib/client'
import React from 'react'
import Card from './Card'

const Products = async() => {
    const query=`*[_type=="product"]`
      const products=await client.fetch(query)
      console.log(products)
  return (
    <div className='bg-[#f8f8f8] w-full py-12 mt-[125px]'>
        <div className="md:max-w-[1024px] mx-auto max-w-[600px] px-4 md:px-0">
            <div className='py-4'>
                <h1 className='text-3xl font-bold'>Best Selling Products</h1>
                <p>Enjoy upto 50%</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-6">
                {
                    products.map((product:any,index:number)=>(
                        <Card key={index} product={product}/>
                    ))
                }
               
            </div>
        </div>
    </div>
  )
}

export default Products