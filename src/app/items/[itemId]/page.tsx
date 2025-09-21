"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { uploadImage } from "@/features/items/api/images";
import { useDeleteItem, useUpdateItem } from "@/features/items/api/mutations";
import { useItemQuery, useToggleCompleted } from "@/features/items/api/queries";
import { IMAGE_PATHS, IMAGES } from "@/components/shared/image/image";
import { ICONS } from "@/components/shared/icon";
import { BasicButton } from "@/components/shared";
import { CheckListItem } from "@/components/shared/check/CheckListItem";
import { CheckListDetailItem } from "@/components/shared/check/CheckListDetailItem";
import { UploadButton } from "@/components/shared/button/UploadButton";

export default function ItemDetailPage() {
  const params = useParams<{ itemId: string }>();
  const id = Number(params.itemId); // 서버가 number 사용
  const router = useRouter();

  const { data: item, isLoading, isError, error } = useItemQuery(id);
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();

  // form state
  const [name, setName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const toggleCompleted = useToggleCompleted();

  // item 로드 → form 동기화
  useEffect(() => {
    if (!item) return;
    setName(item.name ?? "");
    setIsCompleted(!!item.isCompleted);
    setMemo(item.memo ?? "");
    setImageUrl(item.imageUrl ?? null);
  }, [item]);

  // 저장
  const onSave = () => {
    if (!name.trim()) {
      alert("이름을 입력해 주세요.");
      return;
    }
    updateItem.mutate(
      { id, name: name.trim(), isCompleted, memo, imageUrl: imageUrl || "" },
      { onSuccess: () => router.push("/") }
    );
  };

  // 삭제
  const onDelete = () => {
    if (!confirm("정말 삭제할까요?")) return;
    deleteItem.mutate(id, { onSuccess: () => router.push("/") });
  };

  // 컴포넌트 상단
  const editableRef = useRef<HTMLDivElement>(null);

  // memo 상태 ↔ contentEditable 동기화
  useEffect(() => {
    const el = editableRef.current;
    if (!el) return;
    if (el.innerText !== memo) el.innerText = memo ?? "";
  }, [memo]);

  if (isLoading) return <div className="p-4">불러오는 중…</div>;
  if (isError) {
    return (
      <div className="p-4 text-red-600">
        항목을 불러오지 못했어요.
        <pre className="text-xs mt-2">{(error as Error)?.message}</pre>
      </div>
    );
  }
  if (!item) return <div className="p-4">항목이 없습니다.</div>;

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-6">
      {/* 제목 + 완료 토글 */}
      <div className="flex items-center gap-3">
        <CheckListDetailItem
          key={id}
          label={name}
          checked={isCompleted}
          disabled={toggleCompleted.isPending}
        />
      </div>

      {/* 이미지 + 메모 (4:6, gap 10px, 높이 311px) */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_6fr] gap-5">
        {/* 이미지 업로드 (4) */}
        {/* <div className="relative rounded-xl border-2 border-dashed p-4 h-[311px] flex items-center justify-center overflow-hidden">
          <label className="flex flex-col items-center justify-center text-slate-500 cursor-pointer w-full h-full">
            <span className="text-sm mb-2">
              이미지 추가 (영문 파일명 / ≤ 5MB)
            </span>
            <span className="text-2xl">＋</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickImage}
            />
          </label>
        </div> */}
        <UploadButton
          imageUrl={imageUrl} // 상태에 저장된 url 전달
          onSelect={async (file) => {
            const { url } = await uploadImage(file); // 업로드 API 호출
            setImageUrl(url); // url 상태에 반영
          }}
        />
        <div className="relative rounded-xl border p-4 h-[311px] overflow-hidden">
          {/* 배경 */}
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${IMAGE_PATHS[IMAGES.MEMO]})` }}
            aria-hidden
          />

          <div className="relative z-10 h-full flex flex-col">
            <div className="text-center text-sm text-amber-800">Memo</div>

            {/* ▶ 중앙 정렬 에디터 */}
            <div className="relative w-full h-[311px] border rounded-xl mt-2">
              <div
                ref={editableRef}
                contentEditable
                role="textbox"
                aria-label="메모"
                data-placeholder="메모를 입력하세요"
                // 중앙 정렬 (가로·세로), 줄바꿈/한글 줄나눔 지원
                className="w-full h-full flex items-center justify-center text-center
                   outline-none bg-transparent px-4 leading-6
                   whitespace-pre-wrap break-all overflow-auto"
                // 값 동기화
                onInput={(e) => {
                  const text = (e.currentTarget as HTMLDivElement).innerText;
                  setMemo(text);
                  if (text.trim() === "")
                    (e.currentTarget as HTMLDivElement).innerHTML = ""; // <br> 제거
                }}
                suppressContentEditableWarning
              />
            </div>
          </div>
        </div>
      </div>

      {/* 액션 */}
      <div className="flex items-center gap-3 justify-center">
        <BasicButton
          className="!h-14 whitespace-nowrap"
          bg="bg-[var(--color-lime-300)]"
          textColor="--color-slate-900"
          borderColor="border-[var(--color-slate-900)]"
          radius={24}
          iconName={ICONS.CHECK}
          gap={8}
          shadowX={4}
          shadowY={3}
          shadowBlur={0}
          shadowSpread={0}
          onClick={() => {
            onSave();
          }}
          width={168}
          height={56}
        >
          <span className="hidden sm:inline">수정 완료</span>
        </BasicButton>
        <BasicButton
          className="!h-14 whitespace-nowrap"
          bg="bg-[var(--color-rose-500)]"
          textColor="text-white"
          borderColor="border-[var(--color-slate-900)]"
          radius={24}
          iconName={ICONS.CLOSE}
          gap={8}
          shadowX={4}
          shadowY={3}
          shadowBlur={0}
          shadowSpread={0}
          onClick={() => {
            onDelete();
          }}
          width={168}
          height={56}
        >
          <span className="hidden sm:inline">삭제하기</span>
        </BasicButton>
      </div>
    </div>
  );
}

<style jsx>{`
  [contenteditable][data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: #94a3b8; /* slate-400 */
    pointer-events: none;
  }
  /* 긴 연속 문자열도 강제 줄바꿈 */
  [contenteditable] {
    overflow-wrap: anywhere;
    word-break: break-word;
  }
`}</style>;
