export type Item = {
  id: number; // 필수
  name: string; // 필수
  isCompleted: boolean; // 필수

  tenantId?: string;
  memo?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

// 생성/수정 DTO
export type CreateItemDto = {
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean; // 기본 false면 안 보내도 됨
};

export type UpdateItemDto = {
  id: number;
  name?: string;
  memo?: string | null;
  imageUrl?: string | null;
  isCompleted?: boolean;
};
