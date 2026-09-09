"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  cartId: string;
  productId: string;
  nombre: string;
  marca: string;
  type: "decant" | "completo";
  size: string;
  ml: number;
  cantidad: number;
  precioUnitario: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cantidad">) => void;
  removeItem: (cartId: string) => void;
  updateCantidad: (cartId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  subtotalDecants: number;
  porcentajeDescuento: number;
  montoDescuento: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function calcPorcentaje(subtotal: number): number {
  if (subtotal >= 700) return 0.10;
  if (subtotal >= 500) return 0.05;
  return 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (newItem: Omit<CartItem, "cantidad">) => {
    setItems(prev => {
      const existing = prev.find(i => i.cartId === newItem.cartId);
      if (existing) {
        return prev.map(i =>
          i.cartId === newItem.cartId ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...newItem, cantidad: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (cartId: string) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
  };

  const updateCantidad = (cartId: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i => i.cartId === cartId ? { ...i, cantidad: i.cantidad + delta } : i)
        .filter(i => i.cantidad > 0)
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const itemCount = items.reduce((sum, i) => sum + i.cantidad, 0);
  const subtotal = items.reduce((sum, i) => sum + i.precioUnitario * i.cantidad, 0);
  const subtotalDecants = items
    .filter(i => i.type === "decant")
    .reduce((sum, i) => sum + i.precioUnitario * i.cantidad, 0);
  const porcentajeDescuento = calcPorcentaje(subtotalDecants);
  const montoDescuento = subtotalDecants * porcentajeDescuento;
  const total = subtotal - montoDescuento;

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateCantidad, clearCart,
      itemCount, subtotal, subtotalDecants, porcentajeDescuento, montoDescuento, total,
      isOpen, openCart, closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
