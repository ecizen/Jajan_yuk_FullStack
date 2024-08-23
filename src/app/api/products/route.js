// public/api/products.js
import { NextResponse } from "next/server";
import db from "@/lib/db";

// Public API to get products with optional category filtering
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search"); // Get the search term
    const categoryId = searchParams.get("category");

    const products = await db.product.findMany({
      where: {
        isArchived: false,
        ...(categoryId && { categoryId }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { category: { name: { contains: search, mode: "insensitive" } } },
          ],
        }),
      },
      include: {
        images: true,
        category: true,
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

