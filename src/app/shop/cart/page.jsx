"use client";
import Container from "@/components/ui/container";
import Currency from "@/components/ui/currency";
import images from "@/constant/data-image";
import axios from "axios";
import { Delete } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const CartPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [statuscoupun, setStatuscoupun] = useState("none");

  const handleDiscount = useCallback(() => {
    setDiscount(10000);
    setStatuscoupun("apply");
  }, [setDiscount, setStatuscoupun]);

  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/carts", {
          params: {
            userId: session.user.id,
          },
        });
        setCartItemCount(response.data.length);
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, [session]);

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete("/api/carts", {
        params: {
          userId: session.user.id,
          cartItemId,
        },
      });

      // Update the cart items state
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error(error);
    }
  };

  const checkout = async () => {
    const data = cartItems.map((cartItem) => ({
      cartId: cartItem.id,
      name: cartItem.product?.name,
      price: cartItem.product?.price,
      quantity: cartItem.quantity,
    }));

    try {
      const response = await fetch("/api/token", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const requestData = await response.json();
      window.snap.pay(requestData.token);

      // Check if the response is valid JSON and contains the token
      if (requestData && requestData.token) {
        console.log("Token generated successfully:", requestData.token);
      } else {
        console.error("Failed to generate token:", requestData.error);
      }
    } catch (error) {
      console.error("Error making request:", error);
    }
    handleRemoveItem();
  };

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto  bg-gray-100">
      <Container>
        <div className="lg:px-12 px-6 py-8 lg:flex-row flex flex-col lg:space-x-4  items-start justify-between">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <h1 className="text-lg font-semibold">Product Cart Not Found</h1>
              <p className="text-sm text-gray-400">
                Your cart is currently empty. Please add some products to
                continue.
              </p>
            </div>
          ) : (
            <div className="lg:w-auto w-full bg-white rounded-lg ">
              <div className="  px-8  py-6 flex justify-between border-b border-gray-100">
                <div className=" flex items-center space-x-2">
                  <Image src={images.ShoppingCart} alt="iconshoppincart" />
                  <h1 className="text-lg font-semibold">Shopping Cart</h1>
                </div>
                <h1 className=" text-ld font-semibold">{cartItemCount} Item</h1>
              </div>
              <div className="lg:hidden block py-4 px-8 space-y-8">
                {cartItems.map((cartItem) => (
                  <div key={cartItem.id} className="w-full  flex space-x-2  items-center">
                    <div>
                      {cartItem.product?.images && (
                        <Image
                          alt="image new"
                          width={100}
                          height={100}
                          className="w-[80px] h-[80px] rounded-md group-hover:brightness-50 transition-all ease-in-out duration-300 mr-2"
                          src={
                            cartItem.product?.images?.[0]?.url ||
                            "/fallback-image.jpg"
                          }
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                       <p className="text-sm">{cartItem.product?.name}</p>
                       <p className=" text-clip  text-xs">Grapic card RTX 4090 limited..</p>
                       <Currency
                          className=" font-semibold text-xs text-blue-600"
                          value={cartItem.product?.price}
                        />
                    </div>
                  </div>
                ))}
              </div>

              {/* yang atas ini bagian mobile version */}

              <table class="table-auto w-full mx-auto lg:block md:hidden hidden">
                <thead className="">
                  <tr>
                    <th className=" text-xs text-gray-400 font-normal">
                      Product Detail
                    </th>
                    <th className=" text-xs text-gray-400 font-normal">
                      Price
                    </th>
                    <th className=" text-xs text-gray-400 font-normal">
                      Quantity
                    </th>
                    <th className=" text-xs text-gray-400 font-normal">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className=" px-8">
                  {cartItems.map((cartItem) => (
                    <tr
                      key={cartItem.id}
                      className=" border border-gray-100 relative "
                    >
                      <td className="flex space-x-2 items-center py-4 px-12">
                        {cartItem.product?.images && (
                          <Image
                            alt="image"
                            width={100}
                            height={100}
                            className="w-[100px] h-[100px] rounded-md group-hover:brightness-50 transition-all ease-in-out duration-300 mr-2"
                            src={
                              cartItem.product?.images?.[0]?.url ||
                              "/fallback-image.jpg"
                            }
                          />
                        )}
                        <span className=" text-sm font-semibold text-black">
                          {cartItem.product?.name}
                        </span>
                      </td>

                      <td className="py-4 px-12">
                        <Currency
                          className="text-neutral-800 font-semibold text-xs"
                          value={cartItem.product?.price}
                        />
                      </td>
                      <td className="py-4 px-12">{cartItem?.quantity}</td>
                      <td className="py-4 px-12">
                        <Currency
                          className="text-neutral-800 font-semibold text-xs"
                          value={cartItem.product?.price * cartItem?.quantity}
                        />
                      </td>
                      <div className=" absolute right-2">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleRemoveItem(cartItem.id)}
                        >
                          <p className=" text-xs font-bold">X</p>
                        </button>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className=" lg:w-[400px] w-full lg:mt-0 mt-8  bg-white rounded-lg overflow-hidden">
            <header className="w-full h-2 bg-neutral-800" />
            <div className="py-4 px-8 border-y border-gray-200">
              <h1 className=" text-md font-semibold text-center">
                Order Summary
              </h1>
            </div>
            <div className=" px-8 py-2 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Image src={images.CoupunApply} alt="coupun" />
                <p className=" text-xs font-medium">Apply Coupons</p>
              </div>
              <button
                onClick={handleDiscount}
                className="px-1 py-1 text-[12px] text-white bg-green-500"
              >
                Apply
              </button>
            </div>
            <div className="px-8 py-4">
              <h1 className="text-sm font-semibold">
                PRICE DETAIL ( {cartItemCount} items )
              </h1>
              <div className="pt-6 pb-4 border-b">
                <div className="mb-4 flex justify-between">
                  <p className="text-xs text-gray-500">Total MRP</p>
                  <Currency
                    className="text-xs text-black font-semibold"
                    value={cartItems.reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )}
                  />
                </div>
                <div className="mb-4 flex justify-between">
                  <p className="text-xs text-gray-500">Discount MRP</p>
                  <Currency
                    className="text-xs text-red-600 font-semibold"
                    value={discount}
                  />
                </div>
                <div className="mb-4 flex justify-between">
                  <p className="text-xs text-gray-500">Coupun Discount</p>
                  <p className="text-xs text-black font-semibold">
                    {statuscoupun}
                  </p>
                </div>
              </div>
              <div className="py-4 flex items-center justify-between">
                <h1 className="text-sm font-semibold">Total Amount</h1>
                <Currency
                  className="text-sm text-black font-semibold"
                  value={
                    cartItems.reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    ) - (statuscoupun === "apply" ? discount : 0)
                  }
                />
              </div>
              <div className="py-4">
                <button
                  onClick={checkout}
                  className="w-full text-white text-xs font-semibold px-4 h-10 bg-neutral-800"
                >
                  PLACES ORDER
                </button>
              </div>
            </div>

            <footer className="w-full h-2 bg-neutral-800" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
