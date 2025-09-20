# 코드잇 과제

## 1. 사용 기술

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **TanStack Query v5**
- **REST API**
- **Vercel 배포**

---

## 2. 프로젝트 구조

```
src/
├─ app/
│  ├─ layout.tsx         # 전역 레이아웃
│  └─ page.tsx           # 루트 페이지
├─ features/
│  └─ items/
│     ├─ api/
│     │  ├─ client.ts    # fetch 래퍼
│     │  └─ queries.ts   # TanStack Query 훅
│     └─ types.ts        # Item 타입 정의
├─ components/
│  └─ shared/
│     ├─ Icon.tsx        # 공용 아이콘 컴포넌트
│     ├─ icons.ts        # 아이콘 이름 & alt 매핑
│     ├─ AppImage.tsx    # 공용 이미지 컴포넌트
│     └─ images.ts       # 이미지 이름 & alt 매핑
├─ shared/
│  └─ providers/
│     └─ QueryProvider.tsx
└─ styles/
   └─ globals.css        # Tailwind + 디자인 토큰
public/
  icons/                 # 정적 아이콘 리소스 (PNG/SVG)
  images/                # 정적 이미지 리소스 (로고, empty-state 등)
```

---

## 3. 시작하기

### 3.1 클론 & 의존성 설치

```bash
git clone https://github.com/yourname/todo-list.git
cd todo-list
yarn install
```

### 3.2 환경 변수 설정

프로젝트 루트에 `.env.local` 생성:

```bash
NEXT_PUBLIC_API_BASE_URL=https://assignment-todolist-api.vercel.app/api
NEXT_PUBLIC_TENANT_ID=your-tenant-id   # 본인 식별자 (닉네임/아이디)
```

### 3.3 개발 서버 실행

```bash
yarn dev
```

→ 브라우저에서 `http://localhost:3000` 접속

### 3.4 빌드 & 시작

```bash
yarn build
yarn start
```

---

## 4. 디자인 시스템

### 4.1 컬러

- 의미 기반 토큰: `bg-surface`, `text-text`, `bg-primary`, `text-danger`, `text-success` …
- Tailwind v4 `@theme`로 정의한 CSS 변수 사용

### 4.2 폰트

- **NanumSquare** 폰트 적용
- `@theme`에서 `--font-nanum`, `--text-xl/lg/base` 등 정의
- Tailwind 유틸: `text-xl font-bold`, `text-base font-normal` 등

---

## 5. 이미지 & 아이콘

### 5.1 아이콘 (public/icons)

- `checkbox-empty.png`
- `checkbox-checked.png`
- `plus-sm.png`
- `plus-lg.png`
- `check.png`
- `close.png`
- `edit.png`

### 5.2 이미지 (public/images)

- `logo.png` / `logo-mark.png`
- `todo.png` / `done.png` / `memo.png`
- `empty-writing-sm.png` / `empty-writing-lg.png`
- `empty-sweat-sm.png` / `empty-sweat-lg.png`
- `searchbar.png` / `image.png`

→ 공용 컴포넌트 `Icon`, `AppImage`와 상수(`ICONS`, `IMAGES`)로 관리
