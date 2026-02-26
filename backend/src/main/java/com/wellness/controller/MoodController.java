package com.wellness.controller;

import com.wellness.dto.MoodDtos.*;
import com.wellness.service.MoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/moods")
@RequiredArgsConstructor
public class MoodController {
    private final MoodService moodService;

    @GetMapping
    public Page<MoodResponse> list(@RequestParam(defaultValue = "") String q,
                                   @RequestParam(defaultValue = "entryDate") String sortBy,
                                   @RequestParam(defaultValue = "DESC") String direction,
                                   @RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size,
                                   Authentication authentication) {
        return moodService.list(q, sortBy, direction, page, size, authentication);
    }

    @PostMapping
    public MoodResponse create(@RequestBody @Valid MoodRequest request, Authentication authentication) {
        return moodService.create(request, authentication);
    }

    @PutMapping("/{id}")
    public MoodResponse update(@PathVariable Long id, @RequestBody @Valid MoodRequest request, Authentication authentication) {
        return moodService.update(id, request, authentication);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        moodService.delete(id, authentication);
    }
}
