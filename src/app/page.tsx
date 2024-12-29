import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { client } from "@/sanity/lib/client";


export default async function Home() {
  const query=`*[_type=="product"]`
  const products=await client.fetch(query)
  console.log(products)
  return (
  
    <>
      <Hero/>
      <Products/>
    </>
  );
}
