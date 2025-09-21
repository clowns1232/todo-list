"use client";

import { useState } from "react";
import { BasicButton } from "@/components/shared/button/BasicButton";
import { AppImage } from "@/components/shared/image/AppImage";
import { IMAGES } from "@/components/shared/image";
import { ICONS } from "@/components/shared/icon";
import { SearchField } from "@/components/shared/inputs/SearchField";
import {
  useItemsQuery,
  useToggleCompleted,
} from "@/features/items/api/queries";
import { CheckListItem } from "@/components/shared/check/CheckListItem";
import { useCreateItem } from "@/features/items/api/mutations";

const LABEL_BY_TONE = {
  todo: IMAGES.TODO_LABEL,
  done: IMAGES.DONE_LABEL,
} as const;

export default function HomePage() {
  const [q, setQ] = useState("");

  const { data: itemList = [], isLoading } = useItemsQuery();
  const createItem = useCreateItem();
  const toggleCompleted = useToggleCompleted();

  const onAdd = () => {
    const name = q.trim();
    if (!name) return;

    createItem.mutate(
      {
        name,
      },
      { onSuccess: () => setQ("") }
    );
  };

  const todos = itemList.filter((it) => !it.isCompleted); // 진행 중
  const dones = itemList.filter((it) => it.isCompleted); // 완료

  if (isLoading || toggleCompleted.isPending || createItem.isPending) {
    return <div>목록 불러오는 중…</div>;
  }

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
              onClick={() => {
                onAdd();
              }}
            >
              <span className="hidden sm:inline">추가하기</span>
            </BasicButton>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* TODO */}
          <div className="flex flex-col rounded-2xl gap-5">
            <AppImage
              name={IMAGES.TODO_LABEL}
              className="mt-6 opacity-90 self-start"
            />
            {todos.length > 0 ? (
              <div className="space-y-3">
                {todos.map((it) => (
                  <CheckListItem
                    key={it.id}
                    label={it.name}
                    checked={false}
                    onToggle={() => {
                      toggleCompleted.mutate(it);
                    }}
                    disabled={toggleCompleted.isPending}

                    // 상세로 이동하고 싶으면 아래처럼 래핑 가능
                    // renderRight={() => <Link href={`/items/${it.id}`}>상세</Link>}
                  />
                ))}
              </div>
            ) : (
              <EmptyBlock
                chipTone="todo"
                image={IMAGES.EMPTY_WRITING_LG}
                message={"할 일이 없어요.\nTODO에 새로운 항목을 추가해보세요"}
              />
            )}
          </div>

          {/* DONE */}
          <div className="flex flex-col rounded-2xl gap-5">
            <AppImage
              name={IMAGES.DONE_LABEL}
              className="mt-6 opacity-90 self-start"
            />

            {dones.length > 0 ? (
              <div className="space-y-3">
                {dones.map((it) => (
                  <CheckListItem
                    key={it.id}
                    label={it.name}
                    checked
                    onToggle={() => {
                      toggleCompleted.mutate(it);
                    }}
                    disabled={toggleCompleted.isPending}
                  />
                ))}
              </div>
            ) : (
              <EmptyBlock
                chipTone="done"
                image={IMAGES.EMPTY_SWEAT_LG}
                message={"아직 완료 없음.\n완료된 항목은 여기에 표시됩니다"}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function EmptyBlock({
  image,
  message,
}: {
  chipTone: keyof typeof LABEL_BY_TONE; // "todo" | "done"
  image: (typeof IMAGES)[keyof typeof IMAGES];
  message: string;
}) {
  return (
    <>
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
    </>
  );
}
