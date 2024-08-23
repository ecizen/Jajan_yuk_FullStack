
export const getProductById = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  


//   import { Product } from "@/types";

// import qs from "query-string";

// const URL = `${process.env.PUBLIC_API_URL}/products`;

// interface Query {
//   categoryId?: string;
//   isFeatured?: boolean;
// }

// const getProducts = async (query: Query): Promise<Product[]> => {
//   const url = qs.stringifyUrl({
//     url: URL,
//     query: {
//       categoryId: query.categoryId,
//       isFeatured: query.isFeatured,
//     },
//   });

//   const res = await fetch(url);

//   return res.json();
// };

// export default getProducts;