"use client";

import React, { useState, useEffect } from "react";
import MainNav from "./main-nav";
import { Bookmark, MenuIcon, SearchIcon, ShoppingBag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import MainNavLanding from "./main-nav";
import ModalSignIn from "./modal-sign-in";
import images from "@/constant/data-image";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (session) {
        try {
          const response = await axios.get("/api/carts", {
            params: {
              userId: session.user.id,
            },
          });
          setCartItemCount(response.data.length);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCartItemCount();
  }, [session]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto sticky top-0 border-b z-40 bg-white">
      <header className="w-full p-2 bg-neutral-800">
         <div className="flex justify-center items-center">
            <p className="px-4 py-1 border-r text-white text-xs">Get 50% on selected items</p>
            <p className="px-4 py-1 text-white text-xs">Shopp now</p>
         </div>
      </header>
      <nav className="flex justify-between items-center lg:px-12 md:px-6 px-6 lg:py-4 py-6">
        <div className="lg:hidden">
          <MenuIcon />
        </div>
        <div className="lg:flex hidden space-x-12">
          <div className=" flex gap-4">
            <a
              href="/"
              className="lg:block hidden text-xl text-gray-900 font-semibold"
            >
              JAJAN.YUK
            </a>
          </div>
          <ul className="flex items-center gap-6">
            <li>
              <a href="/support" className="text-xs text-neutral-700">
                Discover
              </a>
            </li>
            <li>
              <MainNav />
            </li>
            <li>
              <a href="/whistlist" className="text-xs text-neutral-700">
                Support
              </a>
            </li>
            <li>
              <a href="/contact" className="text-xs text-neutral-700">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className=" flex items-center space-x-12">
          <div className="">
            <form
              onSubmit={handleSearch}
              className="lg:flex hidden items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or category..."
                className="border border-gray-200  p-3 text-xs w-[340px]"
              />
            </form>
          </div>
          {session ? (
            <div className="flex items-center space-x-8">
              <div className="flex items-center gap-2">
                <Image src={images.iconAccount} alt="icon" width={18} />
                <p className="text-xs">Account</p>
              </div>
              <a href="/shop/cart" className="relative">
                <div className="flex items-center gap-2">
                  <Image src={images.iconCart} alt="icon" width={18} />
                  <p className="text-xs text-neutral-900">Cart</p>
                </div>
                <div className=" absolute -top-2 left-2">
                  {cartItemCount > 0 && (
                    <div className=" w-[16px] h-[16px] rounded-full bg-neutral-800 flex items-center justify-center">
                      <span className="text-[12px] text-white">
                        {cartItemCount}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <ModalSignIn />
              <a
                className="text-xs px-4 py-2 bg-white border border-neutral-800  text-neutral-800 rounded-md font-medium"
                href="/sign-in"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
