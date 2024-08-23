import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth';

export async function POST(req) {
  try {
    const { productId, userId, quantity, } = await req.json();

    const session = await getServerSession(req);

    if (!session) {
      return NextResponse.json({ message: 'Session not found' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const product = await db.product.findUnique({ where: { id: productId } });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    let cart = await db.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await db.cart.create({ data: { userId } });
    }

    const cartItem = await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        // name,
        // location,
        // price,
        // description,
      },
    });

    return NextResponse.json({ message: 'Product added to cart successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'UserId is required' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const cart = await db.cart.findFirst({ where: { userId } });

    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const cartItems = await db.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        product: true,
        product: {
          include: {
            images: true, // Include the images relation from the product
          },
        },
      },
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const cartItemId = url.searchParams.get('cartItemId');

    if (!userId || !cartItemId) {
      return NextResponse.json({ message: 'UserId and CartItemId are required' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const cartItem = await db.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ message: 'Cart item not found' }, { status: 404 });
    }

    await db.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return NextResponse.json({ message: 'Product removed from cart successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}