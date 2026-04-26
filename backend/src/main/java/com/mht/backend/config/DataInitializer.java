package com.mht.backend.config;

import com.mht.backend.model.Appointment;
import com.mht.backend.model.AppointmentStatus;
import com.mht.backend.model.MedicalRecord;
import com.mht.backend.model.Prescription;
import com.mht.backend.model.Role;
import com.mht.backend.model.TreatmentStatus;
import com.mht.backend.model.User;
import com.mht.backend.repository.AppointmentRepository;
import com.mht.backend.repository.MedicalRecordRepository;
import com.mht.backend.repository.PrescriptionRepository;
import com.mht.backend.repository.UserRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final AppointmentRepository appointmentRepository;

    @Bean
    CommandLineRunner seedData() {
        return args -> {
            if (userRepository.count() > 0) {
                return;
            }

            User aarav = patient("PAT001", "Aarav Kapoor", 34, "Male", "O+", "Hypertension", "Penicillin",
                    "aarav.kapoor@mht.app", "+91 98100 12001", "14 Palm Residency, New Delhi",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80");
            User diya = patient("PAT002", "Diya Reddy", 28, "Female", "A+", "Eczema", "Dust",
                    "diya.reddy@mht.app", "+91 98100 12002", "18 Lakeview Enclave, Hyderabad",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80");
            User ishaan = patient("PAT003", "Ishaan Malhotra", 42, "Male", "B+", "Type 2 Diabetes", "None",
                    "ishaan.malhotra@mht.app", "+91 98100 12003", "22 Green Park, Gurgaon",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80");
            User myra = patient("PAT004", "Myra Joshi", 31, "Female", "AB-", "Migraine", "Shellfish",
                    "myra.joshi@mht.app", "+91 98100 12004", "9 Rose Avenue, Pune",
                    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=320&q=80");
            User vihaan = patient("PAT005", "Vihaan Nair", 19, "Male", "O-", "Acne", "Peanuts",
                    "vihaan.nair@mht.app", "+91 98100 12005", "4 Riverwalk, Kochi",
                    "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=320&q=80");
            User sana = patient("PAT006", "Sana Mirza", 37, "Female", "B-", "Asthma", "Ibuprofen",
                    "sana.mirza@mht.app", "+91 98100 12006", "7 Horizon Towers, Mumbai",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=320&q=80");
            User kabir = patient("PAT007", "Kabir Sen", 46, "Male", "A-", "Arthritis", "Latex",
                    "kabir.sen@mht.app", "+91 98100 12007", "33 Orchard Lane, Bengaluru",
                    "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=320&q=80");

            User anika = doctor("DOC001", "Dr. Anika Sharma", "Cardiologist", 14, "HeartCare Centre",
                    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=320&q=80");
            User rohan = doctor("DOC002", "Dr. Rohan Mehta", "Dermatologist", 9, "SkinCare Clinic",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=320&q=80");
            User neel = doctor("DOC003", "Dr. Neel Banerjee", "General Physician", 11, "Wellness Point",
                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=320&q=80");

            userRepository.saveAll(List.of(aarav, diya, ishaan, myra, vihaan, sana, kabir, anika, rohan, neel));

            MedicalRecord aaravInitial = record(aarav, anika, "Cardiology Review", "Stage 1 Hypertension",
                    "Lifestyle changes and regular monitoring advised.", LocalDate.of(2025, 2, 11), TreatmentStatus.ACTIVE);
            MedicalRecord aaravFollowUp = record(aarav, anika, "Treatment Follow-up", "Blood pressure responding well",
                    "Continue low sodium diet and evening walks.", LocalDate.of(2025, 4, 4), TreatmentStatus.STABLE);
            MedicalRecord diyaReview = record(diya, rohan, "Dermatology Review", "Chronic eczema flare",
                    "Prescribed topical corticosteroid and hydration routine.", LocalDate.of(2025, 4, 2), TreatmentStatus.ACTIVE);
            MedicalRecord vihaanReview = record(vihaan, rohan, "Skin Assessment", "Moderate inflammatory acne",
                    "Started retinoid and antibacterial regimen.", LocalDate.of(2025, 4, 10), TreatmentStatus.ACTIVE);
            MedicalRecord ishaanReview = record(ishaan, neel, "Metabolic Assessment", "Elevated HbA1c",
                    "Added glucose tracking with dietary counseling.", LocalDate.of(2025, 3, 1), TreatmentStatus.ACTIVE);
            MedicalRecord myraReview = record(myra, neel, "Neurology Referral", "Recurring migraine episodes",
                    "Track triggers and reduce screen-time strain.", LocalDate.of(2025, 1, 18), TreatmentStatus.STABLE);
            MedicalRecord sanaReview = record(sana, neel, "Respiratory Review", "Mild persistent asthma",
                    "Maintained inhaler protocol with seasonal precautions.", LocalDate.of(2025, 2, 24), TreatmentStatus.STABLE);
            MedicalRecord kabirReview = record(kabir, anika, "Pain Management Review", "Inflammatory arthritis pain",
                    "Physical therapy and mobility strengthening plan.", LocalDate.of(2025, 3, 20), TreatmentStatus.ACTIVE);

            medicalRecordRepository.saveAll(List.of(
                    aaravInitial, aaravFollowUp, diyaReview, vihaanReview,
                    ishaanReview, myraReview, sanaReview, kabirReview
            ));

            prescriptionRepository.saveAll(List.of(
                    prescription(aarav, anika, aaravInitial, "Amlodipine", "5mg once daily",
                            "Take every morning after breakfast.", 30, LocalDate.of(2025, 2, 11)),
                    prescription(aarav, anika, aaravFollowUp, "Telmisartan", "40mg once daily",
                            "Continue for 30 days and record BP weekly.", 30, LocalDate.of(2025, 4, 4)),
                    prescription(diya, rohan, diyaReview, "Hydrocortisone Cream", "Apply twice daily",
                            "Use on affected areas for 10 days.", 10, LocalDate.of(2025, 4, 2)),
                    prescription(vihaan, rohan, vihaanReview, "Adapalene Gel", "Apply nightly",
                            "Apply a pea-sized amount after cleansing.", 45, LocalDate.of(2025, 4, 10)),
                    prescription(ishaan, neel, ishaanReview, "Metformin", "500mg twice daily",
                            "Take with meals and keep sugar log.", 60, LocalDate.of(2025, 3, 1))
            ));

            appointmentRepository.saveAll(List.of(
                    appointment(aarav, anika, "Hypertension follow-up", "HeartCare Centre", LocalDateTime.of(2025, 5, 8, 10, 30), AppointmentStatus.SCHEDULED, "Bring BP diary."),
                    appointment(diya, rohan, "Eczema review", "SkinCare Clinic", LocalDateTime.of(2025, 4, 18, 16, 0), AppointmentStatus.SCHEDULED, "Patch test discussion."),
                    appointment(vihaan, rohan, "Acne 6-week review", "SkinCare Clinic", LocalDateTime.of(2025, 4, 30, 17, 30), AppointmentStatus.SCHEDULED, "Assess skin tolerance."),
                    appointment(ishaan, neel, "Diabetes care plan", "Wellness Point", LocalDateTime.of(2025, 4, 12, 11, 15), AppointmentStatus.COMPLETED, "Reviewed meal adherence."),
                    appointment(sana, neel, "Asthma seasonal check", "Wellness Point", LocalDateTime.of(2025, 6, 3, 9, 45), AppointmentStatus.SCHEDULED, "Inhaler technique review."),
                    appointment(kabir, anika, "Mobility reassessment", "HeartCare Centre", LocalDateTime.of(2025, 5, 20, 14, 0), AppointmentStatus.SCHEDULED, "Discuss pain score changes.")
            ));
        };
    }

    private User patient(String id, String name, int age, String gender, String bloodType, String condition,
                         String allergy, String email, String phone, String address, String avatarUrl) {
        return User.builder()
                .id(id)
                .role(Role.PATIENT)
                .fullName(name)
                .age(age)
                .gender(gender)
                .bloodType(bloodType)
                .conditions(List.of(condition))
                .allergies("None".equalsIgnoreCase(allergy) ? List.of() : List.of(allergy))
                .email(email)
                .phone(phone)
                .address(address)
                .avatarUrl(avatarUrl)
                .build();
    }

    private User doctor(String id, String name, String specialization, int yearsExperience, String clinicName, String avatarUrl) {
        return User.builder()
                .id(id)
                .role(Role.DOCTOR)
                .fullName(name)
                .specialization(specialization)
                .yearsExperience(yearsExperience)
                .clinicName(clinicName)
                .email(name.toLowerCase().replace(" ", ".").replace("dr.", "dr") + "@mht.app")
                .phone("+91 98200 " + id.substring(id.length() - 3))
                .avatarUrl(avatarUrl)
                .build();
    }

    private MedicalRecord record(User patient, User doctor, String title, String diagnosis, String notes, LocalDate date, TreatmentStatus status) {
        return MedicalRecord.builder()
                .patient(patient)
                .doctor(doctor)
                .title(title)
                .diagnosis(diagnosis)
                .notes(notes)
                .visitDate(date)
                .status(status)
                .build();
    }

    private Prescription prescription(User patient, User doctor, MedicalRecord record, String medicationName,
                                      String dosage, String instructions, int durationDays, LocalDate issuedDate) {
        return Prescription.builder()
                .patient(patient)
                .doctor(doctor)
                .medicalRecord(record)
                .medicationName(medicationName)
                .dosage(dosage)
                .instructions(instructions)
                .durationDays(durationDays)
                .issuedDate(issuedDate)
                .build();
    }

    private Appointment appointment(User patient, User doctor, String title, String location,
                                    LocalDateTime appointmentDateTime, AppointmentStatus status, String notes) {
        return Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .title(title)
                .location(location)
                .appointmentDateTime(appointmentDateTime)
                .status(status)
                .notes(notes)
                .build();
    }
}
