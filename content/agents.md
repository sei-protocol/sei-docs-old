# AGENTS.md — sei-docs

Instructions for AI coding agents working in the [sei-docs](https://github.com/sei-protocol/sei-docs) repository.

---

## What this repo is

`sei-docs` is the source for **https://docs.sei.io** — the primary developer documentation for the Sei blockchain. It is a [Next.js](https://nextjs.org) + [Nextra](https://nextra.site) site using MDX for content.

---

## Build and run

**Package manager: `bun` only.** Do not use `npm` or `yarn`.

```bash
bun install          # install dependencies
bun dev              # local dev server (turbopack, hot reload)
bun run build        # production build — ALWAYS run before pushing
bun run lint         # Biome lint check
bun run format       # Biome format (auto-fix)
bun run check        # Biome lint + format combined (auto-fix)
bun test             # run tests
```

> **Always run `bun run build` before committing.** It validates MDX syntax, broken imports, and build-time errors that `bun dev` won't catch.

---

## Project structure

```
content/              # All documentation pages (MDX/MD)
  _meta.js            # Root navigation order + labels
  index.mdx           # Docs home page
  learn/              # General Sei concepts (architecture, staking, governance)
  evm/                # Primary developer section (EVM, precompiles, tooling)
  cosmos-sdk/         # Legacy Cosmos SDK docs (deprecated per SIP-3)
  node/               # Node operations and validator docs
  skill.md            # AI agent skill definitions for Sei RPC operations
  agents.md           # Agent behaviour and execution flow definitions

src/
  components/         # React components used in MDX pages
  constants/          # Shared constants (chain IDs, RPC URLs, addresses)
  providers/          # React context providers
  utils/              # Utility functions

public/
  assets/             # Images and static files referenced in docs

scripts/
  build-search-index.js   # Builds Pagefind search index (runs in postbuild)
  scrape-docs-html.js     # Scrapes rendered HTML for external use
  check-links.mjs         # Link checker
  audit-content-seo.mjs   # SEO audit

STYLE_GUIDE.mdx       # Prose and formatting conventions — read before writing
biome.json            # Linter/formatter config (Biome, not ESLint/Prettier)
next.config.mjs       # Next.js config
```

---

## Adding or editing content

### Edit an existing page

Each page maps 1:1 to a `.mdx` file in `content/`. Find the file and edit it. MDX supports standard Markdown plus JSX components.

```bash
# Example: edit the EVM differences page
content/evm/differences-with-ethereum.mdx
```

### Add a new page

1. Create `content/<section>/your-page.mdx`
2. Add an entry to `content/<section>/_meta.js` — this controls navbar order and label:

```js
// content/evm/_meta.js
export default {
  // ...existing entries...
  'your-page': 'Your Page Title',
};
```

3. Add frontmatter to the MDX file:

```mdx
---
title: 'Your Page Title'
description: 'One-sentence description for SEO.'
keywords: ['keyword1', 'keyword2']
---

# Your Page Title
```

### Add a new section (directory)

1. Create `content/<section>/` with an `index.mdx` and `_meta.js`
2. Add the section to `content/_meta.js`

---

## Content conventions (from STYLE_GUIDE.mdx)

- **Beginner-friendly**: spell out acronyms on first use; avoid Web3 jargon where possible
- **Simple**: fewer words, more meaning; no qualifying language ("quite", "completely")
- **Self-explanatory**: include code snippets and diagrams for complex concepts
- **Heading levels**: never skip — H2 → H3 → H4; max depth H4
- **Code**: inline code for values/identifiers; fenced blocks for multi-line; always specify language
- **Images**: store in `public/assets/`; use relative paths in MDX
- **Callouts**: use `<Info>`, `<Warning>`, `<Tip>`, `<Danger>` components (not bare blockquotes for notices)
- **Cosmos SDK section**: always include a deprecation notice — new content should go in EVM section

---

## Linting and formatting

Biome handles both linting and formatting. **Not ESLint or Prettier.**

```bash
bun run check        # lint + format, auto-fix
bun run lint         # lint only
bun run format       # format only
```

Biome config (`biome.json`):
- Indent: **tabs**, width 2
- Line width: 164
- Single quotes in JS/JSX
- No trailing commas
- MDX/MD files are **excluded** from Biome — prose formatting is manual

---

## Sei technical accuracy — facts to verify before editing

When editing technical content, apply these facts. If a claim conflicts with the below, update the content:

| Fact | Value |
|---|---|
| Block time | 400 ms |
| EVM version | Pectra (without blobs) |
| Block gas limit | 12.5 M |
| Min gas price (network) | 10 gwei (docs stated); live ~50–55 gwei |
| SSTORE gas cost | 72,000 gas (governance-adjustable on-chain param) |
| Mainnet chain ID | EVM `1329` / Cosmos `pacific-1` |
| Testnet chain ID | EVM `1328` / Cosmos `atlantic-2` |
| EVM RPC (mainnet) | `https://evm-rpc.sei-apis.com` |
| EVM RPC (testnet) | `https://evm-rpc-testnet.sei-apis.com` |
| USDC (mainnet) | `0xe15fC38F6D8c56aF07bbCBe3BAf5708A2Bf42392` |
| USDC (testnet) | `0x4fCF1784B31630811181f670Aea7A7bEF803eaED` |
| COINBASE opcode | Always returns global fee collector, not block proposer |
| PREVRANDAO opcode | Returns hash of block timestamp — NOT random |
| CosmWasm status | Deprecated per SIP-3 / governance proposal 99 |

Cross-check address values against `src/constants/` before publishing.

---

## Key components for MDX pages

```mdx
<Info>Informational callout</Info>
<Warning>Warning callout</Warning>
<Tip>Tip callout</Tip>
<Danger>Danger callout</Danger>

<NetworkTabs>
  {/* content per network */}
</NetworkTabs>

<ChainInformation />   {/* renders live chain params */}
<FaucetRequest />      {/* testnet faucet widget */}
```

Import from `@/components/<ComponentName>` — check `src/components/` for available components.

---

## What NOT to do

- **Do not use `npm` or `yarn`** — bun only
- **Do not skip `bun run build`** before pushing — MDX syntax errors only appear at build time
- **Do not use ESLint or Prettier** — Biome is the sole linter/formatter
- **Do not add new content to `cosmos-sdk/`** — that section is deprecated; new content goes in `evm/`
- **Do not skip `_meta.js` updates** when adding pages — new files won't appear in the navbar
- **Do not commit hardcoded addresses without verifying** against `src/constants/` or `usdc-on-sei.md`
- **Do not use bare `>` blockquotes for notices** — use `<Info>`, `<Warning>`, etc.
- **Do not write `<img>` tags** — use MDX image syntax or the Next.js `<Image>` component

---

## Useful references

- Nextra docs: https://nextra.site/docs
- Sei developer docs: https://docs.sei.io
- Sei dev skill (offline AI reference): https://github.com/sei-protocol/sei-dev-skill
- Style guide: `STYLE_GUIDE.mdx` in repo root
- Biome: https://biomejs.dev
