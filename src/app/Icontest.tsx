import { Icon } from "@/components/shared/Icon";

export function Icontest() {
  return (
    <div className="flex items-center gap-2">
      <Icon name="check" size={24} alt="체크박스 꺼짐" />
      <span className="text-text">할 일 내용</span>
    </div>
  );
}
