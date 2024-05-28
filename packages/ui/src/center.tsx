"use client";

export const Center = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="h-full flex flex-col justify-center">{children}</div>
    </div>
  );
};
