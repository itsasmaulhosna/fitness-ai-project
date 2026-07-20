"use client";

import { useState } from "react";
import ImageUpload from "./image-upload";
import { toast } from "sonner";

export default function AddForm() {
  const [preview, setPreview] = useState<string | null>(null);
const [image, setImage] = useState<File | null>(null);
const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
  title: "",
  shortDescription: "",
  fullDescription: "",
  category: "",
  trainer: "",
  duration: "",
  level: "",
  price: "",
  slots: "",
  date: "",
  priority: "",
  location: "",
});

  const handleImageChange = (file: File | null) => {
  if (!file) {
    setImage(null);
    setPreview(null);
    return;
  }

  setImage(file);
  setPreview(URL.createObjectURL(file));
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadImage = async () => {
  if (!image) return "";

  const formData = new FormData();

  formData.append("image", image);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.data.url;
};
  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);

  try {
    const imageUrl = await uploadImage();

    const program = {
      ...formData,
      image: imageUrl,
    };

    const res = await fetch("/api/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(program),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Program Added Successfully!");

      setFormData({
        title: "",
        shortDescription: "",
        fullDescription: "",
        category: "",
        trainer: "",
        duration: "",
        level: "",
        price: "",
        slots: "",
        date: "",
        priority: "",
        location: "",
      });

      setImage(null);
      setPreview(null);
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong!");

  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border bg-white p-8 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">

        {/* Title */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Title</label>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter title"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        {/* Short Description */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Short Description
          </label>

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        {/* Full Description */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Full Description
          </label>

          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>
<div>
  <label className="mb-2 block text-sm font-medium">Category</label>

  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
  >
    <option value="">Select Category</option>
    <option value="Yoga">Yoga</option>
    <option value="Strength">Strength</option>
    <option value="Cardio">Cardio</option>
    <option value="CrossFit">CrossFit</option>
    <option value="HIIT">HIIT</option>
  </select>
</div>

<div>
  <label className="mb-2 block text-sm font-medium">Trainer</label>

  <input
    type="text"
    name="trainer"
    value={formData.trainer}
    onChange={handleChange}
    placeholder="Trainer name"
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium">Level</label>

  <select
    name="level"
    value={formData.level}
    onChange={handleChange}
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
  >
    <option value="">Select Level</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
  </select>
</div>

<div>
  <label className="mb-2 block text-sm font-medium">Available Slots</label>

  <input
    type="number"
    name="slots"
    value={formData.slots}
    onChange={handleChange}
    placeholder="20"
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-medium">Location</label>

  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder="Dhaka"
    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
  />
</div>
        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-medium">Price</label>

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium">Date</label>

          <input
            name="date"
            value={formData.date}
            onChange={handleChange}
            type="date"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        {/* Priority */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <ImageUpload
            preview={preview}
            onImageChange={handleImageChange}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
  type="submit"
  disabled={loading}
  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? (
    <>
      <svg
        className="h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>

      Uploading...
    </>
  ) : (
    "Submit"
  )}
</button>
        </div>
      </div>
    </form>
  );
}