import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import pc from 'picocolors';
import { getTemplate } from '../templates/index.js';

type AgentType = 'claude' | 'cursor' | 'trae' | 'copilot' | 'generic' | 'all';
type WorkflowType = 'openspec' | 'superpower' | 'all';

interface InitOptions {
  agent: string;
  workflow?: string;
  cwd: string;
}

export function initCommand(options: InitOptions): void {
  const cwd = options.cwd ?? process.cwd();

  console.log(pc.bold(pc.blue('\n🤖 Harfai Config Initializer\n')));

  if (options.workflow) {
    const workflow = options.workflow as WorkflowType;
    const workflows: Exclude<WorkflowType, 'all'>[] =
      workflow === 'all' ? ['superpower', 'openspec'] : [workflow as Exclude<WorkflowType, 'all'>];
    for (const w of workflows) {
      writeAgentConfig(w, cwd);
    }
  } else {
    const agent = options.agent as AgentType;
    const agents: Exclude<AgentType, 'all'>[] =
      agent === 'all'
        ? ['claude', 'cursor', 'trae', 'copilot', 'generic']
        : [agent as Exclude<AgentType, 'all'>];
    for (const a of agents) {
      writeAgentConfig(a, cwd);
    }
  }

  console.log(
    pc.green('\n✅ Done! Read AGENTS.md for guidelines on how to use Harfai with AI agents.\n'),
  );
}

function writeAgentConfig(agent: string, cwd: string): void {
  const template = getTemplate(agent);
  if (!template) {
    console.warn(pc.yellow(`  ⚠ Unknown agent/workflow type: ${agent} — skipping`));
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
