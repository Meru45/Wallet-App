"use client";

export const Center = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-center">{children}</div>
    </div>
  );
};
