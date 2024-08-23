const GetProductSearch = async ({ search }) => {
    try {
      const queryString = search ? `?search=${encodeURIComponent(search)}` : '';
      const response = await fetch(`/api/products${queryString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error(error);
      if (!search) {
        return [];
      }
    }
  };
  
  export default GetProductSearch;
  