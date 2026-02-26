package com.wellness.service;

import com.wellness.dto.MoodDtos.*;
import com.wellness.entity.MoodEntry;
import com.wellness.exception.ApiException;
import com.wellness.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class MoodService {
    private final MoodEntryRepository moodEntryRepository;
    private final UserRepository userRepository;

    public MoodResponse create(MoodRequest request, Authentication auth) {
        var user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new ApiException("User not found"));

        MoodEntry saved = moodEntryRepository.save(MoodEntry.builder()
                .user(user)
                .moodScore(request.moodScore())
                .note(request.note())
                .entryDate(request.entryDate())
                .createdAt(LocalDateTime.now())
                .build());

        log.debug("Created mood entry {} for {}", saved.getId(), user.getEmail());
        return toDto(saved);
    }

    public Page<MoodResponse> list(String q, String sortBy, String direction, int page, int size, Authentication auth) {
        boolean admin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<MoodEntry> entries;
        if (admin) {
            entries = moodEntryRepository.findByNoteContainingIgnoreCase(q == null ? "" : q, pageable);
        } else {
            Long userId = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new ApiException("User not found")).getId();
            entries = moodEntryRepository.findByUserIdAndNoteContainingIgnoreCase(userId, q == null ? "" : q, pageable);
        }

        return entries.map(this::toDto);
    }

    public MoodResponse update(Long id, MoodRequest request, Authentication auth) {
        MoodEntry entry = moodEntryRepository.findById(id).orElseThrow(() -> new ApiException("Mood entry not found"));
        ensureOwnerOrAdmin(entry, auth);

        entry.setMoodScore(request.moodScore());
        entry.setNote(request.note());
        entry.setEntryDate(request.entryDate());
        moodEntryRepository.save(entry);
        return toDto(entry);
    }

    public void delete(Long id, Authentication auth) {
        MoodEntry entry = moodEntryRepository.findById(id).orElseThrow(() -> new ApiException("Mood entry not found"));
        ensureOwnerOrAdmin(entry, auth);
        moodEntryRepository.delete(entry);
    }

    private void ensureOwnerOrAdmin(MoodEntry entry, Authentication auth) {
        boolean admin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!admin && !entry.getUser().getEmail().equals(auth.getName())) {
            throw new ApiException("Access denied");
        }
    }

    private MoodResponse toDto(MoodEntry entry) {
        return new MoodResponse(entry.getId(), entry.getMoodScore(), entry.getNote(), entry.getEntryDate(), entry.getUser().getEmail());
    }
}
