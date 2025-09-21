"use client";

import { useState } from "react";
import { BasicButton } from "@/components/shared/button/BasicButton";
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
      <section className="mx-auto w-full px-4">
        <div className="flex w-full items-center gap-3">
          <div className="flex-1 min-w-0">
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

          <div className="shrink-0">
            <BasicButton
              className="!h-14 whitespace-nowrap"
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
            >
              {/* 👇 모바일(<375px)에서는 텍스트 숨김, sm(≥375px)부터 보임 */}
              <span className="hidden sm:inline">추가하기</span>
            </BasicButton>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
    </>
  );
}

function EmptyBlock({
  chipTone,
  image,
  message,
}: {
  chipTone: keyof typeof LABEL_BY_TONE; // "todo" | "done"
  image: (typeof IMAGES)[keyof typeof IMAGES];
  message: string;
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
      <p className="mt-4 text-center ty-base-r text-[var(--color-slate-500)] whitespace-pre-line break-keep">
        {message}
      </p>
    </div>
  );
}
