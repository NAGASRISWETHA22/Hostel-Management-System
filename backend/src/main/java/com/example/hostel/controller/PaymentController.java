package com.example.hostel.controller;

import com.example.hostel.service.RoomService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Payment", description = "Payment endpoints for Stripe integration")
@SecurityRequirement(name = "bearerAuth")
public class PaymentController {

    @Autowired
    private RoomService roomService;

    private String stripeSecretKey = "sk_test_51SjiME3QtbZnJ1qvMb1oVXB2ifPnVriJi6lwzWMsg6w8RfdjJ4za9dJIIMrb0xI1vdnDtwKAwFmctA0KRbPmSrfp00qSD7pBO4";

    @Operation(
            summary = "Create Payment Intent",
            description = "Create a Stripe payment intent for processing payments. Amount should be in the smallest currency unit (paise for INR). Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Payment intent created successfully",
                    content = @Content(schema = @Schema(implementation = Map.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Error creating payment intent",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            )
    })
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
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build())
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);
            responseData.put("clientSecret", intent.getClientSecret());
            return responseData;
        } catch (Exception e) {
            responseData.put("error", e.getMessage());
            return responseData;
        }
    }

    @Operation(
            summary = "Update Room Status After Payment",
            description = "Update room status to 'Occupied' after successful payment. Requires authentication."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Room status updated successfully",
                    content = @Content(schema = @Schema(implementation = Map.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error updating room status",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Authentication required",
                    content = @Content
            )
    })
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