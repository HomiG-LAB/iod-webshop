import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: Request) {
  try {
    const { items, customerEmail, shippingAddress } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "chf",
        product_data: {
          name: item.name,
          description: `Size: ${item.sizeLabel || item.size}`,
          images: [item.image.startsWith("http") ? item.image : `https://iod-webshop.vercel.app${item.image}`],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }));

    // Generate a secure Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: customerEmail || undefined,
      metadata: {
        shippingAddress: JSON.stringify(shippingAddress),
        itemsData: JSON.stringify(items.map((i: any) => ({
           id: i.id,
           name: i.name,
           size: i.sizeLabel || i.size,
           quantity: i.quantity,
           price: i.price
        }))),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout`,
      shipping_address_collection: {
        allowed_countries: ["CH", "DE", "AT"], // Defaulting to DACH region for now
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
