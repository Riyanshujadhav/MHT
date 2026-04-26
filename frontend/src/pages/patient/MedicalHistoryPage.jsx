import { Clock3, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { EmptyState } from "../../components/ui/EmptyState";
import { NoirCard } from "../../components/ui/NoirCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatters";

export function MedicalHistoryPage() {
  const { session } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get(`/patients/${session.userId}/records`).then((response) => setRecords(response.data));
  }, [session.userId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-white">Medical History</h1>
        <p className="mt-2 text-zinc-400">A clear timeline of consultations and care decisions.</p>
      </div>

      {records.length === 0 ? (
        <EmptyState title="No records yet" body="Medical visits and diagnoses will appear here." />
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <NoirCard key={record.id} className="grid gap-4 md:grid-cols-[auto_1fr]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/12 text-emerald">
                <Clock3 size={28} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">{record.diagnosis}</h2>
                  <StatusBadge>{record.status}</StatusBadge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  <span>{formatDate(record.visitDate)}</span>
                  <span className="inline-flex items-center gap-2">
                    <Stethoscope size={16} className="text-emerald" />
                    {record.doctor.fullName}
                  </span>
                </div>
                <p className="mt-4 text-zinc-300">{record.notes}</p>
              </div>
            </NoirCard>
          ))}
        </div>
      )}
    </div>
  );
}
