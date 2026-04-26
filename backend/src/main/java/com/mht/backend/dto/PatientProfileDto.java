package com.mht.backend.dto;

import java.util.List;

public record PatientProfileDto(
        UserSummaryDto patient,
        List<MedicalRecordDto> medicalHistory,
        List<PrescriptionDto> prescriptions,
        List<AppointmentDto> appointments
) {
}
