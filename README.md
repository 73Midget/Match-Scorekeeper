# Match Scorekeeper

An offline scoring app for GSSF-style indoor and outdoor pistol matches.

**[gpl-scorekeeper.netlify.app](https://gpl-scorekeeper.netlify.app)**

Built for tablets at the range, where there's often no signal. One tablet scores one squad; at the
end of the match the squads are combined on a single device to produce the results.

- **Outdoor** — time-plus scoring across the three stages, lowest total wins.
- **Indoor** — score and X count per round, highest wins with X breaking ties.
- Shooters can enter multiple divisions or rounds, each ranked separately.
- Every stage has to account for its shots before it will confirm — paper, steel and plates.
- Results by division and overall, with PDF, CSV and emailed scorecards.
- Squads combine on one device, with duplicate detection and undo.
- Screen modes for direct sunlight and for a dark range.
- **Works completely offline.** No account needed, and with no server configured the app makes no
  network connections at all.

## Installing

It's a Progressive Web App — open the link above and add it to your home screen. No app store.
iPad/iPhone: Safari → Share → Add to Home Screen. Android: Chrome → Install app. Desktop: bookmark
it or install from the address bar.

Step-by-step: **[install.html](install.html)** ·
Full manual: **[manual.html](manual.html)**

## Optional online services

A club can run a small server so tablets share the shooter list and collect squad results without
passing files around by hand. It is entirely optional — the app is complete without it, and a club
that never sets one up sees no difference.

With a server configured:

- Every tablet pulls the current shooter list before a match
- Each squad uploads its results, which also protects against a tablet dying mid-match
- One tablet compiles the match; publishing the results and the updated shooter list happens as
  part of the same action
- Past matches can be looked up from any tablet
- A published shooter list can be rolled back if a bad one goes out

The server is a separate project, free to run, and each club runs its own:
**[match-scorekeeper-api](https://github.com/73Midget/match-scorekeeper-api)** — see its `SETUP.md`
to stand one up and `OPERATIONS.md` for running matches with it.

## Technical

One plain HTML file — vanilla JavaScript, no frameworks, no build step, no dependencies. The
manifest, service worker and icons add installability and offline caching on top. Match data lives
in `localStorage`; backups and squad transfers are plain JSON.

Server credentials are stored under a separate key and never appear in any exported file.

## License

Copyright (C) 2026 G. Groiss. Free software under the
[GNU AGPL v3.0](LICENSE.txt).

Not affiliated with, endorsed by, or sponsored by Glock Ges.m.b.H. or GLOCK, Inc. "GSSF" and "GLOCK"
are trademarks of their respective owners and are used here only to describe match format and
firearm models.
