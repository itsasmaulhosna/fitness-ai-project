interface Props {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function AuthInput({
  label,
  type,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-slate-200">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
        w-full
        rounded-xl
        border
        border-white/10
        bg-white/5

        px-4
        py-3

        text-white

        placeholder:text-slate-500

        focus:border-emerald-500
        focus:ring-2
        focus:ring-emerald-500/20
        outline-none
        "
      />

    </div>
  );
}