"use client";

import { useRouter, usePathname } from "next/navigation";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const selected = pathname === href;

  return (
    <div
      className={`flex ${selected ? "text-[#6a51a6] cursor-default" : "text-slate-500"} cursor-pointer  p-2 pl-8`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </div>
    </div>
  );
};
