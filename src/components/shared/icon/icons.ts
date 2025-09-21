export const ICONS = {
  CHECKBOX_EMPTY: "checkbox-empty",
  CHECKBOX_CHECKED: "checkbox-checked",
  PLUS_SM: "plus-sm",
  PLUS_LG: "plus-lg",
  CHECK: "check",
  CLOSE: "close",
  EDIT: "edit",
} as const;

export type IconName = (typeof ICONS)[keyof typeof ICONS];

export const ICON_ALTS = {
  "checkbox-empty": "체크박스 비어있음",
  "checkbox-checked": "체크박스 체크됨",
  "plus-sm": "작은 플러스",
  "plus-lg": "큰 플러스",
  check: "체크 표시",
  close: "닫기",
  edit: "수정",
} satisfies Record<IconName, string>;
