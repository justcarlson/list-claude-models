# list-claude-models

List available Anthropic Claude model IDs via the API.

## Setup

```bash
bun install
```

## Usage

Requires `ANTHROPIC_API_KEY` environment variable.

```bash
# Human-readable output
bun start

# Just model IDs
bun start --ids-only

# JSON output
bun start --json
```

## Cross-Project Usage

From any Claude Code session or script:

```bash
bun /path/to/list-claude-models/src/list-models.ts --ids-only
```

Or install globally:

```bash
bun link
list-claude-models --ids-only
```
