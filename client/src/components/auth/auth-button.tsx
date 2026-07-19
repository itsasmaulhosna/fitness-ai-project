import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
}

export default function AuthButton({
  children,
  loading = false,
}: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-gradient-to-r
        from-emerald-500
        to-cyan-500
        py-3
        font-semibold
        text-white
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-lg
        hover:shadow-emerald-500/20
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {loading ? "Please wait..." : children}
    </button>
  );
}