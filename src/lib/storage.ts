const STORAGE_KEY = "goodness-arcade";
const VERSION = 1;

interface StorageShape {
  version: number;
  data: Record<string, unknown>;
}

function readAll(): StorageShape {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: VERSION, data: {} };
    const parsed = JSON.parse(raw) as StorageShape;
    if (parsed.version !== VERSION) return { version: VERSION, data: {} };
    return parsed;
  } catch {
    return { version: VERSION, data: {} };
  }
}

function writeAll(shape: StorageShape) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shape));
  } catch {
    // storage unavailable (private mode, quota, etc) — fail silently
  }
}

export function getItem<T>(key: string): T | undefined {
  return readAll().data[key] as T | undefined;
}

export function setItem<T>(key: string, value: T) {
  const shape = readAll();
  shape.data[key] = value;
  writeAll(shape);
}

export function removeItem(key: string) {
  const shape = readAll();
  delete shape.data[key];
  writeAll(shape);
}