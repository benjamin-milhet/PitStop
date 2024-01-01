package com.example.coworking.controller;

import com.example.coworking.model.Reservation;
import com.example.coworking.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/api/user/reservations")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
public class ReservationController {

    @Autowired
    private ReservationService service;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return service.getAllReservations();
    }

    @GetMapping("/available")
    @PreAuthorize("hasAuthority('READ_PRIVILEGE') and hasRole('USER')")
    public boolean isAvailable(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam("endTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return service.isReservationAvailable(start, endTime);
    }

    @PostMapping("/week")
    @PreAuthorize("hasAuthority('READ_PRIVILEGE') and hasRole('USER')")
    public List<Reservation> getReservationsForWeek(@RequestBody String startOfWeek) {
        Instant instant = Instant.parse(startOfWeek.replace("\"", ""));
        LocalDateTime start = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
        return service.getReservationsForWeek(start);
    }
}
