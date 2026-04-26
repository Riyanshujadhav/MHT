import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { DoctorAppointmentsPage } from "./pages/doctor/DoctorAppointmentsPage";
import { DoctorDashboardPage } from "./pages/doctor/DoctorDashboardPage";
import { DoctorPatientsPage } from "./pages/doctor/DoctorPatientsPage";
import { DoctorPrescriptionsPage } from "./pages/doctor/DoctorPrescriptionsPage";
import { AppointmentsPage } from "./pages/patient/AppointmentsPage";
import { MedicalHistoryPage } from "./pages/patient/MedicalHistoryPage";
import { PatientDashboardPage } from "./pages/patient/PatientDashboardPage";
import { PatientPrescriptionsPage } from "./pages/patient/PatientPrescriptionsPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute role="PATIENT" />}>
        <Route element={<AppLayout />}>
          <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
          <Route path="/patient/history" element={<MedicalHistoryPage />} />
          <Route path="/patient/prescriptions" element={<PatientPrescriptionsPage />} />
          <Route path="/patient/appointments" element={<AppointmentsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="DOCTOR" />}>
        <Route element={<AppLayout />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
          <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
          <Route path="/doctor/prescriptions" element={<DoctorPrescriptionsPage />} />
          <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
