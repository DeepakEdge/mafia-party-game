# Mafia Party - Browser Game

A mobile-first, moderator-free Mafia game for house parties. The room creator's phone is the only narrator; all phones handle private roles, night actions and voting.

## What is included
- Room creation, six-character code, invitation link and QR code
- Random role assignment using the browser cryptographic random generator
- Mafia consensus, doctor consensus, detective private result
- Host-only voice narration with repeat prompts
- Discussion, first vote, defense, final vote, tie handling and win detection
- Responsive interface for phones

## Required free services
GitHub Pages hosts the static website. Firebase Authentication and Realtime Database synchronize the phones.

## Firebase setup
1. Create a Firebase project at https://console.firebase.google.com/.
2. Add a **Web app**, then copy its configuration into `config.js`.
3. In **Authentication > Sign-in method**, enable **Anonymous** sign-in.
4. Create **Realtime Database**.
5. In Realtime Database > Rules, paste the contents of `database.rules.json` and publish.
6. In Authentication > Settings > Authorized domains, add your GitHub Pages domain, such as `username.github.io`.

> The provided rules require anonymous authentication, but any authenticated participant can access a room if they know its code. For a private house-party MVP this is practical; do not store personal or sensitive information.

## Publish on GitHub Pages
1. Create a new public GitHub repository.
2. Upload `index.html`, `style.css`, `app.js`, `config.js`, and `database.rules.json` to the repository root.
3. Open **Settings > Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
5. Open the Pages address on the room creator's phone.

## Recommended game size
- Minimum: 4 players
- There is no fixed six-player or thirty-player cap in the interface. The creator enters the planned room size.
- Balanced starting point: 6 to 8 players with 2 Mafia, 1 Doctor, 1 Detective
- Special roles must be fewer than total players
- Very large rooms can become difficult to manage socially and may be subject to Firebase usage limits.

## Important browser note
On iPhone and some Android browsers, speech narration may require one user interaction before audio can play. Tap **Narration on** once after opening the game. Keep the creator's screen awake and connect that phone to the Bluetooth speaker.

## Refined rules used in this build
- Dead players cannot act or vote.
- Mafia cannot target themselves. Doctor can save themselves.
- Multiple Mafia and Doctors must unanimously select the same player.
- Each Detective gets a private Mafia / Not Mafia result.
- First-vote ties remain open so players can change votes.
- The leading player gets a defense, followed by a final majority vote.
- Villagers win when all Mafia are gone. Mafia win when their number equals or exceeds all other living players.
