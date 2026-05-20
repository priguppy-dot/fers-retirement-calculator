"use client";

import type { RetirementResult } from "@/lib/retirement";
import { currency, percent } from "@/lib/format";

type MetricProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function Metric({ label, value, highlight = false }: MetricProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-fers-blue bg-fers-sky"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm text-slate-600">{label}</p>
      <p
        className={`mt-1 font-semibold ${
          highlight ? "text-2xl text-fers-navy" : "text-xl text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

type Props = {
  result: RetirementResult;
};

export default function ResultsPanel({ result }: Props) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fers-navy">
          Estimated Monthly Retirement Income
        </h2>
        <Metric
          label="Total monthly income"
          value={currency(result.totalMonthlyIncome)}
          highlight
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Metric
          label="Monthly FERS pension"
          value={currency(result.monthlyFersPension)}
        />
        <Metric
          label="FERS multiplier"
          value={percent(result.pensionMultiplier)}
        />
        <Metric
          label="Monthly TSP income"
          value={currency(result.monthlyTspIncome)}
        />
        <Metric
          label="Projected TSP balance"
          value={currency(result.projectedTsp)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric
          label="Years until retirement"
          value={String(result.yearsUntilRetirement)}
        />
        <Metric
          label="Annual FERS pension"
          value={currency(result.annualFersPension)}
        />
        <Metric
          label="Annual TSP withdrawal"
          value={currency(result.annualTspIncome)}
        />
      </div>

      <p className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
        FERS pension uses 1.1% when retirement age is 62 or older with at least
        20 years of federal service; otherwise it uses 1.0%. TSP monthly income
        uses a 4% annual withdrawal rate divided by 12.
      </p>
    </section>
  );
}
