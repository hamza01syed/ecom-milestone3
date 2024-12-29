import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string);

export const POST = async (request: { json: () => PromiseLike<{ products: any; }> | { products: any; }; }) => {
  try {
    const { products } = await request.json();

    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: "Invalid products data" },
        { status: 400 }
      );
    }

    // Fetch active products from Stripe
    const activeProducts = await stripe.products.list({ active: true });

    // Match or create products in Stripe
    const productPromises = products.map(async (product) => {
      let matchedProduct = activeProducts.data.find(
        (stripeProduct) =>
          stripeProduct.name.toLowerCase() === product.name.toLowerCase()
      );

      // If product doesn't exist in Stripe, create it
      if (!matchedProduct) {
        const newProduct = await stripe.products.create({
          name: product.name,
        });

        const price = await stripe.prices.create({
          product: newProduct.id,
          currency: "usd",
          unit_amount: product.price * 100, // converting to cents
        });

        matchedProduct = {
          ...newProduct,
          default_price: price.id, // Use price ID (string)
        };
      }

      // Ensure the default_price is a valid string
      const priceId = matchedProduct.default_price;

      if (!priceId || typeof priceId !== 'string') {
        throw new Error(`Invalid price ID for product: ${product.name}`);
      }

      return {
        price: priceId, // Ensure this is the price ID string
        quantity: product.quantity,
      };
    });

    const stripeProducts = await Promise.all(productPromises);

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: stripeProducts.map((item) => ({
        price: item.price, // Ensure this is a string (Price ID)
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `https://shop-mu-mauve.vercel.app/success`,
      cancel_url: `https://shop-mu-mauve.vercel.app/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error in /api/checkout:", error);

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
};
