package com.wellness.repository;

import com.wellness.entity.MoodEntry;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {
    Page<MoodEntry> findByUserIdAndNoteContainingIgnoreCase(Long userId, String note, Pageable pageable);
    Page<MoodEntry> findByNoteContainingIgnoreCase(String note, Pageable pageable);
}
