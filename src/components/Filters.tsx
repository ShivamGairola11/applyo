"use client";

import { useState, useEffect } from "react";

interface FiltersProps {
  onFilterChange: (type: string, year: string) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    onFilterChange(type, year);
  }, [type, year]);

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>

      <input
        type="text"
        value={year}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d{0,4}$/.test(val)) setYear(val);
        }}
        placeholder="Year"
        className="px-3 py-2 border rounded-md w-28"
      />
    </div>
  );
}
