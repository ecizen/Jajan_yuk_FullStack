'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const { data: session, status } = useSession();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Session:', session);
      const fetchCartItems = async () => {
        try {
          const response = await axios.get('/api/carts', {
            params: {
              userId: session.user.id,
            },
          });

          setCartItems(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCartItems();
    } else {
      console.log('Not authenticated');
    }
  }, [session, status]);

  return (
    <div>
      <h1>Cart Items</h1>
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem.id}>
            <p>{cartItem.name}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <p>Price: {cartItem.price}</p>
            <p>Description: {cartItem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;