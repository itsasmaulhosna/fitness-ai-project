interface Props {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">

      <h1
        className="
        text-3xl
        sm:text-4xl
        lg:text-5xl

        font-bold
        text-white
      "
      >
        {title}
      </h1>

      <p className="mt-3 text-slate-400">
        {subtitle}
      </p>

    </div>
  );
}