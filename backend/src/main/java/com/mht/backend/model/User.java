package com.mht.backend.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String fullName;

    private Integer age;
    private String gender;
    private String bloodType;
    private String phone;
    private String email;
    private String address;
    private String specialization;
    private Integer yearsExperience;
    private String clinicName;
    private String avatarUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_conditions", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "condition_name")
    @Builder.Default
    private List<String> conditions = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_allergies", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "allergy_name")
    @Builder.Default
    private List<String> allergies = new ArrayList<>();
}
