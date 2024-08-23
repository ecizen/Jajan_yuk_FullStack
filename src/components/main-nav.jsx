"use client";
import { useEffect, useState } from "react";
import GetProduct from "../../actions/get-product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GetCategory from "../../actions/get-category";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ArrowDown, ArrowDown10, ArrowDownIcon } from "lucide-react";

const MainNav = ({
    data
}) => {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const handleActvieDropdown = () =>{
      setActive(!active)
  }

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    const loadProducts = async () => {
      const fetchedProducts = await GetCategory();
      setCategories(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    //    <ul className=" flex space-x-4 items-center">
    //         {categories.map((category) => (
    //             <li className="cursor-pointer" key={category.id} onClick={() => router.push(`/product/category/${category.id}`)}>
    //               <span className="text-xs font-normal text-black">{category.name}</span>
    //             </li>
    //         ))}
    //    </ul>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger onClick={handleActvieDropdown} className="text-xs p-2  border flex items-center">Filter Category
          <ArrowDown  width={18} className={`${active ? ' rotate-180': ' rotate-0'} transition-all duration-500 ease-in-out`}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
           {categories.map((category) => (
             <DropdownMenuItem key={category.id} onClick={() => router.push(`/product/category/${category.id}`)}>
               {category.name}
             </DropdownMenuItem>
           ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MainNav;
