import { create } from 'zustand';
import { Product, CartItem } from '@/types';

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find(item => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    });
  },
  
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter(item => item.id !== productId)
    }));
  },
  
  clearCart: () => set({ cart: [] }),
  
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));
