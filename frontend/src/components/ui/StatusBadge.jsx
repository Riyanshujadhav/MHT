import clsx from "clsx";

export function StatusBadge({ children, tone = "emerald" }) {
  const tones = {
    emerald: "border-emerald/30 bg-emerald/10 text-emerald",
    slate: "border-white/10 bg-white/5 text-zinc-300",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
