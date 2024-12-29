// "use client"

// import { useParams } from 'next/navigation'
import   ProductDetails  from '@/components/ProductDetails'
import React from 'react';
import { client } from '@/sanity/lib/client';

const page = async ({params}:any) => {
    const {slug}=params
    console.log("slug",slug)
    const products = await client.fetch(`*[_type=="product"]`);
    const product = products.find((product:any)=>product.slug.current == slug);

    console.log("products..",product);

    

  return (
    <>
        
        <ProductDetails product={product} />
    </>

  )
}

export default page