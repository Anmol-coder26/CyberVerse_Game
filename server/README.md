# server/

**STATUS: Not yet implemented.**

Reserved backend structure for the production roadmap (see the root
README's Roadmap section and `CyberVerse_Tech_Stack.pdf`, section 2):

- `controllers/` — request handlers once an API exists
- `routes/` — Express route definitions
- `middleware/` — auth, request validation, error handling
- `services/` — the actual Gemini mission-generation proxy and Firebase
  Admin SDK usage (never called from the browser - see
  `src/services/gemini` and `src/services/firebase` for why)
- `utils/` — shared backend helpers
- `config/` — environment/config loading

Every subfolder here contains only a `.gitkeep` placeholder today. This
structure exists so the eventual backend has an obvious home, not because
any of it is running yet.
