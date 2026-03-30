import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function validate() {
  // Dynamic import to handle ESM
  const SwaggerParser = await import('@apidevtools/swagger-parser');
  const parser = SwaggerParser.default ?? SwaggerParser;
  const specPath = resolve(__dirname, '../spec.yaml');

  try {
    const api = await parser.validate(specPath);
    console.log(`✅ OpenAPI spec is valid. API: ${api.info.title} v${api.info.version}`);
  } catch (err) {
    console.error('❌ OpenAPI spec validation failed:');
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

validate();
