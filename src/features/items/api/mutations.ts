"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import type { CreateItemDto, Item } from "../types";

/** 생성 */
export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateItemDto) =>
      api(`/items`, {
        method: "POST",
        body: JSON.stringify(payload),
      }) as Promise<Item>,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

/** 수정 */
export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation<
    Item,
    Error,
    { id: number } & Partial<
      Pick<Item, "name" | "memo" | "imageUrl" | "isCompleted">
    >
  >({
    mutationFn: ({ id, ...rest }) =>
      api(`/items/${id}`, {
        method: "PATCH",
        body: JSON.stringify(rest), // ✅ body에서는 id 빠짐
      }) as Promise<Item>,
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["items"] });
      qc.invalidateQueries({ queryKey: ["item", updated.id] });
    },
  });
}

/** 삭제 */
export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) =>
      api(`/items/${id}`, { method: "DELETE" }) as Promise<unknown>,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

/** 완료 토글 헬퍼 */
export function useToggleDone() {
  const { mutate, ...rest } = useUpdateItem();

  return {
    // 호출 방식은 기존과 동일: toggleDone.mutate(item)
    mutate: (item: Item) =>
      mutate({ id: item.id, isCompleted: !item.isCompleted }),
    ...rest,
  };
}
