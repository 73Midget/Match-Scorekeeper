# Match Scorekeeper

An offline scoring app for GSSF-style indoor and outdoor pistol matches.

**[gpl-scorekeeper.netlify.app](https://gpl-scorekeeper.netlify.app)**

Built for tablets at the range, where there's often no signal. One tablet scores one squad; at the
end of the match the squad files are combined on a single device to produce the results.

- **Outdoor** — time-plus scoring across the three stages, lowest total wins.
- **Indoor** — score and X count per round, highest wins with X breaking ties.
- Shooters can enter multiple divisions, each ranked separately.
- Results by division and overall, with PDF, CSV and per-shooter email scorecards.
- Squad files merge onto one device, with duplicate detection and undo.
- Works completely offline. No accounts, no servers — match data never leaves the device.

## Installing

It's a Progressive Web App — open the link above and add it to your home screen. No app store.
iPad/iPhone: Safari → Share → Add to Home Screen. Android: Chrome → Install app. Desktop: bookmark
it or install from the address bar.

Step-by-step: **[installation_instructions.html](installation_instructions.html)** · Full manual: **[manual.html](manual.html)**

## Coming soon

Optional online functionality, so squads upload their scores at the end of a match and the results
compile automatically instead of files being passed around by hand. It will stay optional — the app
will keep working fully offline for clubs that prefer it that way.

## Technical

One plain HTML file — vanilla JavaScript, no frameworks, no build step, no dependencies. The
manifest, service worker and icons add installability and offline caching on top. Data lives in
`localStorage`; backups and squad transfers are plain JSON.

## License

Copyright (C) 2026 G. Groiss. Free software under the
[GNU AGPL v3.0](LICENSE.txt).

Not affiliated with, endorsed by, or sponsored by Glock Ges.m.b.H. or GLOCK, Inc. "GSSF" and "GLOCK"
are trademarks of their respective owners and are used here only to describe match format and
firearm models.
