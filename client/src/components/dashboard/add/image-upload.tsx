"use client";

import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  preview: string | null;
  onImageChange: (file: File | null) => void;
}

export default function ImageUpload({
  preview,
  onImageChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onImageChange(file);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium">
        Featured Image
      </label>

      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border">

          <Image
            src={preview}
            alt="Preview"
            width={800}
            height={400}
            className="h-64 w-full object-cover"
          />

          <button
            type="button"
            onClick={() => onImageChange(null)}
            className="absolute right-4 top-4 rounded-full bg-red-500 p-2 text-white"
          >
            <Trash2 size={18} />
          </button>

        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 transition hover:border-emerald-500 hover:bg-slate-50"
        >
          <ImagePlus
            size={42}
            className="text-slate-400"
          />

          <p className="mt-4 font-medium">
            Click to upload image
          </p>

          <p className="text-sm text-slate-500">
            PNG, JPG, JPEG
          </p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
    </div>
  );
}