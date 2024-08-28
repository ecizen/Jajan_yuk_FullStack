// src/app/api/[storeId]/productungulans/route.js
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req) {
  try {

    if (!db || !db.ungulan) {
      console.error("[PRODUCTUNGULAN_POST]", "Database or productUngulan model is not available");
      return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }

    const newProductUngulan = await db.ungulan.findMany({
        include:{
          product: true,
          product: {
            include:{
              images: true,
            }
          }
        }

    });

    return NextResponse.json(newProductUngulan, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTUNGULAN_POST]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}