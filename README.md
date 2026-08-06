# Value My Find — Expo starter

A runnable scaffold matching the design in `design_source/` (see the design handoff README for full spec). Real camera, mocked valuation API.

## Setup
```
npm install
npx expo start
```
Scan the QR with Expo Go, or press `i`/`a` for a simulator.

## What's real vs. mocked
- **Real**: camera capture (`expo-camera`), navigation (bottom tabs: Scan / Saved), in-memory saved-finds state.
- **Mocked**: `api/mockApi.js` — replace `scanItem()` with a real call to your vision/valuation backend. It currently returns hardcoded "studio pottery vase" data after a 1.8s delay.

## Structure
- `App.js` — navigation shell
- `theme.js` — design tokens ported from the Classical design system
- `screens/CameraScreen.js` — camera + scanning states
- `screens/VerdictScreen.js` — valuation result
- `screens/SavedScreen.js` — collection list
- `FindsContext.js` — saved-finds state (swap for a real DB/backend when ready)
- `api/mockApi.js` — mock valuation call, replace with the real thing

## Next steps for your agent (Codex / Claude Code)
1. Wire `scanItem()` to a real image-recognition + comps-pricing API.
2. Persist `saved` finds (AsyncStorage or a backend) instead of in-memory state.
3. Add loading/error states for failed or low-confidence scans.
4. Replace the mock icon/splash in `app.json` with final assets once available.
