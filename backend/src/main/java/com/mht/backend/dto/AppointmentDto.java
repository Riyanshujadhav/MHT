package com.mht.backend.dto;

import com.mht.backend.model.AppointmentStatus;
import java.time.LocalDateTime;

public record AppointmentDto(
        Long id,
        String title,
        String location,
        LocalDateTime appointmentDateTime,
        AppointmentStatus status,
        String notes,
        UserSummaryDto patient,
        UserSummaryDto doctor
) {
}
