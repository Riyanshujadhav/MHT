import { CalendarClock, Clock3, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { EmptyState } from "../../components/ui/EmptyState";
import { NoirCard } from "../../components/ui/NoirCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { formatDateTime, formatMonthDay } from "../../utils/formatters";

export function AppointmentsPage() {
  const { session } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get(`/patients/${session.userId}/appointments`).then((response) => setAppointments(response.data));
  }, [session.userId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-white">Appointments</h1>
        <p className="mt-2 text-zinc-400">Your scheduled follow-ups and clinic visits.</p>
      </div>

      {appointments.length === 0 ? (
        <EmptyState title="No appointments yet" body="Booked visits will appear here." />
      ) : (
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
                      <h2 className="text-2xl font-bold text-white">{appointment.title}</h2>
                      <StatusBadge>{appointment.status}</StatusBadge>
                    </div>
                    <div className="mt-2 text-zinc-300">{appointment.doctor.fullName}</div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarClock size={15} />
                        {formatDateTime(appointment.appointmentDateTime)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={15} />
                        {appointment.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={15} className="text-emerald" />
                    {new Intl.DateTimeFormat("en-IN", { timeStyle: "short" }).format(new Date(appointment.appointmentDateTime))}
                  </span>
                </div>
              </NoirCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
