import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const outputDirectory = 'dist';
const routeEntries = [
  'design/index.html',
  'design/su-yet-designs/index.html',
  'developer/index.html',
  'case-study/austonian-hub/index.html',
  'case-study/cursor-ai-hackathon/index.html',
  '404.html',
];

for (const routeEntry of routeEntries) {
  const destination = join(outputDirectory, routeEntry);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(outputDirectory, 'index.html'), destination);
}
