import { itemBottomNavgiation } from "@/constant/item-bottom-navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomNavigation = () => {
    return (
        <div className="container w-full h-[70px] lg:hidden fixed bottom-0 bg-white p-6 border border-t-2 border-neutral-100 flex justify-between">
         {itemBottomNavgiation.map((item) => (
             <a key={item.id} href={item.href} className="flex flex-col justify-center items-center space-y-4">
                <FontAwesomeIcon icon={item.icon} width={50}/>
                <div className="">
                    <p className=" text-xs">{item.title}</p>
                </div>
             </a>   
         ))} 
        </div>
    )
}

export default BottomNavigation;