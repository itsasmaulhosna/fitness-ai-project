import Image from "next/image";
import { Program } from "@/types/program";


export default function ProgramCard({
  program,
}: {
  program: Program;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow">

      <Image
        src={program.image}
        alt={program.title}
        width={500}
        height={300}
        className="h-56 w-full object-cover"
      />

      <div className="space-y-3 p-5">

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {program.category}
        </span>

        <h2 className="text-xl font-bold">
          {program.title}
        </h2>

        <p className="text-sm text-slate-600">
          {program.shortDescription}
        </p>

        <div className="flex justify-between text-sm text-slate-500">
          <span>{program.trainer}</span>
          <span>{program.level}</span>
        </div>

        <div className="flex items-center justify-between">

          <h3 className="text-lg font-bold text-emerald-600">
            ${program.price}
          </h3>

          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
            Details
          </button>

        </div>

      </div>

    </div>
  );
}