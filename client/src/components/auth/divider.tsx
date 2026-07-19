export default function Divider() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-sm text-slate-400">
        OR
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}