package com.mht.backend.dto;

import com.mht.backend.model.Role;
import java.util.List;

public record UserSummaryDto(
        String id,
        Role role,
        String fullName,
        Integer age,
        String gender,
        String bloodType,
        String phone,
        String email,
        String address,
        String specialization,
        Integer yearsExperience,
        String clinicName,
        String avatarUrl,
        List<String> conditions,
        List<String> allergies
) {
}
