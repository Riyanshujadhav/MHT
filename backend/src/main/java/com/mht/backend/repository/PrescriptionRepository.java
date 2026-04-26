package com.mht.backend.repository;

import com.mht.backend.model.Prescription;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByPatientIdOrderByIssuedDateDesc(String patientId);
    List<Prescription> findByDoctorIdOrderByIssuedDateDesc(String doctorId);
}
