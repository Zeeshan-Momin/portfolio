import fs from 'fs/promises';
import path from 'path';

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node scripts/uploadCert.js <file1> [file2] ...');
    process.exit(1);
  }

  const publicDir = path.resolve(process.cwd(), 'public', 'certificates');
  const manifestPath = path.join(publicDir, 'manifest.json');

  try {
    await fs.mkdir(publicDir, { recursive: true });
  } catch (e) {}

  let manifest = [];
  try {
    const raw = await fs.readFile(manifestPath, 'utf8');
    manifest = JSON.parse(raw || '[]');
  } catch (e) {
    manifest = [];
  }

  for (const file of args) {
    const src = path.resolve(process.cwd(), file);
    try {
      const stat = await fs.stat(src);
      if (!stat.isFile()) {
        console.warn(`${file} is not a file, skipping.`);
        continue;
      }
    } catch (e) {
      console.warn(`Cannot access ${file}, skipping.`);
      continue;
    }

    const base = path.basename(file);
    const timestamp = Date.now();
    const safeName = `${timestamp}-${base}`;
    const dest = path.join(publicDir, safeName);

    await fs.copyFile(src, dest);

    const entry = {
      name: base,
      file: safeName,
      url: `/certificates/${safeName}`,
      title: base.replace(/\.[^/.]+$/, ''),
      date: new Date().toISOString().split('T')[0],
      description: ''
    };

    manifest.unshift(entry);
    console.log(`Uploaded ${base} -> public/certificates/${safeName}`);
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Updated manifest:', manifestPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
