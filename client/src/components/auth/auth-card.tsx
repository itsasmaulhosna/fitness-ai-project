interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div
      className="
        w-full
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-2xl

        p-6
        sm:p-8
        lg:p-12
      "
    >
      {children}
    </div>
  );
}