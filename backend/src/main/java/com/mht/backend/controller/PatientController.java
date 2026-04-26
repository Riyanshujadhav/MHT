package com.mht.backend.controller;

import com.mht.backend.dto.AppointmentDto;
import com.mht.backend.dto.MedicalRecordDto;
import com.mht.backend.dto.PatientProfileDto;
import com.mht.backend.dto.PrescriptionDto;
import com.mht.backend.dto.UserSummaryDto;
import com.mht.backend.service.MhtService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final MhtService mhtService;

    @GetMapping
    public List<UserSummaryDto> getPatients() {
        return mhtService.getPatients();
    }

    @GetMapping("/{patientId}")
    public PatientProfileDto getPatientProfile(@PathVariable String patientId) {
        return mhtService.getPatientProfile(patientId);
    }

    @GetMapping("/{patientId}/records")
    public List<MedicalRecordDto> getPatientRecords(@PathVariable String patientId) {
        return mhtService.getPatientRecords(patientId);
    }

    @GetMapping("/{patientId}/prescriptions")
    public List<PrescriptionDto> getPatientPrescriptions(@PathVariable String patientId) {
        return mhtService.getPatientPrescriptions(patientId);
    }

    @GetMapping("/{patientId}/appointments")
    public List<AppointmentDto> getPatientAppointments(@PathVariable String patientId) {
        return mhtService.getPatientAppointments(patientId);
    }
}
