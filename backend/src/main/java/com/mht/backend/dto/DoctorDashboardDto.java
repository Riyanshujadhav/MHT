package com.mht.backend.dto;

import java.util.List;

public record DoctorDashboardDto(
        UserSummaryDto doctor,
        Integer patientsTreated,
        Integer prescriptionsIssued,
        Integer upcomingAppointments,
        List<UserSummaryDto> patients,
        List<AppointmentDto> appointments,
        List<PrescriptionDto> prescriptions
) {
}
