package com.mht.backend.controller;

import com.mht.backend.dto.AppointmentDto;
import com.mht.backend.dto.DoctorDashboardDto;
import com.mht.backend.dto.UserSummaryDto;
import com.mht.backend.service.MhtService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final MhtService mhtService;

    @GetMapping
    public List<UserSummaryDto> getDoctors() {
        return mhtService.getDoctors();
    }

    @GetMapping("/{doctorId}")
    public DoctorDashboardDto getDoctorDashboard(@PathVariable String doctorId) {
        return mhtService.getDoctorDashboard(doctorId);
    }

    @GetMapping("/{doctorId}/appointments")
    public List<AppointmentDto> getDoctorAppointments(@PathVariable String doctorId) {
        return mhtService.getDoctorAppointments(doctorId);
    }
}
