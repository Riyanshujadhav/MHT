import { Pill } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { EmptyState } from "../../components/ui/EmptyState";
import { NoirCard } from "../../components/ui/NoirCard";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatters";

export function PatientPrescriptionsPage() {
  const { session } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    api.get(`/patients/${session.userId}/prescriptions`).then((response) => setPrescriptions(response.data));
  }, [session.userId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-white">Prescriptions</h1>
        <p className="mt-2 text-zinc-400">Dosage, instructions, and prescribing doctor in one place.</p>
      </div>

      {prescriptions.length === 0 ? (
        <EmptyState title="No prescriptions" body="Issued medications will appear here." />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {prescriptions.map((prescription) => (
            <NoirCard key={prescription.id}>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/12 text-emerald">
                  <Pill size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl font-bold text-white">
                      {prescription.medicationName}
                    </h2>
                    <div className="text-sm text-zinc-500">
                      {formatDate(prescription.issuedDate)}
                    </div>
                  </div>
                  <div className="mt-2 text-zinc-300">{prescription.dosage}</div>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    {prescription.instructions}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-500">
                    <span>Doctor: {prescription.doctor.fullName}</span>
                    <span>{prescription.durationDays} day plan</span>
                  </div>
                </div>
              </div>
            </NoirCard>
          ))}
        </div>
      )}
    </div>
  );
}
