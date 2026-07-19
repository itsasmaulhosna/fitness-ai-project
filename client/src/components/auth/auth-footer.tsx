import Link from "next/link";

interface Props {
  text: string;
  link: string;
  href: string;
}

export default function AuthFooter({
  text,
  link,
  href,
}: Props) {
  return (
    <p className="text-center text-sm text-slate-400">

      {text}{" "}

      <Link
        href={href}
        className="font-semibold text-emerald-400 hover:text-emerald-300"
      >
        {link}
      </Link>

    </p>
  );
}