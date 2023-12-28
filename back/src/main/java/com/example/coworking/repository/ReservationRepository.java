package com.example.coworking.repository;

import com.example.coworking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDateTime;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByStartBetween(LocalDateTime start, LocalDateTime endTime);
}
