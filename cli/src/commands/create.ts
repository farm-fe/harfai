import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import pc from 'picocolors';
import { initCommand } from './init.js';

interface CreateOptions {
  agent?: string;
}

export function createCommand(projectName: string | undefined, options: CreateOptions): void {
  const name = projectName ?? 'my-harfai-app';
  const targetDir = join(process.cwd(), name);

  console.log(pc.bold(pc.blue('\n🌾 Creating Harfai project: ')) + pc.cyan(name) + '\n');

  if (existsSync(targetDir)) {
    console.error(pc.red(`  ✗ Directory "${name}" already exists. Aborting.`));
    process.exit(1);
  }

  mkdirSync(targetDir, { recursive: true });

  // Write minimal README
  writeFileSync(
    join(targetDir, 'README.md'),
    `# ${name}\n\nFull-stack app built with [Harfai](https://github.com/farm-fe/harfai).\n`,
    'utf-8',
  );

  console.log(pc.green(`  ✓ Created ${name}/`));
  console.log(pc.dim(`  → cd ${name} && pnpm install\n`));

  // Optionally write agent configs
  if (options.agent) {
    initCommand({ agent: options.agent, cwd: targetDir });
  }

  console.log(pc.bold(pc.green('\n🎉 Project created successfully!\n')));
  console.log(`Next steps:\n`);
  console.log(`  ${pc.cyan(`cd ${name}`)}`);
  console.log(`  ${pc.cyan('pnpm install')}`);
  console.log(`  ${pc.cyan('pnpm dev')}\n`);
}
