package com.mht.backend.dto;

import com.mht.backend.model.TreatmentStatus;
import java.time.LocalDate;

public record MedicalRecordDto(
        Long id,
        String title,
        String diagnosis,
        String notes,
        LocalDate visitDate,
        TreatmentStatus status,
        UserSummaryDto patient,
        UserSummaryDto doctor
) {
}
