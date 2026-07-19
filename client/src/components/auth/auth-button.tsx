interface Props {
  children: React.ReactNode;
}

export default function AuthButton({
  children,
}: Props) {
  return (
    <button
      className="
      w-full

      rounded-xl

      bg-gradient-to-r
      from-emerald-500
      to-cyan-500

      py-3

      font-semibold

      text-white

      transition-all

      hover:scale-[1.02]

      active:scale-95
    "
    >
      {children}
    </button>
  );
}