package com.example.hostel.controller;

import com.example.hostel.service.RoomService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private RoomService roomService;

    private String stripeSecretKey = "sk_test_51SjiME3QtbZnJ1qvMb1oVXB2ifPnVriJi6lwzWMsg6w8RfdjJ4za9dJIIMrb0xI1vdnDtwKAwFmctA0KRbPmSrfp00qSD7pBO4";

    @PostMapping("/create-payment-intent")
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> data) {
        Stripe.apiKey = stripeSecretKey;
        Map<String, String> responseData = new HashMap<>();
        try {
            Long amount = Long.parseLong(data.get("amount").toString()) * 100;
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency("inr")
                    .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                    )
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);
            responseData.put("clientSecret", intent.getClientSecret());
            return responseData;
        } catch (Exception e) {
            responseData.put("error", e.getMessage());
            return responseData;
        }
    }

    @PostMapping("/update-room-status")
    public ResponseEntity<?> updateStatus(@RequestBody Map<String, String> request) {
        try {
            String roomNumber = request.get("roomNumber");
            roomService.updateRoomStatusByNumber(roomNumber, "Occupied");
            return ResponseEntity.ok().body(Map.of("message", "Status updated in DB"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}