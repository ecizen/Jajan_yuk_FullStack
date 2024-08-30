"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import GetCategory from "../../../actions/get-category";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const MainNavLanding = ({ data }) => {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await GetCategory();
      setCategories(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    // <div className="flex items-center space-x-6">
    //   {categories.map((item) => (
    //     <Link
    //       key={item.id}
    //       className={`${
    //         categoryId === item.id ? "text-blue-500 font-bold" : "text-sm text-neutral-800"
    //       }`}
    //       href={`/home/product/category/${item.id}`}
    //     >
    //       <span>{item.name}</span>
    //     </Link>
    //   ))}
    // </div>
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xs text-neutral-700">
        Categories
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {categories.map((category) => (
          <div key={category.id}>
            <DropdownMenuItem>
              <a href={`/home/product/category/${category.id}`}>
                {category.name}
              </a>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MainNavLanding;
