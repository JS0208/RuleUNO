1. Design Philosophy
Core Theme: Cyberpunk, Minimalist Horror, High Contrast. Visual Goal: 어두운 방 안에서 스마트폰 화면이 '네온 사인'이나 '경고등'처럼 보여야 함. Constraint: 9명이 둘러앉은 테이블의 반대편(약 1.5m 거리)에서도 **배경색(룰 등급)**과 **텍스트(룰 내용)**가 명확히 식별되어야 함.

2. Color Palette (Tailwind Config)
기본 배경은 무조건 Pure Black(#000000)을 사용하여 OLED 디스플레이의 이점을 살리고 배터리를 절약한다.

A. Background & Base
bg-black (#000000): 앱의 기본 배경.

bg-overlay (rgba(0, 0, 0, 0.9)): 모달이나 설정 창 배경.

B. Semantic Neon Colors (Tier System)
룰의 위험도에 따라 화면 전체의 테두리나 텍스트 색상이 변경됨.

Tier 1 (Common/Fun): Neon Green (#39FF14)

Feel: 안전함, 가벼운 벌칙.

Tier 2 (Warning/Strategic): Neon Yellow (#FFE700) or Safety Orange (#FF5F00)

Feel: 주의 요망, 전략적 변수.

Tier 3 (Danger/Chaos): Neon Red (#FF003C) or Hot Pink (#FF00FF)

Feel: 비상사태, 치명적, 즉사.

System/Neutral: Cyber Blue (#00F0FF)

Usage: 일반 버튼, 설정 아이콘, 대기 상태.

3. Typography
가독성이 최우선이다. 얇은 폰트는 지양하고, 두껍고 투박한 폰트를 사용한다.

A. Font Family
Primary (Rule Text): Oswald (Google Fonts), Impact, or System Sans-serif with font-black weight.

거대하고 꽉 찬 느낌.

Secondary (UI Elements): Courier New, Roboto Mono, or any Monospace font.

기계적인 시스템 메시지 느낌.

B. Text Sizing (Viewport Units)
Rule Text (Active State): text-6xl ~ text-9xl (화면 너비에 맞춰 자동 조절, clamp() 사용 권장).

Button Text: text-xl, font-bold, tracking-widest.

4. UI Components & States
A. The "SPIN" Button (Idle State)
Style: 화면 중앙에 위치한 원형 또는 거대한 사각형 버튼.

Border: 2px solid Cyber Blue.

Effect: animate-pulse (천천히 깜빡임).

Text: "TAP TO DOOM" or "SPIN".

B. The Rule Screen (Active State)
Layout: 화면 정중앙 정렬 (Flex/Grid Center).

Background: Pure Black.

Border: 화면 가장자리에 5px~10px 두께의 Neon Color 테두리가 생김 (Tier 색상 적용).

Animation: 테두리가 미세하게 빛나거나(Glow), 배경이 아주 천천히 색조가 변함.

C. The Glitch Effect (Transition)
룰이 확정되는 순간(Decided), 텍스트나 화면이 지직거리는 Glitch 효과 필수 적용.

CSS Tip: clip-path와 transform: translate를 빠르게 반복하는 Keyframes 애니메이션 사용.

5. Animation & Motion Guidelines
1. Idle Loop (Breathing)
대기 상태일 때 버튼이나 로고가 사람의 호흡 속도(4초 주기)로 천천히 밝아졌다 어두워짐.

opacity: 0.4 -> opacity: 1 -> opacity: 0.4.

2. Spinning (Chaos)
슬롯머신이 돌아갈 때 텍스트가 위에서 아래로 빠르게 흐름 (blur-sm 효과 추가).

속도: 처음엔 빠르다가 서서히 감속(Ease-out)하며 멈춤.

3. Impact (Activation)
룰이 확정되고 [ACTIVATE] 버튼을 누르는 순간.

화면 전체가 해당 Tier 색상으로 0.1초간 번쩍임(Flashbang).

동시에 폰이 강하게 진동(Haptic).

4. Active Pulse (Alive)
활성화된 룰 화면은 정지해 있지 않음.

배경의 테두리나 텍스트의 그림자(Text-shadow)가 심장 박동처럼 쿵-쿵 뜀.

목적: "이 룰은 현재 살아있다"는 것을 시각적으로 강조.

6. Feedback System (Haptics & Sound)
A. Haptic Feedback (Navigator.vibrate)
Tap: 10ms (짧고 경쾌함).

Spinning: 30ms 간격으로 연속 진동 (두두두두...).

Tier 1 Result: 100ms (단발).

Tier 2 Result: 300ms (중형).

Tier 3 Result: 500ms, 100ms 쉬고, 500ms (경고 패턴).

B. Sound Effects (Optional placeholders)
Cursor에게 무료 SFX 라이브러리(예: use-sound)를 연결해달라고 요청.

Click: 기계식 스위치 소리.

Spin: 디지털 룰렛 돌아가는 소리.

Alert: 사이렌 또는 비프음 (Tier 3 등장 시).