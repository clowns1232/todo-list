"use client";

/**
 * 이미지 업로드 유틸
 * - 규칙: 파일명 영문/숫자/._- 만 허용
 * - 용량: 5MB 이하
 * - 엔드포인트: POST /api/{tenantId}/images/upload (multipart/form-data)
 */
export function validateImage(file: File) {
  if (!/^[A-Za-z0-9._-]+$/.test(file.name)) {
    throw new Error("이미지 파일 이름은 영어/숫자/._- 만 사용할 수 있어요.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("이미지 파일 크기는 5MB 이하여야 해요.");
  }
}

export async function uploadImage(file: File) {
  validateImage(file);

  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const tenant = process.env.NEXT_PUBLIC_TENANT_ID!;
  if (!base || !tenant)
    throw new Error("환경변수(NEXT_PUBLIC_API_BASE_URL/TENANT_ID) 확인 필요");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${base}/${tenant}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`이미지 업로드 실패: ${msg || res.statusText}`);
  }
  return (await res.json()) as { url: string };
}
