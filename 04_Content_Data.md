1. Data Structure Definition (TypeScript Interface)
개발자는 아래 인터페이스 구조를 기반으로 데이터 배열을 생성해야 한다.

TypeScript
type RuleTier = 1 | 2 | 3; // 1: Green(Fun), 2: Yellow(Strategy), 3: Red(Chaos)

interface GameRule {
  id: string;          // Unique ID (e.g., 'rule_001')
  title: string;       // Main text displayed in HUGE font (Korean)
  description: string; // Subtitle text (Short explanation)
  tier: RuleTier;      // Determines background color & animation intensity
  icon?: string;       // Optional emoji or icon name
}
2. Rule Database (The Pool of Chaos)
Tier 1: Social & Light Fun (Green Background)
분위기를 띄우거나 소소한 제약.

id: rule_01

title: 침묵의 수행

description: 입을 열거나 웃으면 즉시 카드 2장 드로우. (비명만 허용)

tier: 1

id: rule_02

title: 극존칭 모드

description: 반말 사용 금지. "요/죠"를 빼먹으면 1장 드로우.

tier: 1

id: rule_03

title: 거울 전쟁

description: 내 맞은편 사람이 카드를 먹으면, 나도 같이 1장을 먹어야 함.

tier: 1

id: rule_04

title: 타임 세일 (합체)

description: 같은 색깔 숫자 카드 2장을 더해서 1장처럼 낼 수 있음. (예: 적3+적5=적8)

tier: 1

id: rule_05

title: 왼손잡이

description: 오른손 사용 금지. 실수로 쓰면 1장 드로우.

tier: 1

id: rule_06

title: 닉네임 호출

description: 사람 이름 부르기 금지. "저기요", "당신"으로만 호칭 가능. 어기면 1장.

tier: 1

Tier 2: Strategy & Annoyance (Yellow Background)
전략적 변수 생성 및 특정 행동 강제.

id: rule_07

title: 피의 대가 (Red)

description: 빨간색 카드를 낼 때는 반드시 덱에서 1장을 추가로 먹어야 함.

tier: 2

id: rule_08

title: 역주행 사고

description: [Reverse] 카드는 방향 전환 기능을 잃고 [Target +2] 공격 카드가 됨.

tier: 2

id: rule_09

title: 핸드 오픈

description: 현재 손패가 가장 많은 1명은 패를 바닥에 모두 공개하고 플레이.

tier: 2

id: rule_10

title: 와일드 통행세

description: [Wild] 계열 카드를 내려면, 비용으로 먼저 덱에서 2장을 먹어야 함.

tier: 2

id: rule_11

title: 절대 방어

description: 공격받을 때, 공격 카드와 '색깔이 같은' 숫자 카드 2장을 버려 방어 가능.

tier: 2

id: rule_12

title: 더블 플레이

description: 자신의 턴에 색깔과 숫자가 완벽히 같은 카드는 한 번에 여러 장 낼 수 있음.

tier: 2

id: rule_13

title: 청개구리 (Blue)

description: 파란색(Blue) 카드는 낼 때 노란색(Yellow) 규칙을 따름. (노랑 위에 파랑 내기 가능)

tier: 2

id: rule_14

title: 숫자 금지령

description: 숫자 '0'과 '7' 카드는 낼 수 없음. (들고 있다가 점수 폭탄이 됨)

tier: 2

Tier 3: Chaos & Destruction (Red Background + Pulse)
게임 파괴 및 생존 위협.

id: rule_15

title: 스택의 제왕

description: 모든 공격 카드(+2, +4, +6, +10)의 드로우 장수가 1.5배로 증가. (올림 처리)

tier: 3

id: rule_16

title: 자비는 없다 (Mercy)

description: Mercy Rule(탈락 기준)이 25장에서 15장으로 즉시 하향 조절.

tier: 3

id: rule_17

title: 왕의 징발

description: (일회성) 이 룰을 뽑은 즉시, 지목한 1명과 손패를 통째로 맞교환.

tier: 3

id: rule_18

title: 드로우 폭탄

description: 덱에서 카드를 뽑아야 할 상황이 오면, 무조건 +3장을 더 뽑아야 함.

tier: 3

id: rule_19

title: 공산주의

description: 누군가 "우노(1장)"를 외치는 순간, 모든 플레이어가 자기 패를 왼쪽 사람에게 전달.

tier: 3

id: rule_20

title: 시스템 초기화

description: (일회성) 현재 켜져 있는 모든 폰(룰)을 즉시 끄고(OFF), 기본 게임 상태로 리셋.

tier: 3

3. Special Event (The Joker)
1% 확률.

id: event_joker

title: JOKER

description: 당신이 법입니다. 원하는 룰을 구두로 제정하거나, 특정 플레이어를 지목해 룰을 삭제시키세요.

tier: 3

4. Implementation Notes for AI
Shuffle Logic: Array.sort(() => Math.random() - 0.5) is not enough. Use the Fisher-Yates shuffle algorithm for true randomness.

Visual Mapping:

If tier === 1: Use CSS class border-neon-green and text-neon-green.

If tier === 2: Use CSS class border-neon-yellow and text-neon-yellow.

If tier === 3: Use CSS class border-neon-red, text-neon-red AND apply animate-pulse-fast.

Sound Mapping:

Play sfx_light.mp3 for Tier 1.

Play sfx_alarm.mp3 for Tier 3.