package com.example.coworking.service;

import com.example.coworking.model.Reservation;
import com.example.coworking.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    public boolean isReservationAvailable(LocalDateTime start, LocalDateTime endTime) {
        List<Reservation> reservations = repository.findAllByStartBetween(start, endTime);
        return reservations.isEmpty();
    }

    public List<Reservation> getReservationsForWeek(LocalDateTime startOfWeek) {
        LocalDateTime endOfWeek = startOfWeek.plusDays(7);
        return repository.findAllByStartBetween(startOfWeek, endOfWeek);
    }
}
