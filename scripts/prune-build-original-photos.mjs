import { rm } from "node:fs/promises";
import { join } from "node:path";

const buildOriginalsDir = join(
  process.cwd(),
  ".output/public/illustrations/photo_succ",
);

await rm(buildOriginalsDir, { recursive: true, force: true });
console.log("Removed original gallery photos from .output; optimized versions remain.");
