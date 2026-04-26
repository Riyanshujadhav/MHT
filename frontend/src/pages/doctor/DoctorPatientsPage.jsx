import { Search, UserRound } from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";
import { api } from "../../api/client";
import { NoirCard } from "../../components/ui/NoirCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAuth } from "../../context/AuthContext";

export function DoctorPatientsPage() {
  const { session } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    api.get(`/doctors/${session.userId}`).then((response) => setDashboard(response.data));
  }, [session.userId]);

  if (!dashboard) {
    return <div className="text-zinc-400">Loading assigned patients...</div>;
  }

  const filteredPatients = dashboard.patients.filter((patient) => {
    const value = deferredQuery.trim().toLowerCase();
    return (
      patient.fullName.toLowerCase().includes(value) ||
      patient.id.toLowerCase().includes(value) ||
      patient.conditions.join(" ").toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-white">Patient List</h1>
          <p className="mt-2 text-zinc-400">Search your currently assigned patients.</p>
        </div>
        <label className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <Search size={18} className="text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, ID, or condition"
            className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
          />
        </label>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {filteredPatients.map((patient) => (
          <NoirCard key={patient.id} className="flex items-start gap-4">
            <img
              src={patient.avatarUrl}
              alt={patient.fullName}
              className="h-20 w-20 rounded-full object-cover ring-1 ring-emerald/35"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-white">{patient.fullName}</h2>
                <StatusBadge>{patient.id}</StatusBadge>
              </div>
              <div className="mt-2 text-zinc-400">
                {patient.age} yrs · {patient.bloodType} · {patient.gender}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {patient.conditions.map((condition) => (
                  <StatusBadge key={condition}>{condition}</StatusBadge>
                ))}
              </div>
            </div>
            <UserRound className="text-emerald" size={20} />
          </NoirCard>
        ))}
      </div>
    </div>
  );
}
