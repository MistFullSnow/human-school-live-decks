# Human School live workshop decks

A clean-room HTML translation of the approved September 16 Google Slides decks.

Routes:
- `/day-1` and `/presenter-1` - 37-slide Day 1 deck
- `/day-2` and `/presenter-2` - 16-slide Day 2 deck
- `/submit` - attendee Day 1 submission form
- `/submissions` - facilitator review dashboard

## Dynamic review flow
Submissions start hidden. The facilitator categorizes each as Needs work, Exemplar, or Discuss on `/submissions`. Reviewed items appear on Day 2 slides 6, 7, and 8 respectively. The visual frame preserves the approved Google Slides design while the reviewed cards remain live HTML.

Live sessions sync across devices over the same MQTT + local cache pattern used by the original workshop app. EMQX is primary, HiveMQ fallback; BroadcastChannel handles same-device tabs. Set `hs_active_session_id` in localStorage to isolate a workshop session. Messages are QoS 0 and non-retained, so facilitator local storage remains the durable session copy; export submissions after the workshop.

## Run
`npm install && npm run dev`
