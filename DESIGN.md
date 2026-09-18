---
name: WILD WEST U.S.A. 2026 · 승현 패밀리 미서부 로드트립
description: 오프라인 우선 가족 로드트립 대시보드 — 기획자모드(작전 문서철)와 가족모드(보물지도)를 오가는 2-way 뷰
colors:
  canyon-coral: "#e76f51"
  canyon-coral-text: "#c2410c"
  mojave-gold: "#f4a261"
  mojave-gold-text: "#b45309"
  pacific-teal: "#2a9d8f"
  pacific-teal-text: "#0f766e"
  bougainvillea-pink: "#d81159"
  bougainvillea-pink-text: "#be185d"
  sequoia-green: "#2b9348"
  sequoia-green-text: "#15803d"
  redrock-red: "#e63946"
  redrock-red-text: "#b91c1c"
  dune-amber: "#e9c46a"
  neutral-bg: "#f5f6f8"
  neutral-bg-2: "#ebeef2"
  neutral-card: "#ffffff"
  neutral-card-2: "#f8fafc"
  neutral-line: "#e2e8f0"
  neutral-text: "#1e293b"
  neutral-muted: "#64748b"
  neutral-muted-2: "#94a3b8"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Oswald, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.05em"
rounded:
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "14px"
  pill: "20px"
  full: "50%"
spacing:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "38px"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, {colors.canyon-coral} 0%, {colors.mojave-gold} 100%)"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  button-secondary:
    backgroundColor: "{colors.neutral-card}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "9px 12px"
  card:
    backgroundColor: "{colors.neutral-card}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "14px"
  badge-done:
    backgroundColor: "rgba(0,179,107,.15)"
    textColor: "{colors.sequoia-green-text}"
    rounded: "{rounded.pill}"
  badge-pending:
    backgroundColor: "rgba(245,124,0,.15)"
    textColor: "{colors.mojave-gold-text}"
    rounded: "{rounded.pill}"
  badge-todo:
    backgroundColor: "rgba(230,57,70,.15)"
    textColor: "{colors.redrock-red-text}"
    rounded: "{rounded.pill}"
---

# Design System: WILD WEST U.S.A. 2026 · 승현 패밀리 미서부 로드트립

## Overview

**Creative North Star: "The Field Trip Command Center"**

이 시스템은 여행 기획자(승현·지은)가 준비 단계부터 현장까지 들고 다니는 "작전 지휘소"다. 하이라인 테두리로 나뉜 평평한 데이터 카드, JetBrains Mono 숫자, 절제된 뱃지가 실무 도구의 담백하고 자신감 있는 태도를 만들고, 그 위에 coral→gold 그라데이션과 route-track 점선, pulse 애니메이션이 로드트립 특유의 모험적이고 에너지 넘치는 무드를 얹는다. 따뜻하고 캐주얼하되 유치하지 않은 균형이 핵심이며, 화려한 장식이나 불필요한 그림자로 정보 밀도를 해치는 방향은 확정적으로 배제한다.

같은 데이터를 다른 톤으로 감싸는 두 번째 세계가 공존한다. `data-view="family"`가 걸리면 팔레트 전체가 세피아 보물지도 톤으로 바뀌고 금액·예약번호가 사라지며, 여권 위젯과 하이라이트 카드가 동화책처럼 말을 건다. 이 대체 테마는 임시 스킨이 아니라 정식으로 공인된 두 번째 세계이며, 아래 색상·컴포넌트 규칙과 동등한 구속력을 가진다.

**Key Characteristics:**
- 하이라인 테두리 + 무배경 그림자가 기본, 그림자는 "화면에서 떠오른 것"에만 허용
- JetBrains Mono는 사람이 읽는 문장이 아니라 숫자·라벨 전용 서체
- coral→gold 그라데이션은 화면당 한 곳(주 CTA 또는 히어로)에만 쓰는 희소 자원
- 기획자모드(작전 문서철)와 가족모드(보물지도)는 색상 토큰만 바뀌고 마크업/기능은 100% 동일

## Colors

지형 모티프로 이름 붙인 3원색(코랄·골드·틸)이 상태 색(그린/앰버/레드)과 함께 절제되게 배분된다.

