import { BasicButton, CircleButton } from "@/components/shared/button";
import { Icon } from "@/components/shared/icon/Icon";

export default function ButtonDemo() {
  return (
    <div className="flex gap-4 p-6">
      <BasicButton
        shadowX={4}
        shadowY={3}
        shadowBlur={0}
        shadowColor="rgba(15,23,42,1)"
        fontSizeToken="base"
        fontWeightToken="bold"
      >
        <Icon
          name="plus-sm"
          size={16}
          alt="체크박스 꺼짐"
          color="#000"
          alignY={-1}
        />
        아이콘버튼
      </BasicButton>

      <CircleButton
        ariaLabel="수정"
        size={64}
        bgColor="#0F172A50"
        borderColor="var(--color-slate-900)"
        borderWidth={10}
        iconName="edit"
        iconColor="#fff"
        iconSize="24px"
      />

      <CircleButton
        ariaLabel="추가"
        size={64}
        bgColor="var(--color-slate-200)"
        borderColor="var(--color-slate-200)"
        iconName="plus-sm"
        iconColor="#fff"
        iconSize="24px"
      />
    </div>
  );
}
