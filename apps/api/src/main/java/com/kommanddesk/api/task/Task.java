package com.kommanddesk.api.task;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;
    private String priority;
    private Integer estimatedEffortMinutes;
    private String suggestedDueDate;
    private String status;
    private String sourceText;
    private String mode;
}