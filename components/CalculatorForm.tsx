"use client";

import type { RetirementInputs } from "@/lib/retirement";

type FieldConfig = {
  key: keyof RetirementInputs;
  label: string;
  min: number;
  max: number;
  step: number;
};

const FIELDS: FieldConfig[] = [
  { key: "currentAge", label: "Current age", min: 18, max: 100, step: 1 },
  {
    key: "plannedRetirementAge",
    label: "Planned retirement age",
    min: 18,
    max: 100,
    step: 1,
  },
  {
    key: "yearsOfService",
    label: "Total years of federal service at retirement",
    min: 0,
    max: 80,
    step: 0.5,
  },
  {
    key: "high3Salary",
    label: "High-3 average salary",
    min: 0,
    max: 1_000_000,
    step: 1000,
  },
  {
    key: "currentTspBalance",
    label: "Current TSP balance",
    min: 0,
    max: 10_000_000,
    step: 5000,
  },
  {
    key: "monthlyTspContribution",
    label: "Monthly TSP contribution",
    min: 0,
    max: 50_000,
    step: 50,
  },
  {
    key: "expectedAnnualReturn",
    label: "Expected annual TSP return rate (%)",
    min: -25,
    max: 25,
    step: 0.25,
  },
];

type Props = {
  inputs: RetirementInputs;
  onChange: (inputs: RetirementInputs) => void;
};

export default function CalculatorForm({ inputs, onChange }: Props) {
  const update = (key: keyof RetirementInputs, value: number) => {
    onChange({ ...inputs, [key]: value });
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-fers-navy">Retirement Inputs</h2>
      <div className="mt-4 space-y-4">
        {FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="text-sm font-medium text-slate-700">
              {field.label}
            </span>
            <input
              type="number"
              min={field.min}
              max={field.max}
              step={field.step}
              value={inputs[field.key]}
              onChange={(e) => update(field.key, Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-fers-blue focus:outline-none focus:ring-2 focus:ring-fers-blue/20"
            />
          </label>
        ))}
      </div>
    </aside>
  );
}
