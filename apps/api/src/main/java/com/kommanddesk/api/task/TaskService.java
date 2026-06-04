package com.kommanddesk.api.task;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task saveTask(TaskDTO dto) {
        Task task = new Task(
            null,
            dto.getTitle(),
            dto.getCategory(),
            dto.getPriority(),
            dto.getEstimatedEffortMinutes(),
            dto.getSuggestedDueDate(),
            "approved",
            dto.getSourceText(),
            dto.getMode()
        );
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}