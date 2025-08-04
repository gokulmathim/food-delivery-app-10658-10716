import React, { useReducer, useContext, createContext } from "react";

const CartContext = createContext();

// Actions: add item, remove item, update quantity, clear, set
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        // update quantity
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // PUBLIC_INTERFACE
  const addItem = (item) => dispatch({ type: "ADD_ITEM", item });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useCart() {
  return useContext(CartContext);
}
