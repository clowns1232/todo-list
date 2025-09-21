// src/app/page.tsx
"use client";

import { useState } from "react";
import { BasicButton } from "@/components/shared/button/BasicButton";
import { CircleButton } from "@/components/shared/button/CircleButton";
import { AppImage } from "@/components/shared/image/AppImage";
import { IMAGES } from "@/components/shared/image";
import { ICONS } from "@/components/shared/icon";
import { SearchField } from "@/components/shared/inputs/SearchField";

const LABEL_BY_TONE = {
  todo: IMAGES.TODO_LABEL,
  done: IMAGES.DONE_LABEL,
} as const;

export default function HomePage() {
  const [q, setQ] = useState("");

  return (
    <>
      {/* === 상단: 가운데 정렬된 검색바 + 추가하기(별개 컴포넌트) === */}
      <section className="mx-auto w-full px-4">
        <div className="flex w-full items-center gap-3">
          {/* 검색바: 남는 폭 전부 */}
          <div className="flex-1">
            <SearchField
              value={q}
              onChange={setQ}
              placeholder="할 일을 입력해주세요"
              size="lg"
              shadowX={4}
              shadowY={3}
              shadowBlur={0}
              shadowColor="rgba(15,23,42,1)"
            />
          </div>

          {/* 추가하기 버튼: 별개, 오른쪽에 배치 */}
          <div className="hidden md:block">
            <BasicButton
              className="!h-14" // 검색바와 높이(56) 맞춤
              bg="bg-[var(--color-violet-600)]"
              textColor="text-white"
              borderColor="border-[var(--color-slate-900)]"
              radius={24}
              iconName={ICONS.PLUS_SM}
              gap={8}
              shadowX={4}
              shadowY={3}
              shadowBlur={0}
              shadowSpread={0}
              // 너비는 자동; 고정하고 싶으면 width={168}
            >
              추가하기
            </BasicButton>
          </div>
        </div>
      </section>

      {/* === 빈 상태 블록 === */}
      <section className="mx-auto w-full px-4 py-10">
        <div className="grid grid-cols-2 gap-10">
          <EmptyBlock
            chipTone="todo"
            image={IMAGES.EMPTY_WRITING_LG}
            message={"할 일이 없어요.\nTODO에 새로운 항목을 추가해보세요"}
          />
          <EmptyBlock
            chipTone="done"
            image={IMAGES.EMPTY_SWEAT_LG}
            message={"아직 완료 없음.\n완료된 항목은 여기에 표시됩니다"}
          />
        </div>
      </section>

      {/* 모바일 플로팅 + 버튼 (원하면 유지) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <CircleButton
          ariaLabel="할 일 추가"
          size={64}
          bgColor="#0F172A80"
          borderColor="var(--color-slate-900)"
          borderWidth={3}
          iconName={ICONS.PLUS_LG}
          iconColor="#fff"
        />
      </div>
    </>
  );
}

/* ====================== 내부 컴포넌트 ====================== */

function EmptyBlock({
  chipTone,
  image,
  message,
  messageWidth = 177,
}: {
  chipTone: keyof typeof LABEL_BY_TONE; // "todo" | "done"
  image: (typeof IMAGES)[keyof typeof IMAGES];
  message: string;
  messageWidth?: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl">
      <AppImage
        name={LABEL_BY_TONE[chipTone]}
        priority
        className="mt-6 opacity-90 self-start"
      />
      <AppImage
        name={image}
        width={240}
        height={170}
        alt=""
        className="mt-6 opacity-90"
      />
      <p
        className="mt-4 text-center ty-base-r text-[var(--color-slate-500)] whitespace-pre-line break-keep"
        style={{ width: messageWidth }}
      >
        {message}
      </p>
    </div>
  );
}
