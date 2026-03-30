import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import pc from 'picocolors';
import { getTemplate } from '../templates/index.js';

type AgentType = 'claude' | 'cursor' | 'trae' | 'copilot' | 'generic' | 'all';

interface InitOptions {
  agent: string;
  cwd: string;
}

export function initCommand(options: InitOptions): void {
  const agent = options.agent as AgentType;
  const cwd = options.cwd ?? process.cwd();
  const agents: AgentType[] =
    agent === 'all' ? ['claude', 'cursor', 'trae', 'copilot', 'generic'] : [agent];

  console.log(pc.bold(pc.blue('\n🤖 Harfai Agent Config Initializer\n')));

  for (const a of agents) {
    writeAgentConfig(a, cwd);
  }

  console.log(
    pc.green('\n✅ Done! Read AGENTS.md for guidelines on how to use Harfai with AI agents.\n'),
  );
}

function writeAgentConfig(agent: AgentType, cwd: string): void {
  const template = getTemplate(agent);
  if (!template) {
    console.warn(pc.yellow(`  ⚠ Unknown agent type: ${agent} — skipping`));
    return;
  }

  const outputPath = join(cwd, template.outputPath);
  const outputDir = outputPath.split('/').slice(0, -1).join('/');

  if (outputDir && !existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, template.content, 'utf-8');
  console.log(pc.green(`  ✓ ${template.outputPath}`));
}
