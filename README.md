# Human School live workshop decks

A clean-room HTML translation of the approved September 16 Google Slides decks.

Routes:
- `/day-1` and `/presenter-1` - 37-slide Day 1 deck
- `/day-2` and `/presenter-2` - 16-slide Day 2 deck
- `/submit` - attendee Day 1 submission form
- `/submissions` - facilitator review dashboard

## Dynamic review flow
Submissions start hidden. The facilitator categorizes each as Needs work, Exemplar, or Discuss on `/submissions`. Reviewed items appear on Day 2 slides 6, 7, and 8 respectively. The visual frame preserves the approved Google Slides design while the reviewed cards remain live HTML.

This build uses browser local storage so it works without infrastructure during design review. Before a multi-device workshop, replace the two small `read`/`write` storage helpers in `src.jsx` with a shared persistent API (Vercel KV/Supabase) so attendee phones and the presenter browser share state.

## Run
`npm install && npm run dev`
