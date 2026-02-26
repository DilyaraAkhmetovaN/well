package com.wellness.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class MoodDtos {
    public record MoodRequest(
            @NotNull @Min(1) @Max(10) Integer moodScore,
            @Size(max = 500) String note,
            @NotNull LocalDate entryDate
    ) {}

    public record MoodResponse(Long id, Integer moodScore, String note, LocalDate entryDate, String userEmail) {}
}
