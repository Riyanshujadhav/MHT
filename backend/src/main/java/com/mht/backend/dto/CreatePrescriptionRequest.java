package com.mht.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePrescriptionRequest(
        @NotBlank String patientId,
        @NotBlank String doctorId,
        @NotNull Long medicalRecordId,
        @NotBlank String medicationName,
        @NotBlank String dosage,
        @NotBlank String instructions,
        @NotNull @Min(1) Integer durationDays
) {
}
