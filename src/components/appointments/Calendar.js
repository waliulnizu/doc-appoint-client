"use client";

import { useMemo, useState } from "react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const pad = (n) => String(n).padStart(2, "0");

/** Convert Date -> "YYYY-MM-DD" (local time, not UTC) */
export const toDateString = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const startOfToday = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

/**
 * Compact calendar that fits inline inside a modal.
 * Past dates and dates beyond `maxDaysAhead` are disabled.
 */
export default function Calendar({
  value,
  onChange,
  maxDaysAhead = 60,
  onSelect,
}) {
  const today = useMemo(() => startOfToday(), []);
  const maxDate = useMemo(() => {
    const d = startOfToday();
    d.setDate(d.getDate() + maxDaysAhead);
    return d;
  }, [maxDaysAhead]);

  const selected = value ? new Date(`${value}T00:00:00`) : null;

  const [viewYear, setViewYear] = useState(
    selected ? selected.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    selected ? selected.getMonth() : today.getMonth()
  );

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = useMemo(() => {
    const list = [];

    for (let i = 0; i < firstDay; i += 1) {
      list.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      list.push(new Date(viewYear, viewMonth, day));
    }

    while (list.length % 7 !== 0) {
      list.push(null);
    }

    return list;
  }, [firstDay, daysInMonth, viewYear, viewMonth]);

  const canGoNext =
    viewYear < maxDate.getFullYear() ||
    (viewYear === maxDate.getFullYear() && viewMonth < maxDate.getMonth());

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const shiftMonth = (delta) => {
    if (delta > 0 && !canGoNext) return;
    if (delta < 0 && !canGoPrev) return;

    const d = new Date(viewYear, viewMonth + delta, 1);

    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const isDisabled = (date) => date < today || date > maxDate;

  const isToday = (date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const isSelected = (date) =>
    selected &&
    date.getFullYear() === selected.getFullYear() &&
    date.getMonth() === selected.getMonth() &&
    date.getDate() === selected.getDate();

  const handlePick = (date) => {
    if (isDisabled(date)) return;

    onChange(toDateString(date));
    onSelect?.();
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
      {/* Header */}
      <div className="mb-1.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="flex h-6 w-6 items-center justify-center rounded text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-25"
        >
          ‹
        </button>

        <p className="text-xs font-bold text-slate-800">
          {MONTHS[viewMonth]} {viewYear}
        </p>

        <button
          type="button"
          onClick={() => shiftMonth(1)}
          disabled={!canGoNext}
          aria-label="Next month"
          className="flex h-6 w-6 items-center justify-center rounded text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-25"
        >
          ›
        </button>
      </div>

      {/* Weekday header */}
      <div className="mb-0.5 grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className="py-0.5 text-center text-[10px] font-semibold text-slate-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((date, i) => {
          if (!date) {
            return <div key={`empty-${i}`} />;
          }

          const disabled = isDisabled(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => handlePick(date)}
              className={`h-7 rounded text-[11px] font-medium transition ${
                isSelected(date)
                  ? "bg-blue-600 font-bold text-white shadow-sm"
                  : disabled
                    ? "cursor-not-allowed text-slate-300"
                    : "text-slate-700 hover:bg-white hover:text-blue-700"
              } ${isToday(date) && !isSelected(date) ? "ring-1 ring-blue-400" : ""}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}