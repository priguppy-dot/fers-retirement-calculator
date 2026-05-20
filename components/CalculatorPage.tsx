"use client";

import { useMemo, useState } from "react";
import CalculatorForm from "@/components/CalculatorForm";
import ResultsPanel from "@/components/ResultsPanel";
import {
  DEFAULT_INPUTS,
  calculateRetirement,
  isValidInputs,
  type RetirementInputs,
} from "@/lib/retirement";

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<RetirementInputs>(DEFAULT_INPUTS);

  const valid = isValidInputs(inputs);
  const result = useMemo(
    () => (valid ? calculateRetirement(inputs) : null),
    [inputs, valid],
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-fers-navy">
          FERS Retirement Calculator
        </h1>
        <p className="mt-2 text-slate-600">
          Estimate your monthly retirement income from FERS pension and TSP
          withdrawals.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <CalculatorForm inputs={inputs} onChange={setInputs} />
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {!valid ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              Planned retirement age must be greater than or equal to current
              age.
            </p>
          ) : result ? (
            <ResultsPanel result={result} />
          ) : null}
        </div>
      </div>
    </main>
  );
}
