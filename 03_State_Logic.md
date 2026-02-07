1. Global State Machine (React Context/Hook)
앱은 단방향 데이터 흐름을 가지며, 다음 4가지 상태를 엄격하게 순환한다.

State Definitions
IDLE (Default)

Description: 대기 모드. 배터리 절약 상태.

Data: currentRule = null

Screen: StartScreen (Spin Button)

SPINNING

Description: 룰 추첨 애니메이션 진행 중 (약 2~3초).

Interaction: 터치 입력 차단 (Block all inputs).

Screen: RouletteScreen

DECISION (Pending)

Description: 룰이 뽑혔으나, 플레이어가 적용 여부를 고민하는 단계.

Data: currentRule = { id, text, tier, type } (Temporary)

Screen: DecisionScreen (Apply / Discard Buttons)

ACTIVE (Locked)

Description: 룰이 확정되어 테이블 위에 놓인 상태. Wake Lock 활성화 필수.

Data: currentRule (Confirmed)

Screen: ActiveRuleScreen

2. Transition Logic & Triggers
A. IDLE -> SPINNING
Trigger: User taps "SPIN" button.

Action:

Play Spin Sound.

Trigger Haptic Feedback (Continuous tick).

Start random text rolling animation.

B. SPINNING -> DECISION
Trigger: Timer ends (e.g., 3000ms).

Logic:

Execute getRandomRule() function.

Easter Egg Check: 1% chance to trigger JOKER event.

Action:

Stop animation.

Play Stop Sound.

Show result with [APPLY] and [DISCARD] buttons.

C. DECISION -> ACTIVE
Trigger: User taps [APPLY].

Action:

Critical: Request Navigator.wakeLock (Keep screen on).

Play Confirm Sound (Heavy impact).

Trigger Haptic Feedback (Heavy vibration based on Tier).

Render ActiveRuleScreen.

D. DECISION -> IDLE
Trigger: User taps [DISCARD].

Action:

Clear currentRule.

Return to StartScreen.

E. ACTIVE -> IDLE
Trigger: User performs Long Press (2s) on the [RESET] button.

Action:

Critical: Release Navigator.wakeLock.

Play Deactivate Sound (Power down).

Clear currentRule.

Return to StartScreen.

3. Core Functions & Algorithms
A. Random Rule Engine (useRuleEngine)
Data Source: Load from 04_Content_Data.md (JSON structure).

Logic:

Pure Random selection (Math.random()).

Duplicate Policy: Allow duplicates. (If the same rule appears, it creates a funny/despairing moment).

Joker Logic:

If Math.random() < 0.01 (1%), return special JOKER rule object.

Joker Text: "ANYTHING YOU WANT" or "RESET ALL PHONES".

B. Wake Lock Manager (useWakeLock)
Browser compatibility is crucial.

On Mount (Active State):

Check if navigator.wakeLock is supported.

Call navigator.wakeLock.request('screen').

Store the sentinel object in state/ref.

On Unmount (Leaving Active State):

Call sentinel.release().

Re-acquire Logic:

Listen to visibilitychange event. If the user tabs out and comes back while in ACTIVE state, re-request the lock immediately.

C. Safety Interaction (Long Press)
Purpose: ACTIVE 상태에서 실수로 리셋 버튼을 눌러 룰을 날려버리는 것을 방지.

Implementation:

Button: "HOLD TO RESET".

Visual Feedback: While holding, a progress bar or circular ring fills up.

Trigger: Only fire action when progress hits 100%.

4. Technical Constraints & Fallbacks
Audio Context:

Browsers block auto-play audio.

Solution: Initialize AudioContext on the very first user interaction (the first "SPIN" tap).

Vibration API:

iOS Safari does not support navigator.vibrate.

Solution: Check if (navigator.vibrate) before calling. Do not break the app if unsupported.

Local Storage (Optional):

No need to persist state after refresh. If the user refreshes the browser, it should reset to IDLE (simulating a "Clean Slate").