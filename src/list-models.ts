#!/usr/bin/env bun
import Anthropic from "@anthropic-ai/sdk";

async function listModels() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set");
    console.error("Set it via: export ANTHROPIC_API_KEY=your-key");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  const models: Array<{ id: string; displayName: string; createdAt: string }> =
    [];

  for await (const model of client.models.list()) {
    models.push({
      id: model.id,
      displayName: model.display_name,
      createdAt: model.created_at,
    });
  }

  const format = process.argv[2];

  if (format === "--json") {
    console.log(JSON.stringify(models, null, 2));
  } else if (format === "--ids-only") {
    models.forEach((m) => console.log(m.id));
  } else {
    console.log("Available Anthropic Models:\n");
    models.forEach((m) => {
      console.log(`  ${m.id}`);
      console.log(`    Name: ${m.displayName}`);
      console.log(`    Created: ${m.createdAt}\n`);
    });
  }
}

listModels().catch((err) => {
  console.error("Failed to list models:", err.message);
  process.exit(1);
});
