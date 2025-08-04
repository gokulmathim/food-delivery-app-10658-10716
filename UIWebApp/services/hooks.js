import { useQuery } from "react-query";
import api from "./api";

/**
 * Retrieves restaurants from the backend API.
 */
export function useRestaurants(filters = {}) {
  return useQuery(["restaurants", filters], async () => {
    const res = await api.get("/restaurants", { params: filters });
    return res.data;
  });
}

/**
 * Retrieves menu items for a given restaurant.
 */
export function useMenu(restaurantId) {
  return useQuery(["menu", restaurantId], async () => {
    if (!restaurantId) return [];
    const res = await api.get(`/restaurants/${restaurantId}/menu`);
    return res.data;
  });
}

/**
 * Retrieves active or past orders for a user.
 */
export function useOrders() {
  return useQuery(["orders"], async () => {
    const res = await api.get("/orders");
    return res.data;
  });
}
