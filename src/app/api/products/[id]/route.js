// public/api/products/[id].js
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSession } from "next-auth/react";

// Public API to get a single product by ID (no authentication required)
export async function GET(req, { params }) {
  const { id } = params;

  try {

    const product = await db.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
        category: true,
        store: true
      },
    });
  

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    // return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}


