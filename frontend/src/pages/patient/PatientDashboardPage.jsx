import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Activity, AlertCircle, HeartPulse, ShieldPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { NoirCard } from "../../components/ui/NoirCard";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAuth } from "../../context/AuthContext";

export function PatientDashboardPage() {
  const { session } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/patients/${session.userId}`).then((response) => setData(response.data));
  }, [session.userId]);

  if (!data) {
    return <div className="text-zinc-400">Loading patient profile...</div>;
  }

  const patient = data.patient;
  const activeTreatments = data.medicalHistory.filter((record) => record.status === "ACTIVE").length;

  return (
    <div className="space-y-8">
      <NoirCard className="overflow-hidden p-0">
        <div className="grid gap-8 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),transparent_48%)] px-6 py-8 md:grid-cols-[140px_1fr] md:px-8">
          <img
            src={patient.avatarUrl}
            alt={patient.fullName}
            className="h-28 w-28 rounded-full object-cover ring-2 ring-emerald/55"
          />
          <div>
            <div className="text-sm uppercase tracking-[0.35em] text-emerald">
              Welcome back
            </div>
            <h1 className="mt-2 text-4xl font-extrabold text-white">
              {patient.fullName}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <StatusBadge>{patient.id}</StatusBadge>
              <span>{patient.age} yrs</span>
              <span>{patient.gender}</span>
              <span>Blood type {patient.bloodType}</span>
            </div>
          </div>
        </div>
      </NoirCard>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={HeartPulse} label="Treatments" value={data.medicalHistory.length} />
        <StatCard icon={ShieldPlus} label="Active" value={activeTreatments} />
        <StatCard icon={Activity} label="Prescriptions" value={data.prescriptions.length} />
      </div>

      <Tab.Group>
        <Tab.List className="flex flex-wrap gap-3">
          {["Profile", "Conditions", "Alerts"].map((label) => (
            <Tab
              key={label}
              className={({ selected }) =>
                clsx(
                  "rounded-2xl border px-4 py-2 text-sm font-semibold outline-none transition",
                  selected
                    ? "border-emerald/40 bg-emerald/12 text-emerald shadow-emerald"
                    : "border-white/10 bg-white/[0.03] text-zinc-400",
                )
              }
            >
              {label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <NoirCard className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                  Contact
                </div>
                <div className="mt-3 space-y-2 text-zinc-200">
                  <div>{patient.phone}</div>
                  <div>{patient.email}</div>
                  <div>{patient.address}</div>
                </div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                  Snapshot
                </div>
                <div className="mt-3 space-y-2 text-zinc-200">
                  <div>Primary doctor: {data.medicalHistory[0]?.doctor.fullName}</div>
                  <div>Latest diagnosis: {data.medicalHistory[0]?.diagnosis}</div>
                  <div>Upcoming visits: {data.appointments.filter((item) => item.status === "SCHEDULED").length}</div>
                </div>
              </div>
            </NoirCard>
          </Tab.Panel>
          <Tab.Panel>
            <NoirCard>
              <div className="flex flex-wrap gap-2">
                {patient.conditions.map((condition) => (
                  <StatusBadge key={condition}>{condition}</StatusBadge>
                ))}
              </div>
            </NoirCard>
          </Tab.Panel>
          <Tab.Panel>
            <NoirCard className="space-y-4">
              <div>
                <div className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-500">
                  Allergies
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.length ? (
                    patient.allergies.map((item) => <StatusBadge key={item}>{item}</StatusBadge>)
                  ) : (
                    <StatusBadge tone="slate">No known allergies</StatusBadge>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-4 text-sm text-amber-100">
                <AlertCircle className="mb-2 text-amber-300" size={18} />
                Keep your medical history current before each follow-up to help doctors assess changes faster.
              </div>
            </NoirCard>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
