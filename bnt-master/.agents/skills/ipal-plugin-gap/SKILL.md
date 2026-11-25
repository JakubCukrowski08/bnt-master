---
name: ipal-plugin-gap
description: Handles the moment when @intecion/ipal-kit seems to lack a feature or behaves wrongly — verifies against the plugin docs and type definitions first, then reports the gap to the owner with a structured plugin request and waits for their decision instead of patching the project with hooks, hardcoded values, copied plugin code or any self-made workaround. Use when tempted to work around the plugin, when a plugin function errors or is missing, or when the same need appears in several projects.
---

# ipal-plugin-gap

Rule: AGENT.md "ipal-kit first" and §1.3 — **report first, then wait**. You do nothing on your own for
that part until the owner decides; work on unrelated parts may go on. No hand-built replacement, no silent
workaround.
Report type: **bug** (the plugin behaves differently from the docs) or **improvement**
(the same code written in yet another project; no option exists that would remove it).

**Plugin rule:** ipal-kit helps the project, never limits it. Every module can be
turned off separately; every default (access, fields, hooks, labels, routes, collections,
globals) can be overridden and the project config wins; safe defaults have an option to
relax them; the plugin exports building blocks, not only ready-made functions. A missing option or
building block is a **plugin gap to report** (type: improvement) — not a reason to patch `node_modules`.

## 1. Check that the plugin does not already have it
- `ls node_modules/@intecion/ipal-kit/docs/` — read the module file,
- `grep -rn "<keyword>" node_modules/@intecion/ipal-kit/dist --include=*.d.ts`,
- `ipalKit` options (`IpalOptions` in `dist/types.d.ts`: `*Fields`, `formOverrides`, `access`, `enabled`…)
  and the exported building blocks (`build*`, `create*`) — often an override is enough, not a new function,
- check the version: `grep '"version"' node_modules/@intecion/ipal-kit/package.json`
  (the problem may be fixed in a newer one — the **ipal-upgrade** skill).

The plugin has it → use it and tell the user where it was.

## 2. Report to the owner (when it really is missing or broken)
Save it in the project's `docs/plugin-requests/<date>-<topic>.md` and **tell the owner right away**:
the file, a one-paragraph summary and the options below. Then stop work on that part.

**Options you offer the owner** (they choose — you do not):
1. wait for a plugin fix / new option (the plugin request goes to the ipal-kit team);
2. use an existing plugin option or building block differently (if you found one with a trade-off — say which);
3. an approved, minimal workaround in the project (only if the owner says yes).

**After the decision:** write it into `AGENTS.md` → "Project decisions" (what, why, the request file, who approved).
A workaround is then minimal, in one file, marked `// WORKAROUND ipal-kit <version>: docs/plugin-requests/<file>`,
and listed in the final report (ipal-site, "For ipal-kit" section) so it can be removed after the plugin fix.

```markdown
# <topic>
**Type:** bug / improvement · **Project:** <name> · **ipal-kit:** <version>
## Problem
<what does not work / what is missing; error message; steps to reproduce>
## Why it belongs in the plugin
<whether other projects will need it — be specific>
## Proposed API
<function signature / ipalKit option / admin panel field; usage example in the project>
## Options for the owner
1. wait for the plugin · 2. <existing option, with its trade-off> · 3. <minimal workaround, in one file — only if approved>
## Decision
<filled in after the owner decides: option, date, who; a workaround is marked `// WORKAROUND ipal-kit <version>: docs/plugin-requests/<file>`>
```

## 3. What not to do
- any workaround before the owner decided — including "temporary" ones,
- a hook with the client's domain/name/colour hardcoded,
- a copy of a plugin component in the project (e.g. `Analytics`, `CookieBanner`),
- edits / `patch-package` in `node_modules/@intecion/ipal-kit`,
- `as any` / `@ts-ignore` "to make it pass",
- dynamic `import()` through a variable (it will not be bundled).
