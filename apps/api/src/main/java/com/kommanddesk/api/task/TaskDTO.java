package com.kommanddesk.api.task;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private String title;
    private String category;
    private String priority;
    private Integer estimatedEffortMinutes;
    private String suggestedDueDate;
    private String status;
    private String sourceText;
    private String mode;
}