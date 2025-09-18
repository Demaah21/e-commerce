import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

interface AddToWishlistResponse {
  status: string;
  message: string;
  data: string[]; // Array of product IDs in the wishlist
}

interface RemoveFromWishlistResponse {
  status: string;
  message: string;
  data: string[]; // Array of product IDs in the wishlist
}

interface GetWishlistResponse {
  status: string;
  count: number;
  data: any[]; // Array of product objects in the wishlist
}

export async function addToWishlist(productId: string, token: string): Promise<AddToWishlistResponse> {
  try {
    const response = await axios.post(
      BASE_URL,
      { productId },
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
}

export async function removeFromWishlist(productId: string, token: string): Promise<RemoveFromWishlistResponse> {
  try {
    const response = await axios.delete(`${BASE_URL}/${productId}`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
}

export async function getLoggedUserWishlist(token: string): Promise<GetWishlistResponse> {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
}