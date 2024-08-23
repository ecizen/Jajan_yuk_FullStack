'use client';

import React, { useState, useEffect } from "react";
import MainNav from "./main-nav";
import { Bookmark, MenuIcon, SearchIcon, ShoppingBag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import axios from 'axios';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const params  =  useParams()
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (session) {
        try {
          const response = await axios.get('/api/carts', {
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
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto sticky top-0 border-b z-40 bg-white">
      <nav className="flex justify-between items-center lg:px-12 md:px-6 px-6 py-6">
        <div className="lg:hidden">
          <MenuIcon />
        </div>
        <div  className=" flex gap-4">
          <a
            href="/"
            className="lg:block hidden text-xl text-gray-900 font-semibold"
          >
            JAJAN.YUK
          </a>
         
        </div>
        <div className="">
          <form onSubmit={handleSearch} className="lg:flex hidden items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or category..."
              className="border border-gray-200 border-r-0 p-3 text-xs w-[340px]"
            />
            <MainNav />
            <button
              type="submit"
              className="px-3 h-[41px] rounded-none bg-black text-white"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
        {session ? (
          <div className="flex items-center space-x-4">
            <a className="/cart-shoop">
              <Bookmark width={18} />
            </a>
            <a  href="/product/cart" className="relative">
              <ShoppingBag width={18} >

              </ShoppingBag>
              <div className=" absolute -top-2 left-2">
              {cartItemCount > 0 && (
                <div className=" w-[16px] h-[16px] rounded-full bg-red-400 flex items-center justify-center">
                  <span className="text-[12px] text-white">{cartItemCount}</span>
                </div>
              )}
              </div>
            </a>
            <Image src={session.user.image} alt="User Profile" width={30} height={30}  className=" rounded-full" />
          </div>
        ) : (
          <a href="/sign-in">Login</a>
        )}
      </nav>
    </div>
  );
}