import { readFile, readdir } from "node:fs/promises";
import { extname, resolve } from "node:path";

type GalleryPhoto = {
  src: string;
  alt: string;
  fileName: string;
  width?: number;
  height?: number;
};

type GalleryCollection = {
  id: string;
  order: number;
  title: string;
  total: number;
  photos: GalleryPhoto[];
};

const galleryDir = resolve(process.cwd(), "public/illustrations/photo_succ");
const manifestPath = resolve(process.cwd(), "public/illustrations/photo_succ_manifest.json");
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const hiddenCollectionIds = new Set([`collection-${String(7).padStart(2, "0")}`]);
const collectionTitles: Record<string, string> = {
  "collection-01": "Фотостудия в центре Барнаула",
  "collection-02": "Частный дом в Барнауле",
  "collection-03": "Коммерческое помещение",
  "collection-04": "Студия",
  "collection-05": "Дом для семьи",
  "collection-06": "Частный дом",
};
let manifestCache: Record<string, { width: number; height: number }> | null = null;

const getCollectionOrder = (value: string) => {
  const match = value.match(/(\d+)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
};

const getCollectionTitle = (value: string, fallbackIndex: number) => {
  if (collectionTitles[value]) {
    return collectionTitles[value];
  }

  const order = getCollectionOrder(value);
  const normalizedOrder = Number.isFinite(order) ? order : fallbackIndex + 1;
  return `Коллекция ${normalizedOrder}`;
};

const getPhotoManifest = async () => {
  if (manifestCache) {
    return manifestCache;
  }

  try {
    const content = await readFile(manifestPath, "utf8");
    manifestCache = JSON.parse(content);
  } catch {
    manifestCache = {};
  }

  return manifestCache;
};

const buildCollectionsFromManifest = (
  manifest: Record<string, { width: number; height: number }>,
): GalleryCollection[] => {
  const grouped = new Map<string, string[]>();

  Object.keys(manifest).forEach((key) => {
    const separatorIndex = key.indexOf("/");
    if (separatorIndex < 0) {
      return;
    }

    const collectionName = key.slice(0, separatorIndex);
    if (hiddenCollectionIds.has(collectionName)) {
      return;
    }

    const fileName = key.slice(separatorIndex + 1);
    const files = grouped.get(collectionName) || [];
    files.push(fileName);
    grouped.set(collectionName, files);
  });

  return Array.from(grouped.entries())
    .sort(([first], [second]) => {
      const orderFirst = getCollectionOrder(first);
      const orderSecond = getCollectionOrder(second);
      if (orderFirst !== orderSecond) {
        return orderFirst - orderSecond;
      }
      return first.localeCompare(second, "ru", { numeric: true, sensitivity: "base" });
    })
    .map(([collectionName, photoNames], collectionIndex) => {
      const sortedPhotoNames = photoNames.sort((first, second) =>
        first.localeCompare(second, "ru", { numeric: true, sensitivity: "base" }),
      );
      const order = getCollectionOrder(collectionName);

      return {
        id: collectionName,
        order: Number.isFinite(order) ? order : collectionIndex + 1,
        title: getCollectionTitle(collectionName, collectionIndex),
        total: sortedPhotoNames.length,
        photos: sortedPhotoNames.map((fileName, photoIndex) => {
          const dimensions = manifest[`${collectionName}/${fileName}`];

          return {
            src: `/illustrations/photo_succ/${encodeURIComponent(collectionName)}/${encodeURIComponent(fileName)}`,
            alt: `${getCollectionTitle(collectionName, collectionIndex)}, фото ${photoIndex + 1}`,
            fileName,
            width: dimensions?.width,
            height: dimensions?.height,
          };
        }),
      } satisfies GalleryCollection;
    });
};

export default defineEventHandler(async (): Promise<GalleryCollection[]> => {
  try {
    const manifest = await getPhotoManifest();
    const manifestCollections = buildCollectionsFromManifest(manifest);

    if (manifestCollections.length) {
      return manifestCollections;
    }

    const entries = await readdir(galleryDir, { withFileTypes: true });

    const collectionNames = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => !hiddenCollectionIds.has(name))
      .sort((first, second) => {
        const orderFirst = getCollectionOrder(first);
        const orderSecond = getCollectionOrder(second);
        if (orderFirst !== orderSecond) {
          return orderFirst - orderSecond;
        }
        return first.localeCompare(second, "ru", { numeric: true, sensitivity: "base" });
      });

    const collections = await Promise.all(
      collectionNames.map(async (collectionName, collectionIndex) => {
        const collectionPath = resolve(galleryDir, collectionName);
        const fileEntries = await readdir(collectionPath, { withFileTypes: true });

        const photoNames = fileEntries
          .filter((entry) => entry.isFile())
          .map((entry) => entry.name)
          .filter((name) => allowedExtensions.has(extname(name).toLowerCase()))
          .sort((first, second) => first.localeCompare(second, "ru", { numeric: true }));

        const order = getCollectionOrder(collectionName);

        return {
          id: collectionName,
          order: Number.isFinite(order) ? order : collectionIndex + 1,
          title: getCollectionTitle(collectionName, collectionIndex),
          total: photoNames.length,
          photos: photoNames.map((fileName, photoIndex) => {
            const manifestKey = `${collectionName}/${fileName}`;
            const dimensions = manifest[manifestKey];

            return {
              src: `/illustrations/photo_succ/${encodeURIComponent(collectionName)}/${encodeURIComponent(fileName)}`,
              alt: `${getCollectionTitle(collectionName, collectionIndex)}, фото ${photoIndex + 1}`,
              fileName,
              width: dimensions?.width,
              height: dimensions?.height,
            };
          }),
        } satisfies GalleryCollection;
      }),
    );

    return collections;
  } catch {
    return [];
  }
});
