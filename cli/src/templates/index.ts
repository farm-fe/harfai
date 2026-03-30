export interface ConfigTemplate {
  outputPath: string;
  content: string;
}

export type AgentType = 'claude' | 'cursor' | 'trae' | 'copilot' | 'generic';
export type WorkflowType = 'openspec' | 'superpower';
export type TemplateType = AgentType | WorkflowType;

import { claudeTemplate } from './claude/index.js';
import { cursorTemplate } from './cursor/index.js';
import { traeTemplate } from './trae/index.js';
import { copilotTemplate } from './copilot/index.js';
import { genericTemplate } from './generic/index.js';
import { openspecTemplate } from './openspec/index.js';
import { superpowerTemplate } from './superpower/index.js';

const templates: Record<TemplateType, ConfigTemplate> = {
  claude: claudeTemplate,
  cursor: cursorTemplate,
  trae: traeTemplate,
  copilot: copilotTemplate,
  generic: genericTemplate,
  openspec: openspecTemplate,
  superpower: superpowerTemplate,
};

export function getTemplate(agent: string): ConfigTemplate | undefined {
  return templates[agent as TemplateType];
}
