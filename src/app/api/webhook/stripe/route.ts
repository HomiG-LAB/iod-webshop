import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const sanityApiToken = process.env.SANITY_API_TOKEN;
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret as string
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Save to Sanity
    try {
      if (!sanityApiToken || !sanityProjectId || !sanityDataset) {
        throw new Error("Missing Sanity credentials in environment variables");
      }

      // Parse metadata passed from checkout creation
      let itemsData = [];
      let shippingAddress = session.shipping_details?.address 
        ? `${session.shipping_details.address.line1}, ${session.shipping_details.address.postal_code} ${session.shipping_details.address.city}, ${session.shipping_details.address.country}`
        : "";

      if (session.metadata?.itemsData) {
         itemsData = JSON.parse(session.metadata.itemsData);
      }
      
      if (!shippingAddress && session.metadata?.shippingAddress) {
        // Fallback to custom collected address if Stripe didn't collect it
        const parsedAddress = JSON.parse(session.metadata.shippingAddress);
        shippingAddress = `${parsedAddress.firstName} ${parsedAddress.lastName}, ${parsedAddress.street}, ${parsedAddress.zipCode} ${parsedAddress.city}, ${parsedAddress.country}`;
      }

      // Generate a clean order number
      const orderNumber = `IOD-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderDoc = {
        _type: "order",
        orderNumber,
        customerName: session.customer_details?.name || "Unknown",
        customerEmail: session.customer_details?.email || "Unknown",
        shippingAddress,
        totalAmount: (session.amount_total || 0) / 100,
        stripeSessionId: session.id,
        status: "paid",
        items: itemsData.map((item: any, index: number) => ({
          _key: `item-${index}`,
          productName: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // Write directly to Sanity via HTTP API to avoid heavier @sanity/client in edge/serverless webhook
      const mutation = {
        mutations: [
          {
            create: orderDoc
          }
        ]
      };

      const sanityUrl = `https://${sanityProjectId}.api.sanity.io/v2023-01-01/data/mutate/${sanityDataset}?returnIds=true`;
      
      const sanityRes = await fetch(sanityUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sanityApiToken}`,
        },
        body: JSON.stringify(mutation),
      });

      if (!sanityRes.ok) {
        const errorData = await sanityRes.json();
        console.error("Sanity Mutation Error:", JSON.stringify(errorData));
        throw new Error("Failed to write to Sanity");
      }

      console.log(`Successfully created order ${orderNumber} in Sanity`);
    } catch (sanityError: any) {
      console.error("Error writing order to Sanity:", sanityError);
      // We still return 200 to Stripe so it doesn't retry the webhook indefinitely,
      // but in production you'd want a dead-letter queue or alert here.
    }
  }

  return NextResponse.json({ received: true });
}
