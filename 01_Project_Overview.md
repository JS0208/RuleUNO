1. Project Mission
Title: Uno No Mercy - Chaos Rule Generator (The Digital Minefield) Goal: 우노 노 머시(Uno No Mercy) 카드 게임을 위한 '랜덤 룰 생성기' 웹 애플리케이션 개발. Core Concept: 9명의 플레이어가 각자의 스마트폰을 테이블 위에 올려두고 게임을 진행한다. 이 앱은 각 플레이어의 스마트폰을 **'잠재적 룰 보드(Rule Board)'**로 변환시킨다. 테이블 위에는 항상 최대 3개의 스마트폰만이 'Active(활성)' 상태로 켜져 있으며, 이 3개의 화면에 떠 있는 룰이 전체 게임에 적용된다.

2. Key Gameplay Mechanics (Context)
이 섹션은 앱의 개발 배경이 되는 실제 게임 규칙을 설명한다. AI는 이 흐름을 이해하고 UI를 설계해야 한다.

Device as a Component: 모든 플레이어(9명)는 이 웹 앱을 켜고 자신의 앞에 폰을 둔다.

The "Host" System:

게임 시작 시, 3명의 플레이어 폰이 룰을 띄우고 'Active' 상태가 된다 (초기 3대 룰).

나머지 6명의 폰은 'Idle(대기)' 상태로 어둡게 유지된다.

Trigger (Penalty): 플레이어가 카드를 낼 수 없거나 특정 페널티 상황이 오면 자신의 폰을 조작하여 **Spin(룰 뽑기)**을 수행한다.

Strategic Choice (The 4th Rule):

초기 단계: 게임 시작 시점의 첫 3개 룰은 무조건 적용된다.

중후반 단계: 이미 3개의 룰이 꽉 찬 상태에서 누군가 새로운 룰을 뽑으면, 그 플레이어는 선택권을 가진다.

Option A (교체): 기존에 켜져 있는 3개의 폰 중 하나를 지목하여 끄게 만들고(Reset), 자신의 폰을 켜서(Active) 새로운 룰을 등록한다.

Option B (기각): 뽑은 룰이 마음에 들지 않거나 전략적으로 불필요하다면, 적용하지 않고 취소(Discard)한다.

3. App Architecture & Tech Stack
Type: Client-side Single Page Application (SPA) Framework: React (Vite 기반 권장) Styling: Tailwind CSS Deployment: Netlify Data Management: No Backend. (모든 상태는 로컬에서 관리되며, 플레이어 간 통신은 필요 없음. 룰 중복은 허용됨.)

Critical Technical Requirements
Wake Lock API: 'Active' 상태가 된 폰은 절대 화면이 꺼져서는 안 된다. 브라우저의 전원 관리 기능을 제어해야 한다.

Dark Mode First: 배터리 절약과 게임 분위기 조성을 위해 Pure Black (#000000) 배경을 기본으로 한다.

Mobile Viewport Lock: 플레이어가 흥분해서 터치할 때 화면이 확대/축소되지 않도록 뷰포트를 고정한다 (user-scalable=no).

Haptic Feedback: Navigator.vibrate() API를 사용하여 슬롯이 돌아갈 때와 룰이 확정될 때 진동을 준다.

4. User Flow (State Machine)
앱은 다음 3가지 상태를 순환한다.

Phase 1: IDLE (The Void)
상태: 대기 모드.

화면: 매우 어두운 화면. 중앙에 희미하게 빛나는 'SPIN' 버튼만 존재.

동작: 'SPIN' 버튼 터치 시 -> Phase 2로 진입.

Phase 2: ROULETTE (The Tension)
상태: 룰 추첨 중.

화면: 슬롯머신 애니메이션. 텍스트가 빠르게 롤링됨. 긴장감을 주는 사운드와 햅틱 피드백.

결과: 랜덤하게 하나의 룰이 선택됨.

분기점:

화면 하단에 [ACTIVATE](적용) 버튼과 [DISCARD](버리기) 버튼 표시.

[DISCARD] 선택 시 -> Phase 1로 복귀.

[ACTIVATE] 선택 시 -> Phase 3로 진입 (강렬한 시각 효과 동반).

Phase 3: ACTIVE (The Curse)
상태: 룰 적용 중 (Wake Lock 활성화).

화면:

배경색이 룰의 등급(Tier)에 맞는 컬러로 변경됨 (Green/Yellow/Red).

룰 텍스트가 화면 중앙에 거대하게 표시됨 (가독성 최우선).

배경에 은은한 Pulse(고동치는) 애니메이션 효과.

동작:

화면 구석에 작고 눈에 띄지 않는 [RESET] 버튼 존재.

[RESET] 버튼 터치 시(길게 누르기 권장) -> Phase 1로 복귀.

5. Design Philosophy
Keyword: Cyberpunk, Casino, Warning, Neon.

Visibility: 9명이 둘러앉은 테이블의 반대편에서도 내 폰이 '켜져 있다'는 사실과 '배경색(위험도)'이 식별되어야 한다.

Atmosphere: 룰이 확정되는 순간은 공포스러워야 하며, 리셋되는 순간은 허무해야 한다.