package com.mht.backend.controller;

import com.mht.backend.dto.CreatePrescriptionRequest;
import com.mht.backend.dto.PrescriptionDto;
import com.mht.backend.service.MhtService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final MhtService mhtService;

    @GetMapping
    public List<PrescriptionDto> getPrescriptions() {
        return mhtService.getPrescriptions();
    }

    @PostMapping
    public PrescriptionDto createPrescription(@Valid @RequestBody CreatePrescriptionRequest request) {
        return mhtService.createPrescription(request);
    }
}
