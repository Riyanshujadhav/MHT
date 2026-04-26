import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { CircleCheckBig, Pill } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { NoirCard } from "../../components/ui/NoirCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatters";

export function DoctorPrescriptionsPage() {
  const { session } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [recordsByPatient, setRecordsByPatient] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    patientId: "PAT002",
    medicalRecordId: "",
    medicationName: "",
    dosage: "",
    instructions: "",
    durationDays: 14,
  });

  useEffect(() => {
    Promise.all([
      api.get(`/doctors/${session.userId}`),
      api.get("/prescriptions"),
    ]).then(async ([dashboardResponse, prescriptionsResponse]) => {
      const nextDashboard = dashboardResponse.data;
      setDashboard(nextDashboard);
      setPrescriptions(prescriptionsResponse.data.filter((item) => item.doctor.id === session.userId));

      const entries = await Promise.all(
        nextDashboard.patients.map(async (patient) => {
          const response = await api.get(`/patients/${patient.id}/records`);
          return [patient.id, response.data];
        }),
      );
      const recordMap = Object.fromEntries(entries);
      setRecordsByPatient(recordMap);

      const firstPatientId = nextDashboard.patients[0]?.id ?? "";
      const firstRecordId = recordMap[firstPatientId]?.[0]?.id ?? "";
      setForm((current) => ({
        ...current,
        patientId: firstPatientId,
        medicalRecordId: firstRecordId,
      }));
    });
  }, [session.userId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      ...form,
      doctorId: session.userId,
      durationDays: Number(form.durationDays),
      medicalRecordId: Number(form.medicalRecordId),
    };
    const response = await api.post("/prescriptions", payload);
    setPrescriptions((current) => [response.data, ...current]);
    setShowModal(true);
    setForm((current) => ({
      ...current,
      medicationName: "",
      dosage: "",
      instructions: "",
      durationDays: 14,
    }));
  }

  const availableRecords = recordsByPatient[form.patientId] ?? [];

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <NoirCard>
        <h1 className="text-3xl font-extrabold text-white">Issue Prescription</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Create a new prescription tied to a specific patient record.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Field label="Patient">
            <select
              value={form.patientId}
              onChange={(event) => {
                const patientId = event.target.value;
                const firstRecordId = recordsByPatient[patientId]?.[0]?.id ?? "";
                setForm((current) => ({
                  ...current,
                  patientId,
                  medicalRecordId: firstRecordId,
                }));
              }}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none"
            >
              {dashboard?.patients.map((patient) => (
                <option key={patient.id} value={patient.id} className="bg-surface">
                  {patient.fullName} ({patient.id})
                </option>
              ))}
            </select>
          </Field>

          <Field label="Medical record">
            <select
              value={form.medicalRecordId}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  medicalRecordId: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none"
            >
              {availableRecords.map((record) => (
                <option key={record.id} value={record.id} className="bg-surface">
                  {record.diagnosis}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Medication">
            <input
              value={form.medicationName}
              onChange={(event) =>
                setForm((current) => ({ ...current, medicationName: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none"
              placeholder="e.g. Clindamycin Gel"
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Dosage">
              <input
                value={form.dosage}
                onChange={(event) =>
                  setForm((current) => ({ ...current, dosage: event.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none"
                placeholder="Apply nightly"
                required
              />
            </Field>
            <Field label="Duration (days)">
              <input
                type="number"
                min="1"
                value={form.durationDays}
                onChange={(event) =>
                  setForm((current) => ({ ...current, durationDays: event.target.value }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none"
                required
              />
            </Field>
          </div>

          <Field label="Instructions">
            <textarea
              value={form.instructions}
              onChange={(event) =>
                setForm((current) => ({ ...current, instructions: event.target.value }))
              }
              className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none"
              placeholder="Usage instructions"
              required
            />
          </Field>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald px-4 py-3 font-bold text-black transition hover:brightness-110"
          >
            Issue prescription
          </button>
        </form>
      </NoirCard>

      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Recent prescriptions</h2>
          <p className="mt-2 text-zinc-400">The most recent prescriptions you have issued.</p>
        </div>

        {prescriptions.map((prescription) => (
          <NoirCard key={prescription.id}>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/12 text-emerald">
                <Pill size={24} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{prescription.medicationName}</h3>
                    <div className="mt-1 text-zinc-400">
                      {prescription.patient.fullName} · {prescription.patient.id}
                    </div>
                  </div>
                  <StatusBadge>{formatDate(prescription.issuedDate)}</StatusBadge>
                </div>
                <div className="mt-4 text-zinc-300">{prescription.dosage}</div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {prescription.instructions}
                </p>
              </div>
            </div>
          </NoirCard>
        ))}
      </div>

      <Dialog open={showModal} onClose={setShowModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-[2rem] border border-emerald/30 bg-surface p-8 shadow-emerald">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald/15 text-emerald">
              <CircleCheckBig size={32} />
            </div>
            <DialogTitle className="mt-5 text-3xl font-extrabold text-white">
              Prescription issued
            </DialogTitle>
            <p className="mt-3 text-zinc-400">
              The patient record has been updated in the demo database.
            </p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-6 w-full rounded-2xl bg-emerald px-4 py-3 font-bold text-black"
            >
              Close
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      {children}
    </label>
  );
}
