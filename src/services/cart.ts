import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";

interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: any;
}

export async function addProductToCart(productId: string, token: string): Promise<AddToCartResponse> {
  try {
    const response = await axios.post(
      BASE_URL,
      { productId },
      { headers: { token, "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
}

interface RemoveFromCartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: any;
}

export async function removeProductFromCart(
  productId: string,
  token: string
): Promise<RemoveFromCartResponse> {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${productId}`,
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
}

interface ClearCartResponse {
  message: string;
}

export async function clearUserCart(token: string): Promise<ClearCartResponse> {
  try {
    const response = await axios.delete(
      BASE_URL,
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error clearing user cart:", error);
    throw error;
  }
}

interface GetCartResponse {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string;
    cartOwner: string;
    products: {
      count: number;
      _id: string;
      product: {
        subcategory: any[];
        _id: string;
        title: string;
        quantity: number;
        imageCover: string;
        category: any;
        brand: any;
        ratingsAverage: number;
        id: string;
      };
      price: number;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
  };
}

export async function getLoggedUserCart(token: string): Promise<GetCartResponse> {
  try {
    const response = await axios.get(
      BASE_URL,
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user cart:", error);
    throw error;
  }
}

interface UpdateCartProductCountResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: any;
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

interface CreateOrderResponse {
  status: string;
  data: {
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: string;
    cartItems: {
      count: number;
      _id: string;
      product: string;
      price: number;
    }[];
    shippingAddress: ShippingAddress;
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
  };
}

export async function updateProductCountInCart(
  productId: string,
  count: number,
  token: string
): Promise<UpdateCartProductCountResponse> {
  try {
    const response = await axios.put(
      `${BASE_URL}/${productId}`,
      { count },
      { headers: { token, "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product count in cart:", error);
    throw error;
  }
}

export async function getUserCartId(token: string): Promise<string | null> {
  try {
    const cartData = await getLoggedUserCart(token);
    return cartData.data._id;
  } catch (error) {
    console.error("Error getting user cart ID:", error);
    return null;
  }
}

export async function createOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
  token: string
): Promise<CreateOrderResponse> {
  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      shippingAddress, // Sending shippingAddress directly
      { headers: { token, "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}