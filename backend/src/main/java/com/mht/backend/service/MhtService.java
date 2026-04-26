package com.mht.backend.service;

import com.mht.backend.dto.AppointmentDto;
import com.mht.backend.dto.CreatePrescriptionRequest;
import com.mht.backend.dto.DoctorDashboardDto;
import com.mht.backend.dto.MedicalRecordDto;
import com.mht.backend.dto.PatientProfileDto;
import com.mht.backend.dto.PrescriptionDto;
import com.mht.backend.dto.UserSummaryDto;
import com.mht.backend.model.Appointment;
import com.mht.backend.model.MedicalRecord;
import com.mht.backend.model.Prescription;
import com.mht.backend.model.Role;
import com.mht.backend.model.User;
import com.mht.backend.repository.AppointmentRepository;
import com.mht.backend.repository.MedicalRecordRepository;
import com.mht.backend.repository.PrescriptionRepository;
import com.mht.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MhtService {

    private final UserRepository userRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final AppointmentRepository appointmentRepository;

    public List<UserSummaryDto> getPatients() {
        return userRepository.findByRole(Role.PATIENT).stream().map(this::toUserSummary).toList();
    }

    public List<UserSummaryDto> getDoctors() {
        return userRepository.findByRole(Role.DOCTOR).stream().map(this::toUserSummary).toList();
    }

    public PatientProfileDto getPatientProfile(String patientId) {
        User patient = getUser(patientId);
        return new PatientProfileDto(
                toUserSummary(patient),
                medicalRecordRepository.findByPatientIdOrderByVisitDateDesc(patientId).stream().map(this::toMedicalRecordDto).toList(),
                prescriptionRepository.findByPatientIdOrderByIssuedDateDesc(patientId).stream().map(this::toPrescriptionDto).toList(),
                appointmentRepository.findByPatientIdOrderByAppointmentDateTimeAsc(patientId).stream().map(this::toAppointmentDto).toList()
        );
    }

    public DoctorDashboardDto getDoctorDashboard(String doctorId) {
        User doctor = getUser(doctorId);
        List<PrescriptionDto> prescriptions = prescriptionRepository.findByDoctorIdOrderByIssuedDateDesc(doctorId).stream()
                .map(this::toPrescriptionDto)
                .toList();
        List<AppointmentDto> appointments = appointmentRepository.findByDoctorIdOrderByAppointmentDateTimeAsc(doctorId).stream()
                .map(this::toAppointmentDto)
                .toList();
        List<UserSummaryDto> patients = medicalRecordRepository.findByDoctorIdOrderByVisitDateDesc(doctorId).stream()
                .map(MedicalRecord::getPatient)
                .distinct()
                .map(this::toUserSummary)
                .toList();

        long upcoming = appointments.stream()
                .filter(appointment -> appointment.status().name().equals("SCHEDULED"))
                .count();

        return new DoctorDashboardDto(
                toUserSummary(doctor),
                patients.size(),
                prescriptions.size(),
                (int) upcoming,
                patients,
                appointments,
                prescriptions
        );
    }

    public List<MedicalRecordDto> getPatientRecords(String patientId) {
        return medicalRecordRepository.findByPatientIdOrderByVisitDateDesc(patientId).stream().map(this::toMedicalRecordDto).toList();
    }

    public List<AppointmentDto> getPatientAppointments(String patientId) {
        return appointmentRepository.findByPatientIdOrderByAppointmentDateTimeAsc(patientId).stream().map(this::toAppointmentDto).toList();
    }

    public List<AppointmentDto> getDoctorAppointments(String doctorId) {
        return appointmentRepository.findByDoctorIdOrderByAppointmentDateTimeAsc(doctorId).stream().map(this::toAppointmentDto).toList();
    }

    public List<PrescriptionDto> getPrescriptions() {
        return prescriptionRepository.findAll().stream().map(this::toPrescriptionDto).toList();
    }

    public List<PrescriptionDto> getPatientPrescriptions(String patientId) {
        return prescriptionRepository.findByPatientIdOrderByIssuedDateDesc(patientId).stream().map(this::toPrescriptionDto).toList();
    }

    @Transactional
    public PrescriptionDto createPrescription(CreatePrescriptionRequest request) {
        User patient = getUser(request.patientId());
        User doctor = getUser(request.doctorId());
        MedicalRecord record = medicalRecordRepository.findById(request.medicalRecordId())
                .orElseThrow(() -> new EntityNotFoundException("Medical record not found"));

        Prescription prescription = Prescription.builder()
                .patient(patient)
                .doctor(doctor)
                .medicalRecord(record)
                .medicationName(request.medicationName())
                .dosage(request.dosage())
                .instructions(request.instructions())
                .durationDays(request.durationDays())
                .issuedDate(LocalDate.now())
                .build();

        return toPrescriptionDto(prescriptionRepository.save(prescription));
    }

    public User getUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));
    }

    public UserSummaryDto toUserSummary(User user) {
        return new UserSummaryDto(
                user.getId(),
                user.getRole(),
                user.getFullName(),
                user.getAge(),
                user.getGender(),
                user.getBloodType(),
                user.getPhone(),
                user.getEmail(),
                user.getAddress(),
                user.getSpecialization(),
                user.getYearsExperience(),
                user.getClinicName(),
                user.getAvatarUrl(),
                user.getConditions(),
                user.getAllergies()
        );
    }

    private MedicalRecordDto toMedicalRecordDto(MedicalRecord record) {
        return new MedicalRecordDto(
                record.getId(),
                record.getTitle(),
                record.getDiagnosis(),
                record.getNotes(),
                record.getVisitDate(),
                record.getStatus(),
                toUserSummary(record.getPatient()),
                toUserSummary(record.getDoctor())
        );
    }

    private PrescriptionDto toPrescriptionDto(Prescription prescription) {
        return new PrescriptionDto(
                prescription.getId(),
                prescription.getMedicationName(),
                prescription.getDosage(),
                prescription.getInstructions(),
                prescription.getDurationDays(),
                prescription.getIssuedDate(),
                prescription.getMedicalRecord().getId(),
                toUserSummary(prescription.getPatient()),
                toUserSummary(prescription.getDoctor())
        );
    }

    private AppointmentDto toAppointmentDto(Appointment appointment) {
        return new AppointmentDto(
                appointment.getId(),
                appointment.getTitle(),
                appointment.getLocation(),
                appointment.getAppointmentDateTime(),
                appointment.getStatus(),
                appointment.getNotes(),
                toUserSummary(appointment.getPatient()),
                toUserSummary(appointment.getDoctor())
        );
    }
}
