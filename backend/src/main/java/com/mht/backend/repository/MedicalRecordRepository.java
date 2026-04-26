package com.mht.backend.repository;

import com.mht.backend.model.MedicalRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPatientIdOrderByVisitDateDesc(String patientId);
    List<MedicalRecord> findByDoctorIdOrderByVisitDateDesc(String doctorId);
}
