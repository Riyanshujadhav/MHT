import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { NoirCard } from "../../components/ui/NoirCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { formatDateTime, formatMonthDay } from "../../utils/formatters";

export function DoctorAppointmentsPage() {
  const { session } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get(`/doctors/${session.userId}/appointments`).then((response) => setAppointments(response.data));
  }, [session.userId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-white">Appointments</h1>
        <p className="mt-2 text-zinc-400">Your full appointment schedule.</p>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => {
          const { month, day } = formatMonthDay(appointment.appointmentDateTime);
          return (
            <NoirCard key={appointment.id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-18 w-18 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-emerald to-emerald/60 px-4 py-3 text-black">
                  <div className="text-sm font-medium">{month}</div>
                  <div className="text-3xl font-extrabold leading-none">{day}</div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">{appointment.patient.fullName}</h2>
                    <span className="text-sm text-zinc-500">{appointment.patient.id}</span>
                  </div>
                  <div className="mt-2 text-zinc-300">{appointment.title}</div>
                  <div className="mt-2 text-sm text-zinc-500">{formatDateTime(appointment.appointmentDateTime)}</div>
                </div>
              </div>
              <StatusBadge>{appointment.status}</StatusBadge>
            </NoirCard>
          );
        })}
      </div>
    </div>
  );
}
