export { BasicButton } from "./BasicButton";

// 파일명이 CircleButton.tsx 라면 이름 통일 택1
// A. 파일명을 RoundIconButton.tsx로 바꿨다면:
export { RoundIconButton } from "./RoundIconButton";

// B. 파일명은 유지하되 컴포넌트 이름 alias:
export { default as RoundIconButton } from "./CircleButton";
