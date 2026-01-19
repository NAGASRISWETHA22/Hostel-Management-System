package com.example.hostel.service;

import com.stripe.exception.StripeException;
import java.util.Map;

public interface PaymentService {
    Map<String, String> createPaymentIntent(Double amount) throws StripeException;
}