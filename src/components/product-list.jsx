import { useSession } from "next-auth/react";
import ModalSignIn from "./modal-sign-in";
import Image from "next/image";

const ProductList = ({ title }) => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (productId, storeId) => {
    if (status === "authenticated" && session?.user?.id) {
      setShowModal(true);
    } else {
      router.push(`/home/product/${productId}`);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white cursor-pointer group  rounded-xl border p-3 space-y-4"
            >
              <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                  onClick={() => handleClick(product.id)}
                  fill
                  alt="image"
                  src={product?.images?.[0]?.url || "/fallback-image.jpg"}
                  className="aspect-square object-cover rounded-md group-hover:brightness-50 transition-all ease-in-out duration-300"
                />
                {/* ... */}
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
      {showModal && <ModalSignIn />}
    </div>
  );
};

export default ProductList;