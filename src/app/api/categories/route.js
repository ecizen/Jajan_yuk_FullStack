// public/api/products.js
import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function GET(req) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return NextResponse.json({ message: "Internal errors" }, { status: 500 });
  }
}


