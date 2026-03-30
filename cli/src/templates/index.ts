export interface AgentTemplate {
  outputPath: string;
  content: string;
}

export type AgentType = 'claude' | 'cursor' | 'trae' | 'copilot' | 'generic';

import { claudeTemplate } from './claude/index.js';
import { cursorTemplate } from './cursor/index.js';
import { traeTemplate } from './trae/index.js';
import { copilotTemplate } from './copilot/index.js';
import { genericTemplate } from './generic/index.js';

const templates: Record<AgentType, AgentTemplate> = {
  claude: claudeTemplate,
  cursor: cursorTemplate,
  trae: traeTemplate,
  copilot: copilotTemplate,
  generic: genericTemplate,
};

export function getTemplate(agent: string): AgentTemplate | undefined {
  return templates[agent as AgentType];
}
