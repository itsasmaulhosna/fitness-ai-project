import ProgramCard from "@/components/category/ProgramCard";

interface Program {
  _id: string;
  title: string;
  shortDescription: string;
  image: string;
  category: string;
  trainer: string;
  level: string;
  price: string;
}

async function getPrograms(): Promise<Program[]> {
  const res = await fetch("http://localhost:3000/api/programs", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data;
}

export default async function CategoryPage() {
  const programs = await getPrograms();

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Fitness Programs
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard
            key={program._id}
            program={program}
          />
        ))}
      </div>
    </section>
  );
}