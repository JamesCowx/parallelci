export interface PipelineJob { id: string; name: string; image: string; commands: string[]; dependencies: string[]; env: Record<string, string>; timeout: number; retries: number; }
export interface PipelineRun { id: string; pipelineId: string; commitSha: string; branch: string; status: "pending" | "running" | "passed" | "failed" | "cancelled"; jobs: JobRun[]; startedAt: string; finishedAt?: string; }
export interface JobRun { id: string; jobId: string; name: string; status: "pending" | "running" | "passed" | "failed" | "skipped"; startedAt?: string; finishedAt?: string; log: string[]; exitCode?: number; }
export function createRun(pipelineId: string, jobs: PipelineJob[], commitSha: string, branch: string): PipelineRun { return { id: "run-" + Date.now(), pipelineId, commitSha, branch, status: "pending", jobs: jobs.map(j => ({ id: "jr-" + Date.now() + "-" + j.name, jobId: j.id, name: j.name, status: "pending", log: [] })), startedAt: new Date().toISOString() }; }
export function determineJobOrder(jobs: PipelineJob[]): PipelineJob[][] {
  const levels: PipelineJob[][] = []; const remaining = new Set(jobs);
  while (remaining.size > 0) {
    const ready = Array.from(remaining).filter(j => j.dependencies.every(d => !Array.from(remaining).some(r => r.id === d)));
    if (ready.length === 0) break;
    levels.push(ready); ready.forEach(r => remaining.delete(r));
  }
  return levels;
}
