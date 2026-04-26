package com.mht.backend.dto;

import java.time.LocalDate;

public record PrescriptionDto(
        Long id,
        String medicationName,
        String dosage,
        String instructions,
        Integer durationDays,
        LocalDate issuedDate,
        Long medicalRecordId,
        UserSummaryDto patient,
        UserSummaryDto doctor
) {
}
