const GetProduct = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch productssss');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  export default GetProduct;