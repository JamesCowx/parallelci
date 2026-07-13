export interface CacheConfig { key: string; paths: string[]; restoreKeys: string[]; }
export interface Artifact { name: string; path: string; type: "build" | "test" | "coverage" | "binary"; size?: number; }
export function generateCacheKey(branch: string, commitSha: string, jobName: string): string { return "cache-" + branch + "-" + commitSha.substring(0, 8) + "-" + jobName; }
export function shouldCache(key: string, existingKeys: string[]): boolean { return !existingKeys.includes(key); }
