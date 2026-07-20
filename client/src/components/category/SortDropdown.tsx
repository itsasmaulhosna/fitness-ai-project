"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="priceLow">Price: Low → High</option>
      <option value="priceHigh">Price: High → Low</option>
      <option value="az">Title: A → Z</option>
      <option value="za">Title: Z → A</option>
    </select>
  );
}