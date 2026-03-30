#!/usr/bin/env node
import { program } from 'commander';
import { initCommand } from './commands/init.js';
import { createCommand } from './commands/create.js';

const pkg = { version: '0.1.0', description: 'Harfai full-stack framework scaffolding CLI' };

program.name('create-harfai').description(pkg.description).version(pkg.version);

program
  .command('init')
  .description('Add AI agent configuration files to an existing project')
  .option(
    '--agent <agent>',
    'Agent type: claude | cursor | trae | copilot | generic | all',
    'generic',
  )
  .option('--workflow <workflow>', 'Workflow type: openspec | superpower | all')
  .option('--cwd <path>', 'Target directory', process.cwd())
  .action(initCommand);

program
  .argument('[project-name]', 'Name for the new Harfai project')
  .description('Create a new Harfai project')
  .option('--agent <agent>', 'Pre-configure an AI agent: claude | cursor | trae | copilot | all')
  .action(createCommand);

program.parse();
