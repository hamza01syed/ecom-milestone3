import { NextResponse, NextRequest } from 'next/server';
const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

export const POST = async (request: { json: () => PromiseLike<{ products: any; }> | { products: any; }; }) => {
  // Use .json() method to parse the body
  const { products } = await request.json();
  
  // Fetch active products from Stripe
  let activeProducts = await stripe.products.list({ active: true });
  console.log(activeProducts);

  try {
    // 1. Find products from Stripe that match products from cart.
    for (const product of products) {
      const matchedProducts = activeProducts?.data?.find(
        (stripeProduct: any) =>
          stripeProduct.name.toLowerCase() === product.name.toLowerCase()
      );

      // 2. If the product doesn't exist in Stripe, create it.
      if (!matchedProducts) {
        const prod = await stripe.products.create({
          name: product.name,
          default_price_data: {
            currency: 'usd',
            unit_amount: product.price * 100, // Stripe expects amount in cents
          },
        });
        console.log(prod);
      }
    }
  } catch (error) {
    console.log('Error in creating a new product', error);
    throw error;
  }

  // 3. Fetch updated products from Stripe after adding new ones
  activeProducts = await stripe.products.list({ active: true });
  const stripeProducts = [];

  for (const product of products) {
    const stripeProduct = activeProducts?.data?.find(
      (stripeProduct: any) =>
        stripeProduct.name.toLowerCase() === product.name.toLowerCase()
    );

    if (stripeProduct) {
      stripeProducts.push({
        price: stripeProduct?.default_price,
        quantity: product.quantity,
      });
    }
  }

  // 4. Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    line_items: stripeProducts,
    mode: 'payment',
    success_url: `https://shop-mu-mauve.vercel.app/success`,
    cancel_url: `https://shop-mu-mauve.vercel.app/`,
  });

  // Return the session URL to the client
  return NextResponse.json({
    url: session.url,
  });
};
