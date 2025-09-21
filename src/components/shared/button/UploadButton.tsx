"use client";

import { useRef } from "react";
import { AppImage } from "@/components/shared/image/AppImage";
import { IMAGES } from "@/components/shared/image";
import { CircleButton } from "./CircleButton";

type Props = {
  onSelect: (file: File) => void; // 파일 선택 시 콜백
  imageUrl?: string | null; // ✅ 미리보기 URL
  disabled?: boolean;
};

export function UploadButton({ onSelect, imageUrl, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const pick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/^[A-Za-z0-9._-]+$/.test(f.name)) {
      alert("영문/숫자/._- 만 파일명에 사용할 수 있어요.");
      e.currentTarget.value = "";
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 해요.");
      e.currentTarget.value = "";
      return;
    }
    onSelect(f);
    e.currentTarget.value = "";
  };

  const onDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      const fake = {
        target: { files: [f] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      pick(fake);
    }
  };

  return (
    <div className="relative">
      <div
        className="group relative flex h-[311px] w-full cursor-pointer items-center justify-center rounded-[18px] border-2 border-dashed border-sky-300 bg-slate-50 transition
                     hover:border-slate-400 focus-within:border-sky-400 overflow-hidden"
      >
        <label
          className="relative w-full h-full flex items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={pick}
            disabled={disabled}
          />

          {/* ✅ 이미지 미리보기 or placeholder */}
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="업로드 이미지"
              className="absolute inset-0 w-full h-full object-cover object-center" // ← 여기만 변경
            />
          ) : (
            <AppImage
              name={IMAGES.IMAGE}
              width={64}
              height={64}
              className="opacity-30 group-hover:opacity-60 transition"
            />
          )}
          {/* 오른쪽 아래 원형 버튼 */}
          <CircleButton
            type="button"
            aria-label="이미지 추가"
            onClick={() => inputRef.current?.click()}
            absolute
            bottom={16}
            right={16}
            size={56}
            bgColor="rgba(255,255,255,0.8)"
            borderColor="#CBD5E1"
            iconName="plus-sm"
          />
        </label>
      </div>
    </div>
  );
}
