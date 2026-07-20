"use client";

import { useEffect, useMemo, useState } from "react";
import ProgramCard from "@/components/category/ProgramCard";
import SearchBar from "@/components/category/SearchBar";
import SortDropdown from "@/components/category/SortDropdown";
import { Program } from "@/types/program";

export default function CategoryPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function getPrograms() {
      try {
        const res = await fetch("/api/programs");
        const data = await res.json();

        setPrograms(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPrograms();
  }, []);

  const filteredPrograms = useMemo(() => {
    const keyword = search.toLowerCase();

    const filtered = programs.filter((program) => {
      return (
        (program.title ?? "").toLowerCase().includes(keyword) ||
        (program.category ?? "").toLowerCase().includes(keyword) ||
        (program.trainer ?? "").toLowerCase().includes(keyword)
      );
    });

    switch (sort) {
      case "priceLow":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "priceHigh":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "za":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt ?? "").getTime() -
            new Date(b.createdAt ?? "").getTime()
        );
        break;

      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        );
    }

    return filtered;
  }, [programs, search, sort]);

  return (
    <section className="mx-auto max-w-7xl px-5 pt-32 pb-14">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Fitness Programs</h1>

        <p className="mt-2 text-gray-500">
          Discover the best workout programs for your goals.
        </p>
      </div>

      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-lg">
          <SearchBar
            value={search}
            onChange={setSearch}
          />
        </div>

        <div className="w-full md:w-60">
          <SortDropdown
            value={sort}
            onChange={setSort}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-lg font-medium">
          Loading programs...
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <h2 className="text-2xl font-semibold">
            No Programs Found
          </h2>

          <p className="mt-2 text-gray-500">
            Try searching with another keyword.
          </p>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program._id}
              program={program}
            />
          ))}
        </div>
      )}
    </section>
  );
}