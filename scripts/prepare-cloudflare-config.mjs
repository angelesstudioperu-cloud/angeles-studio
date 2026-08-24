import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const productionPath = path.join(root, 'wrangler.production.jsonc');
const generatedPath = path.join(root, 'dist', 'server', 'wrangler.json');

const production = JSON.parse(await readFile(productionPath, 'utf8'));
const generated = JSON.parse(await readFile(generatedPath, 'utf8'));

generated.name = production.name;
generated.topLevelName = production.name;
generated.compatibility_date = production.compatibility_date;
generated.compatibility_flags = production.compatibility_flags;
generated.workers_dev = production.workers_dev;
generated.preview_urls = production.preview_urls;
generated.d1_databases = production.d1_databases.map((binding) => {
  const deployBinding = { ...binding };
  delete deployBinding.migrations_dir;
  return deployBinding;
});
generated.r2_buckets = production.r2_buckets;
generated.vars = production.vars;
generated.observability = production.observability;

await writeFile(generatedPath, `${JSON.stringify(generated, null, 2)}\n`, 'utf8');
