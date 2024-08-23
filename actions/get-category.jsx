const GetCategory = async () => {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const category = await response.json();
    return category;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default GetCategory;