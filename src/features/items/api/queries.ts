import { useQuery } from "@tanstack/react-query";
import { api } from "./client";
import { Item } from "../types";

export const fetchItems = () => api("/items") as Promise<Item[]>;

export function useItemsQuery() {
  return useQuery({ queryKey: ["items"], queryFn: fetchItems });
}
