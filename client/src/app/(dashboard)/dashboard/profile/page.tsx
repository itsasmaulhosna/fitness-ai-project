import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Profile Header */}
        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

            {/* Avatar */}
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-emerald-500 shadow-md">

              <Image
                src={user.image || "/default-avatar.png"}
                alt={user.name}
                fill
                className="object-cover"
              />

            </div>

            {/* User Info */}
            <div className="flex-1">

              <h1 className="text-3xl font-bold text-slate-900">
                {user.name}
              </h1>

              <p className="mt-2 text-slate-500">
                {user.email}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                  Active Member
                </span>

                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {user.emailVerified
                    ? "Email Verified"
                    : "Email Not Verified"}
                </span>

              </div>

            </div>

            {/* Button */}
            <button className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700">
              Edit Profile
            </button>

          </div>

        </div>

        {/* Next Part */}
<div className="grid gap-6 lg:grid-cols-3">

  {/* Left */}
  <div className="lg:col-span-2">

    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Personal Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-slate-500">
            Full Name
          </label>

          <input
            type="text"
            value={user.name}
            readOnly
            className="w-full rounded-xl border bg-slate-50 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-500">
            Email
          </label>

          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full rounded-xl border bg-slate-50 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-500">
            Phone
          </label>

          <input
            type="text"
            placeholder="Enter phone number"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-500">
            Gender
          </label>

          <select className="w-full rounded-xl border px-4 py-3">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

      </div>

    </div>

  </div>

  {/* Right */}
  {/* About Me */}
<div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm">

  <div className="flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      About Me
    </h2>

    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
      Public
    </span>

  </div>

  <p className="mt-2 text-slate-500">
    Write a short bio about yourself.
  </p>

  <textarea
    rows={5}
    placeholder="Tell us something about yourself..."
    className="mt-6 w-full rounded-xl border border-slate-200 p-4 outline-none transition focus:border-emerald-500"
  />

  <div className="mt-8 flex justify-end">

    <button className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700">
      Save Changes
    </button>

  </div>

</div>
  <div>

    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h3 className="text-xl font-bold">
        Account Status
      </h3>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span>Status</span>
          <span className="font-semibold text-green-600">
            Active
          </span>
        </div>

        <div className="flex justify-between">
          <span>Email</span>
          <span className="font-semibold">
            {user.emailVerified ? "Verified" : "Pending"}
          </span>
        </div>

      </div>

    </div>

  </div>

</div>
      </div>
    </div>
  );
}