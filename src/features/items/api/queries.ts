"use client";

import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "./client";
import type { Item } from "../types";

/** ===== GET ===== */

export const fetchItems = () => api(`/items`) as Promise<Item[]>;
export const fetchItem = (id: string | number) =>
  api(`/items/${id}`) as Promise<Item>;

export function useItemsQuery(options?: UseQueryOptions<Item[], Error>) {
  return useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: fetchItems,
    ...options,
  });
}

export function useItemQuery(
  id: string | number | undefined,
  options?: UseQueryOptions<Item, Error>
) {
  return useQuery<Item, Error>({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id as string | number),
    enabled: id !== undefined && id !== null,
    ...options,
  });
}

/** ===== POST: 생성 ===== */

/** 클라이언트에서 보낼 생성 입력 타입 (id 난수, name 필수) */
type CreateItemInput = {
  id: number;
  name: string;
  isCompleted?: boolean; // 안 주면 false로 보냄
};

export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation<Item, Error, CreateItemInput>({
    mutationFn: (payload) =>
      api(`/items`, {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          // 기본값 주입: 호출부에서 생략해도 항상 false로 전송
          isCompleted: payload.isCompleted ?? false,
        }),
      }) as Promise<Item>,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

/** ===== PATCH: 완료 토글 ===== */

export function useToggleCompleted() {
  const qc = useQueryClient();
  return useMutation<Item, Error, Item>({
    mutationFn: (item) =>
      api(`/items/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: !item.isCompleted }),
      }) as Promise<Item>,
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["items"] });
      qc.invalidateQueries({ queryKey: ["item", String(updated.id)] });
    },
  });
}
// ===== PATCH: 수정(부분 업데이트)
export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation<
    Item,
    Error,
    {
      id: number;
      name?: string;
      memo?: string | null;
      imageUrl?: string | null;
      isCompleted?: boolean;
    }
  >({
    mutationFn: (payload) =>
      api(`/items/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: payload.name,
          memo: payload.memo,
          imageUrl: payload.imageUrl,
          isCompleted: payload.isCompleted,
        }),
      }) as Promise<Item>,
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["items"] });
      qc.invalidateQueries({ queryKey: ["item", updated.id] });
    },
  });
}

// ===== DELETE: 삭제
export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) =>
      api(`/items/${id}`, { method: "DELETE" }) as Promise<void>,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
