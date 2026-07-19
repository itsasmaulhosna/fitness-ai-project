interface Props {
  label: string;
}

export default function AuthCheckbox({
  label,
}: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-300">

      <input
        type="checkbox"
        className="rounded"
      />

      {label}

    </label>
  );
}