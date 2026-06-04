package com.kommanddesk.api.task;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final List<Task> taskStore = new ArrayList<>();
    private Long nextId = 1L;

    public Task saveTask(TaskDTO dto) {
        Task task = new Task(
            nextId++,
            dto.getTitle(),
            dto.getCategory(),
            dto.getPriority(),
            dto.getEstimatedEffortMinutes(),
            dto.getSuggestedDueDate(),
            "approved",
            dto.getSourceText(),
            dto.getMode()
        );
        taskStore.add(task);
        return task;
    }

    public List<Task> getAllTasks() {
        return taskStore;
    }
}