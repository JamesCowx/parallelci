import { useState } from 'react';

const suites = [
  { name: 'auth.test.ts', status: 'passed', duration: '1.2s', tests: 24, passed: 24, failed: 0 },
  { name: 'api/users.test.ts', status: 'passed', duration: '3.4s', tests: 42, passed: 40, failed: 2 },
  { name: 'api/products.test.ts', status: 'running', duration: '2.1s', tests: 18, passed: 15, failed: 0 },
  { name: 'components/ui.test.tsx', status: 'passed', duration: '4.7s', tests: 36, passed: 36, failed: 0 },
  { name: 'integration/checkout.test.ts', status: 'failed', duration: '5.2s', tests: 12, passed: 8, failed: 4 },
  { name: 'e2e/search.test.ts', status: 'passed', duration: '8.1s', tests: 9, passed: 9, failed: 0 },
  { name: 'security/cors.test.ts', status: 'passed', duration: '0.8s', tests: 6, passed: 6, failed: 0 },
  { name: 'performance/load.test.ts', status: 'queued', duration: '--', tests: 0, passed: 0, failed: 0 },
];

const failures = [
  { test: 'api/users.test.ts', name: 'should create user with valid data', line: 42, error: 'AssertionError: expected 201 to equal 200' },
  { test: 'api/users.test.ts', name: 'should return 404 for missing user', line: 88, error: 'TimeoutError: waited 5000ms for response' },
  { test: 'integration/checkout.test.ts', name: 'should process payment with coupon', line: 156, error: 'TypeError: Cannot read properties of null' },
  { test: 'integration/checkout.test.ts', name: 'should handle out-of-stock items', line: 203, error: 'AssertionError: expected cart to be empty' },
  { test: 'integration/checkout.test.ts', name: 'should refund cancelled order', line: 267, error: 'ReferenceError: refundService is not defined' },
  { test: 'integration/checkout.test.ts', name: 'should apply tax to international orders', line: 312, error: 'AssertionError: expected 22.50 to equal 25.00' },
];

const totalTests = suites.reduce((s, t) => s + t.tests, 0);
const totalPassed = suites.reduce((s, t) => s + t.passed, 0);
const totalFailed = suites.reduce((s, t) => s + t.failed, 0);

export default function TestResultsDemo() {
  const [showFailures, setShowFailures] = useState(false);

  return (
    <div className="liquid-glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#34d399]/15 flex items-center justify-center text-sm">ðŸ§ª</div>
          <div>
            <h3 className="text-sm font-semibold">Parallel CI</h3>
            <div className="text-[10px] text-[var(--color-text-muted)]">Pipeline #8472 Â· main Â· 8 suites</div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">{totalFailed > 0 ? `${totalFailed} failed` : 'All passed'}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: totalTests, color: 'text-white' },
          { label: 'Passed', value: totalPassed, color: 'text-green-400' },
          { label: 'Failed', value: totalFailed, color: 'text-red-400' },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04] text-center">
            <p className="text-[10px] text-[var(--color-text-muted)]">{s.label}</p>
            <p className={`text-xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {suites.map((s) => (
          <div key={s.name} className="flex items-center gap-3 px-3 py-2.5 bg-white/[0.015] rounded-xl border border-white/[0.04] text-[11px]">
            <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'passed' ? 'bg-green-400' : s.status === 'failed' ? 'bg-red-400' : s.status === 'running' ? 'bg-yellow-400 animate-pulse' : 'bg-[var(--color-text-muted)]'}`} />
            <span className="flex-1 truncate text-white">{s.name}</span>
            <span className="text-[var(--color-text-muted)] font-mono">{s.duration}</span>
            <span className="text-green-400">{s.passed}</span>
            <span className="text-[var(--color-text-muted)]">/</span>
            <span className={s.failed > 0 ? 'text-red-400' : 'text-[var(--color-text-muted)]'}>{s.failed}</span>
            {s.failed > 0 && (
              <button onClick={() => setShowFailures(true)} className="px-2 py-0.5 rounded text-[9px] bg-red-400/10 text-red-400 border border-red-400/20 cursor-pointer">View</button>
            )}
          </div>
        ))}
      </div>

      {showFailures && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Failed Tests</p>
            <button onClick={() => setShowFailures(false)} className="text-[10px] text-[var(--color-text-muted)] cursor-pointer">âœ•</button>
          </div>
          {failures.filter((f) => f.test !== 'api/users.test.ts' || failures.indexOf(f) < 2).slice(0, 4).map((f, i) => (
            <div key={i} className="p-3 bg-white/[0.02] border border-red-400/10 rounded-xl">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-red-400 font-medium">{f.test}</span>
                <span className="text-[var(--color-text-muted)]">L{f.line}</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{f.name}</p>
              <pre className="mt-1 text-[10px] font-mono text-red-400/80 bg-black/20 rounded-lg p-2 overflow-x-auto">{f.error}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

