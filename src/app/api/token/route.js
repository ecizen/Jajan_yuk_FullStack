import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request) {
  const items = await request.json();

  // Calculate the total amount
  const grossAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Prepare the parameters for Midtrans
  const parameter = {
    transaction_details: {
      order_id: `order-${Math.floor(Math.random() * 1000000)}`, // Generate a random order ID
      gross_amount: grossAmount, // Total amount
    },
    item_details: items.map((item) => ({
      id: item.cartId,
      price: item.price,
      quantity: item.quantity,
      name: item.name,
    })),
  };

  try {
    const token = await snap.createTransactionToken(parameter);
    if (token && typeof token === "string") {
      return NextResponse.json({ token });
    } else {
      return NextResponse.status(500).json({
        error: "Failed to generate token",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.status(500).json({ error: "Failed to generate token" });
  }
}
