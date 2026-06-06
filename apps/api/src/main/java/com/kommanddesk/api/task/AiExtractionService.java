package com.kommanddesk.api.task;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class AiExtractionService {

    @Value("${anthropic.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<TaskDTO> extractTasks(String note) throws Exception {
        String prompt = """
                You are a task extraction assistant. Given a messy note, extract structured tasks.
                
                Return ONLY a valid JSON array with no explanation, no markdown, no code blocks.
                Each task must have these exact fields:
                - title (string)
                - category (one of: LeetCode, Google AI Cert, Gym, Volleyball, Career, AI Projects, Personal Admin, Other)
                - priority (one of: low, medium, high)
                - estimatedEffortMinutes (number)
                - suggestedDueDate (string in YYYY-MM-DD format or null)
                - status (always "suggested")
                - sourceText (the relevant part of the original note)
                - mode (always "private")
                
                Note to extract from:
                """ + note;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", "2023-06-01");

        Map<String, Object> requestBody = Map.of(
            "model", "claude-haiku-4-5",
            "max_tokens", 1024,
            "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            "https://api.anthropic.com/v1/messages",
            HttpMethod.POST,
            request,
            Map.class
        );

        Map<String, Object> responseBody = response.getBody();
        List<Map<String, Object>> content = (List<Map<String, Object>>) responseBody.get("content");
        String text = (String) content.get(0).get("text");

        // Strip markdown code blocks if present
        text = text.strip();
        if (text.startsWith("```")) {
            text = text.replaceAll("^```[a-z]*\\n?", "").replaceAll("```$", "").strip();
        }

        return objectMapper.readValue(text, new TypeReference<List<TaskDTO>>() {});
    }
}