export async function fetchProducts(categoryId?: string, brandId?: string) {
  try {
    let url = "https://ecommerce.routemisr.com/api/v1/products";
    if (categoryId) {
      url += `?category=${categoryId}`;
    } else if (brandId) {
      url += `?brand=${brandId}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (err: any) {
    throw err;
  }
}

export async function fetchProductById(productId: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (err: any) {
    throw err;
  }
}

export async function fetchCategoryById(categoryId: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (err: any) {
    throw err;
  }
}

export async function fetchBrandById(brandId: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
  } catch (err: any) {
    throw err;
  }
}