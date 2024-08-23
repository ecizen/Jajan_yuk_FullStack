// actions/get-product-by-category.js

const GetProductByCategory = async (id) => {

    try {
        // Example API call to fetch products by category
        const response = await fetch(`/api/products?category=${id}`);
        
      if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const products = await response.json();
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
        
    }

    export default GetProductByCategory;

// Usage in your component: