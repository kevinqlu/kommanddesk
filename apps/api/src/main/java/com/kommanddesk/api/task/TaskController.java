package com.kommanddesk.api.task;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {"http://localhost:3000", "https://kommanddesk.vercel.app"})
public class TaskController {

    private final TaskService taskService;
    private final AiExtractionService aiExtractionService;


    public TaskController(TaskService taskService, AiExtractionService aiExtractionService) {
    this.taskService = taskService;
    this.aiExtractionService = aiExtractionService;
}

    @PostMapping("/extract")
    public ResponseEntity<?> extractTasks(@RequestBody Map<String, String> body) {
        try {
            String note = body.get("note");
            if (note == null || note.isBlank()) {
                return ResponseEntity.badRequest().body("Note cannot be empty");
            }
            List<TaskDTO> tasks = aiExtractionService.extractTasks(note);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("AI extraction failed: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskDTO dto) {
        Task saved = taskService.saveTask(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }
}
