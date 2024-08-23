import db from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req, { params: { storeId } }) {
  try {
    const store = await db.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_GET]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
