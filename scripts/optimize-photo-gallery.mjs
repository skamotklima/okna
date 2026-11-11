import { mkdir, readdir, rename, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const sourceDir = join(rootDir, "public/illustrations/photo_succ");
const outputDir = join(rootDir, "public/illustrations/photo_succ_optimized");
const blurDir = join(rootDir, "public/illustrations/photo_succ_blur");
const manifestPath = join(rootDir, "public/illustrations/photo_succ_manifest.json");

const sizes = [
  { name: "480", max: 480, quality: 72 },
  { name: "900", max: 900, quality: 74 },
  { name: "1400", max: 1400, quality: 76 },
];

const blurSize = { max: 48, quality: 45 };
const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);

function runSips(args) {
  const result = spawnSync("sips", args, { encoding: "utf8" });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `sips failed: ${args.join(" ")}`);
  }

  return result.stdout;
}

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);

      if (entry.isDirectory()) {
        return getFiles(path);
      }

      if (!entry.isFile() || !imageExtensions.has(extname(entry.name).toLowerCase())) {
        return [];
      }

      return [path];
    }),
  );

  return files.flat();
}

function getDimensions(filePath) {
  const output = runSips(["-g", "pixelWidth", "-g", "pixelHeight", filePath]);
  const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] || 0);
  const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1] || 0);

  return { width, height };
}

async function shouldRegenerate(source, target) {
  try {
    const [sourceStats, targetStats] = await Promise.all([stat(source), stat(target)]);
    return sourceStats.mtimeMs > targetStats.mtimeMs;
  } catch {
    return true;
  }
}

async function writeOptimized(source, target, maxSize, quality) {
  if (!(await shouldRegenerate(source, target))) {
    return false;
  }

  await mkdir(dirname(target), { recursive: true });
  const tempTarget = `${target}.tmp`;

  runSips([
    "-Z",
    String(maxSize),
    "-s",
    "format",
    "jpeg",
    "-s",
    "formatOptions",
    String(quality),
    source,
    "--out",
    tempTarget,
  ]);

  await rename(tempTarget, target);
  return true;
}

const files = await getFiles(sourceDir);
const manifest = {};
let generated = 0;

for (const source of files) {
  const relativePath = relative(sourceDir, source);
  const normalizedRelativePath = relativePath.split("\\").join("/");
  const dimensions = getDimensions(source);

  manifest[normalizedRelativePath] = dimensions;

  for (const size of sizes) {
    const target = join(outputDir, size.name, relativePath);
    if (await writeOptimized(source, target, size.max, size.quality)) {
      generated += 1;
    }
  }

  const blurTarget = join(blurDir, relativePath);
  if (await writeOptimized(source, blurTarget, blurSize.max, blurSize.quality)) {
    generated += 1;
  }
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Optimized ${files.length} source photos; generated ${generated} files.`);
