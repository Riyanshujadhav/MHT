import clsx from "clsx";

export function NoirCard({ className, children }) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/8 bg-white/[0.03] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition duration-300 hover:border-emerald/35 hover:shadow-emerald",
        className,
      )}
    >
      {children}
    </div>
  );
}
