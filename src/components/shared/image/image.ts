export const IMAGES = {
  LOGO: "logo",
  LOGO_DOIT: "logo-doit",

  TODO: "todo",
  DONE: "done",
  TODO_LABEL: "todo-label",
  DONE_LABEL: "done-label",
  MEMO: "memo",

  EMPTY_WRITING_SM: "empty-writing-sm",
  EMPTY_WRITING_LG: "empty-writing-lg",
  EMPTY_SWEAT_SM: "empty-sweat-sm",
  EMPTY_SWEAT_LG: "empty-sweat-lg",

  SEARCHBAR: "searchbar",
  IMAGE: "image",
} as const;

export type ImageName = (typeof IMAGES)[keyof typeof IMAGES];

export const IMAGE_ALTS: Record<ImageName, string> = {
  logo: "Do It 로고",
  "logo-doit": "Do It 심볼 로고",

  todo: "할 일",
  done: "완료됨",
  "todo-label": "할 일 라벨",
  "done-label": "완료됨 라벨",
  memo: "메모",

  "empty-writing-sm": "비어있음 - 글쓰기(작은)",
  "empty-writing-lg": "비어있음 - 글쓰기(큰)",
  "empty-sweat-sm": "비어있음 - 땀 흘림(작은)",
  "empty-sweat-lg": "비어있음 - 땀 흘림(큰)",

  searchbar: "검색창",
  image: "이미지",
};

export const IMAGE_PATHS: Record<ImageName, string> = (() => {
  const map = {} as Record<ImageName, string>;
  (Object.values(IMAGES) as ImageName[]).forEach((name) => {
    map[name] = `/images/${name}.png`;
  });
  return map;
})();
