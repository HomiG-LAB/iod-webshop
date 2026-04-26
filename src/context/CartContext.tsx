"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type CartProduct = {
  id: string | number;
  name: string;
  price: string;
  image: string;
  alt?: string;
};

export type CartItem = {
  product: CartProduct;
  size: string;
  sizeLabel: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; productId: string | number; size: string }
  | { type: "UPDATE_QTY"; productId: string | number; size: string; qty: number }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "HYDRATE"; payload: CartItem[] };

// ─── REDUCER ──────────────────────────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const idx = state.items.findIndex(
        (i) =>
          i.product.id === action.payload.product.id &&
          i.size === action.payload.size
      );
      if (idx >= 0) {
        const updated = [...state.items];
        updated[idx] = {
          ...updated[idx],
          qty: updated[idx].qty + action.payload.qty,
        };
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(i.product.id === action.productId && i.size === action.size)
        ),
      };

    case "UPDATE_QTY": {
      const updated = state.items
        .map((i) =>
          i.product.id === action.productId && i.size === action.size
            ? { ...i, qty: action.qty }
            : i
        )
        .filter((i) => i.qty > 0);
      return { ...state, items: updated };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "OPEN_DRAWER":
      return { ...state, isOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: string;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string | number, size: string) => void;
  updateQty: (productId: string | number, size: string, qty: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "iod_cart_v1";

// ─── PROVIDER ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch (_) {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (_) {}
  }, [state.items, hydrated]);

  // Derived values
  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.items
    .reduce((sum, i) => sum + parsePrice(i.product.price) * i.qty, 0)
    .toFixed(2);

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    totalItems,
    totalPrice,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (id, size) => dispatch({ type: "REMOVE_ITEM", productId: id, size }),
    updateQty: (id, size, qty) => dispatch({ type: "UPDATE_QTY", productId: id, size, qty }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    openDrawer: () => dispatch({ type: "OPEN_DRAWER" }),
    closeDrawer: () => dispatch({ type: "CLOSE_DRAWER" }),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
