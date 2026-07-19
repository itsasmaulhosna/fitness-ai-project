import { ReactNode } from "react";

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
}

export default function FeatureItem({
  icon,
  title,
}: FeatureItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div>{icon}</div>

      <span className="text-slate-200">{title}</span>
    </div>
  );
}