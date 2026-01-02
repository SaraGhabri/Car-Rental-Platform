    package com.poly.carrentalplatformbackend.controllers;


    import com.poly.carrentalplatformbackend.entities.Reservation;
    import com.poly.carrentalplatformbackend.entities.ReservationStatus;
    import com.poly.carrentalplatformbackend.services.ReservationService;
    import lombok.AllArgsConstructor;
    import org.springframework.security.access.prepost.PreAuthorize;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.annotation.AuthenticationPrincipal;


    import java.util.List;

    @RestController
    @AllArgsConstructor
    @RequestMapping("/api/reservations")
    @CrossOrigin("*")
    public class ReservationController {

        private ReservationService reservationService;

        // ================= CLIENT =================

        // Créer une réservation

        @PostMapping("/api/reservations/create")
        public Reservation createReservation(
                @RequestBody Reservation reservation,
                @AuthenticationPrincipal UserDetails userDetails
        ) {
            return reservationService.createReservation(reservation, userDetails.getUsername());
        }


        // Voir toutes les réservations (client / admin selon sécurité)
        @GetMapping("/")
        public List<Reservation> getAllReservations() {
            return reservationService.getReservations();
        }

        @GetMapping("/admin")
        @PreAuthorize("hasAuthority('ADMIN')")
        public List<Reservation> getAllReservationsAdmin() {
            return reservationService.getAllReservationsAdmin();
        }

        // Voir une réservation par ID
        @GetMapping("/{id}")
        public Reservation getReservation(@PathVariable int id) {
            return reservationService.getReservation(id);
        }

        // Voir les réservations d’un client
        @GetMapping("/client/{clientId}")
        public List<Reservation> getReservationsByClient(@PathVariable int clientId) {
            return reservationService.findByClientId(clientId);
        }

        // ================= ADMIN =================

        // Confirmer une réservation
        @PutMapping("/{id}/confirm")
        @PreAuthorize("hasAuthority('ADMIN')")
        public Reservation confirmReservation(@PathVariable int id) {

            Reservation reservation = reservationService.getReservation(id);

            return reservationService.updateReservationStatus(
                    reservation,
                    ReservationStatus.CONFIRMED
            );
        }

        // Annuler une réservation
        @PutMapping("/{id}/cancel")
        public Reservation cancelReservation(@PathVariable int id) {

            Reservation reservation = reservationService.getReservation(id);

            return reservationService.updateReservationStatus(
                    reservation,
                    ReservationStatus.CANCELLED
            );
        }

        // Supprimer une réservation
        @DeleteMapping("/{id}")
        @PreAuthorize("hasAuthority('ADMIN')")
        public void deleteReservation(@PathVariable int id) {
            reservationService.deleteReservation(id);
        }
        @PutMapping("/{id}/finish")
        @PreAuthorize("hasAuthority('ADMIN')")
        public Reservation finishReservation(@PathVariable int id) {
            Reservation reservation = reservationService.getReservation(id);
            return reservationService.updateReservationStatus(reservation, ReservationStatus.COMPLETED);
        }

    }