### Primary
- **캐니언 코랄** (#e76f51, 텍스트용 #c2410c): 히어로 타이틀 그라데이션 시작점, 주 CTA 버튼, 링크·강조 텍스트.
- **모하비 골드** (#f4a261, 텍스트용 #b45309): 히어로 그라데이션 끝점, 가격/합계 숫자, "다음 일정" 강조.

### Secondary
- **퍼시픽 틸** (#2a9d8f, 텍스트용 #0f766e): 내비게이션 뱃지, 포커스 링, 활성 탭 — "이동/액션 가능"을 뜻하는 색.

### Tertiary
- **부겐빌레아 핑크** (#d81159): 극히 드물게 쓰는 세 번째 액센트. 현재 구현에서 노출 빈도가 낮아 임의 확장 금지.

### Neutral
- **오프화이트 배경** (#f5f6f8 / 카드 #ffffff): 페이지 배경과 카드 배경의 미세한 명도 차이로 층을 구분.
- **헤어라인** (#e2e8f0): 모든 카드·구분선의 유일한 경계 수단.
- **잉크 텍스트** (#1e293b) / **뮤트 텍스트** (#64748b) / **보조 뮤트** (#94a3b8): 본문 3단 위계.

### 상태색 (기능 색상)
- **세쿼이아 그린** (#2b9348 / 텍스트 #15803d): 완료(done) 뱃지.
- **듄 앰버** (#e9c46a, 텍스트는 모하비 골드-텍스트 공유): 대기(pending) 뱃지, 오프라인 배너.
- **레드록 레드** (#e63946 / 텍스트 #b91c1c): 미완료(todo) 뱃지, 세관 금지 품목, 경고 콜아웃.

### Named Rules
**The Text-Safe Twin Rule.** 코랄·골드·틸·그린·핑크·앰버는 모두 채도 높은 `-fill` 값과 별도의 어두운 `-text` 값을 갖는다. 배경·아이콘·그라데이션에는 `-fill`을, 본문 위에 얹는 글자에는 반드시 `-text`를 쓴다 (WCAG AA 대비 확보).

**The One Gradient Rule.** coral→gold 대각선 그라데이션은 화면 하나에 한 곳(히어로 타이틀 또는 주 CTA)에만 허용한다. 배지·탭·보조 버튼처럼 반복되는 요소에 그라데이션을 남발하면 히어로의 시각적 우선순위가 사라진다.

### 대체 세계: 가족모드 (보물지도 팔레트)
`:root[data-view="family"]`가 전체 팔레트를 아래 값으로 완전히 치환한다 (라이트/다크 테마 스위치보다 우선순위가 높아야 함 — CSS 특이도 이슈로 실제 버그가 있었던 지점).

- 배경 `#fdf6ec`, 카드 `#fffcf9`, 보조카드 `#fefae0`
- 헤어라인 `#dda15e`, 텍스트 `#283618`, 뮤트 `#606c38` / `#7a6248`
- 코랄 자리 `#bc6c25`, 골드 자리 `#dda15e`, 틸 자리 `#283618`(어두운 올리브로 대체)

**The Sepia Swap Rule.** 가족모드는 컴포넌트 구조·기능을 절대 바꾸지 않고 색상 토큰만 교체한다. 새 컴포넌트를 만들 때 가족모드 대비까지 스와치를 확인하지 않으면 이 세계에서 텍스트가 묻힐 수 있다.

## Typography

**Display Font:** Oswald (fallback: sans-serif)
**Body Font:** Work Sans (fallback: sans-serif)
**Label/Mono Font:** JetBrains Mono (fallback: monospace)

**Character:** Oswald의 좁고 곧은 대문자 태도가 헤드라인에 신문 헤드카피 같은 확신을 주고, Work Sans는 본문에서 조용히 물러나며, JetBrains Mono는 숫자·코드형 라벨에 계기판 같은 정밀함을 더한다.

### Hierarchy
- **Display** (700, 34px, line-height 1.08): 히어로 `<h1>`, coral→gold 그라데이션 텍스트.
- **Headline** (700, 18.5–19px): 섹션 제목(`.section-head h2`, `.guide-header h2`).
- **Title** (600–700, 13–14.5px): 카드 이름, 일정 타이틀(`.d-title`, `.sched-title`).
- **Body** (400, 12–13px, line-height 1.4–1.65): 상세 설명, 안내 문구. 12px 미만은 본문에 쓰지 않는다 (2026-09 typeset 패스로 11–11.5px → 12–12.5px 상향).
- **Critical Value** (600, 13px, JetBrains Mono, `{colors.neutral-text}`): 예약번호·예약코드(`.detail-sensitive`)처럼 현장에서 읽어주거나 대조하는 값. 주변 본문보다 한 단계 크고 진하게.
- **Label** (700, 10–12px, JetBrains Mono, 대문자·자간 넓힘): eyebrow, 뱃지, 날짜, 가격, 환율 숫자.

### Named Rules
**The Mono-For-Data Rule.** 사람이 읽는 문장은 절대 JetBrains Mono를 쓰지 않는다. 이 서체는 숫자·날짜·코드형 라벨(가격, PIN, 환율, 카운트다운)에만 쓰며, 이 규칙이 "실무 도구" 정체성의 핵심이다.

## Layout

모바일 우선 단일 컬럼, `max-width: 640px` 중앙 정렬(`.wrap`, 좌우 padding 18px). 하단 고정 앱 탭바(64px + safe-area)가 항상 존재하고, 일정 탭에서는 상단에 sticky 날짜 퀵점프 필(pill) 트랙이 배경 블러와 함께 얹힌다. 섹션 간 세로 리듬은 38px, 카드 사이 간격은 10–14px로 촘촘하되 카드 내부 padding은 12–16px로 여유를 준다. 데스크톱 대응은 최소 침습적으로만 존재(`.lands-grid`가 768px 이상에서 1열→3열); 이 프로덕트의 실사용 맥락은 여전히 손안의 모바일이다.

## Elevation & Depth

세 단계의 뚜렷한 위계를 쓰며 섞이지 않는다.

1. **평면 콘텐츠 카드** (상태 카드, 예약 카드, `sched-block`, 짐싸기 아이템, nav-card): 그림자 없음. `var(--card)` 배경과 1px 헤어라인 테두리만으로 구분한다.
2. **미니 위젯 패널** (`.expense-entry-card`, `.strategy-guide-section`): `0 4px 16~20px rgba(0,0,0,.25)`의 은은한 앰비언트 리프트. "리스트 항목이 아니라 그 자체로 작은 도구"임을 알린다.
3. **문서 흐름을 벗어난 플로팅 UI** (모달, FAB, 바텀시트, 토스트, SW 업데이트 배너): `0 6px 20px`~`0 20px 60px rgba(0,0,0,.3~.5)`의 뚜렷한 그림자. 얼마나 화면 위에 떠 있는지에 비례해 그림자를 키운다.

### Named Rules
**The Three-Tier Lift Rule.** 그림자 깊이는 "얼마나 페이지 밖으로 떠 있는가"의 함수다: 목록 카드는 평평하게, 미니 위젯은 살짝, 오버레이는 확실하게. 중간 단계를 건너뛰거나 목록 카드에 그림자를 얹으면 이 위계가 무너진다.

## Shapes

둥근 반경 자체가 역할을 구분하는 신호다: 입력 필드·소형 컨트롤은 6–9px(`{rounded.xs}`), 카드·모달·패널의 기본값은 14px(`{rounded.lg}`, `var(--radius)`), 뱃지·탭·필(pill)·CTA 버튼은 18–20px 이상 또는 완전한 캡슐(`{rounded.pill}`), 경로 점(dot)·아바타·원형 버튼은 `50%`. 테두리는 항상 1px 헤어라인이며, 강조가 필요할 때만 2px로 두꺼워진다(예: 다음 일정 pulse, 여권 위젯).

## Components

### Buttons
- **Shape:** 주 CTA는 완전한 캡슐(pill, 20px+); 보조/유틸 버튼은 8–10px 라운드.
- **Primary:** coral→gold 대각선 그라데이션 배경, 짙은 잉크 텍스트(`{colors.neutral-text}`, 흰색이 아님) — "The One Gradient Rule" 적용 대상.
- **Secondary / Ghost:** `{colors.neutral-card}` 배경 + 헤어라인 테두리, hover 시 테두리만 `{colors.pacific-teal}`로 전환.
- **Danger:** 동일한 ghost 형태에서 hover 시 테두리·텍스트만 `{colors.redrock-red-text}`로 전환 (예: 짐싸기 초기화 버튼).

### Chips (badge, tab, pill)
- **상태 뱃지:** done(그린)/pending(골드)/todo(레드) 3색 시맨틱, 항상 `{rounded.pill}` + 연한 배경 + 진한 텍스트.
- **탭/세그먼트 (calc-tab, pack-tab, mode-tab, date-pill):** 비활성은 `{colors.neutral-card-2}` 배경 + 뮤트 텍스트, 활성은 그라데이션 또는 solid teal 채움 + 굵은 텍스트.

### Cards / Containers
- **Corner Style:** 14px(`{rounded.lg}`).
- **Background:** `{colors.neutral-card}`, 보조 배경은 `{colors.neutral-card-2}`.
- **Shadow Strategy:** Elevation 3단계 참조 — 기본은 무그림자.
- **Border:** 항상 1px `{colors.neutral-line}`.
- **Internal Padding:** 12–16px.

### Inputs / Fields
- **Style:** `{colors.neutral-card-2}` 배경, 1px 헤어라인, 6–9px 라운드.
- **Focus:** 테두리가 `{colors.pacific-teal}`로 전환 (글로우 없음, 색상 전환만).

### Navigation
- **하단 탭바:** 흰 배경 92% + blur(12px), 아이콘+라벨 수직 스택, 비활성은 `neutral-muted-2`, 활성은 `mojave-gold-text` + 아이콘 1.1배 스케일과 미세한 드롭섀도우 글로우.
- **일정 상단 sticky 날짜 필:** 가로 스크롤 pill 트랙, 활성 pill만 coral→gold 그라데이션 + 그림자.

### Callout Rail (색 레일 콜아웃)
- **Shape:** `border-left: 3–4px solid {tone}` + 같은 색 8–9% 틴트 배경 + 오른쪽만 둥근 `border-radius: 0 8px 8px 0`. 카드를 대체하지 않고, 카드/섹션 **안에서** 부연·주의·유래를 분리할 때만 쓴다.
- **Tone = 의미:** gold = 팁·치트시트·요약(`.guide-summary-box`, `.att-cheat`), teal = 유래·배경 정보·프로 팁(`.att-origin`, `.costco-pro-banner`), red = 주의·경고(`.callout-warn`). 이 셋 외의 색은 레일에 쓰지 않는다.
- **Text:** 경고 레일은 본문색(`{colors.neutral-text}`) 12.5px, 나머지는 뮤트 12px 이상.
- **주의:** 정적 인상의 "사이드 스트라이프" 장식이 아니라 **의미 색 신호**다. 목록 항목마다 반복하지 말고 카드당 하나까지만. 인라인 `style="border-left:3px solid var(--teal)"`로 흩뿌린 기존 `.bar-row` 사례(경비 정산 탭 등)는 추후 클래스로 회수 대상.

### Timeline / Route (Signature Component)
`.route-track`(점선 연결)과 `.timeline` 아코디언은 이 제품만의 서명 요소다. 완료/활성 정류장(`.stop.active .dot`, `.day[open]`)은 coral→gold 링 글로우로 강조하고, 나머지는 무채색 점으로 남는다. 새 "진행 상태 표시" UI를 만들 때는 이 점선+글로우 어휘를 재사용한다.

## Do's and Don'ts

### Do:
- **Do** 숫자·날짜·가격·코드형 라벨에는 항상 JetBrains Mono를 쓴다 (The Mono-For-Data Rule).
- **Do** coral→gold 그라데이션은 화면당 한 곳으로 제한한다 (The One Gradient Rule).
- **Do** 그림자 깊이를 Three-Tier Lift Rule에 맞춰 결정한다 — 목록 카드는 평평하게 유지한다.
- **Do** 좌측 색 레일은 Callout Rail 어휘(gold/teal/red = 팁/정보/경고)로만 쓴다.
- **Do** 예약번호처럼 현장에서 대조하는 값은 Critical Value 단계(고정폭·본문색·600)로 올린다.
- **Do** 텍스트에 색을 쓸 때는 반드시 `-text` 변형을 쓴다 (The Text-Safe Twin Rule).
- **Do** 가족모드를 건드리는 변경은 세피아 팔레트에서도 대비를 확인한다 (The Sepia Swap Rule).

### Don't:
- **Don't** 코랄/골드/틸/그린/앰버/레드 외의 새 액센트 색을 임의로 추가하지 않는다.
- **Don't** 목록형 콘텐츠 카드에 `box-shadow`를 얹지 않는다 — 하이라인 테두리만으로 충분하다.
- **Don't** 가족모드 색상 규칙을 라이트/다크 테마 규칙보다 CSS 순서상 앞에 두지 않는다 (특이도로 밀려 팔레트가 안 먹는 회귀가 실제로 있었다).
- **Don't** 사람이 읽는 문장에 JetBrains Mono를 쓰지 않는다.
- **Don't** 12px 미만 본문·안전 정보 문구를 만들지 않는다 (라벨·뱃지 등 Label 등급만 예외).
