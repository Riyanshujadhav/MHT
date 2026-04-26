package com.mht.backend.repository;

import com.mht.backend.model.Appointment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientIdOrderByAppointmentDateTimeAsc(String patientId);
    List<Appointment> findByDoctorIdOrderByAppointmentDateTimeAsc(String doctorId);
}
