"use client";

import { CheckListDetailItem } from "@/components/shared/check/CheckListDetailItem";
import { CheckListItem } from "@/components/shared/check/CheckListItem";
import { useState } from "react";
import { SearchField } from "./ButtonDemo";

export default function ChecklistSearchDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);

  const [d, setD] = useState(true);

  const [input, setInput] = useState("");
  const longText =
    "길이가 길어질 경우 다음과 같이 계속 오른쪽으로 갑니다… 길이가 길어질 경우 다음과 같이 계속 오른쪽으로 갑니다… 길이가 길어질 경우 다음과 같이…";

  return (
    <main className="p-6 space-y-10 bg-[#3a3a3a]">
      {/* check-list */}
      <section className="p-4 rounded-lg border border-dashed border-violet-500/60">
        <h3 className="text-violet-400 mb-3">❖ check-list</h3>
        <div className="space-y-3 max-w-xl">
          <CheckListItem label="비타민 챙겨 먹기" checked={a} onChange={setA} />
          <CheckListItem label="비타민 챙겨 먹자" checked={b} onChange={setB} />
        </div>
      </section>

      {/* check-list-detail */}
      <section className="p-4 rounded-lg border border-dashed border-violet-500/60">
        <h3 className="text-violet-400 mb-3">❖ check-list-detail</h3>
        <div className="space-y-4 max-w-2xl">
          <CheckListDetailItem
            label="비타민 챙겨 먹기"
            checked={c}
            onChange={setC}
          />
          <CheckListDetailItem
            label="비타민 챙겨 먹기"
            checked={d}
            onChange={setD}
          />
        </div>
      </section>

      {/* search */}
      <section className="p-4 rounded-lg border border-dashed border-violet-500/60">
        <h3 className="text-violet-400 mb-3">❖ search</h3>
        <div className="space-y-3 max-w-2xl">
          <SearchField
            value={input}
            onChange={setInput}
            placeholder="할 일을 입력해주세요"
          />
          <SearchField value="비타민 먹기" onChange={() => {}} />
          <SearchField readOnlyDisplay value={longText} />
        </div>
      </section>
    </main>
  );
}
