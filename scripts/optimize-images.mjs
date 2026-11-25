import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('public/images/optimized/', root);
await mkdir(output, { recursive: true });
for (const [name, original, widths] of [
  ['laura-londono', 'laura-londono.jpeg', [640, 1280]],
  ['portada-drilo', 'portada-drilo.png', [480, 960]],
]) {
  const input = fileURLToPath(new URL(`public/images/${original}`, root));
  for (const width of widths) {
    const target = fileURLToPath(new URL(`${name}-${width}.webp`, output));
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(target);
    console.log(`${name}-${width}.webp: ${Math.round((await stat(target)).size / 1024)} KB`);
  }
}
