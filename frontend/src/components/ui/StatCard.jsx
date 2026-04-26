import { NoirCard } from "./NoirCard";

export function StatCard({ icon: Icon, label, value }) {
  return (
    <NoirCard className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
        <Icon size={28} />
      </div>
      <div>
        <div className="text-4xl font-bold text-white">{value}</div>
        <div className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          {label}
        </div>
      </div>
    </NoirCard>
  );
}
