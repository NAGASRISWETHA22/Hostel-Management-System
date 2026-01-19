import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../services/api';
import './Payment.css';

// Stripe Publishable Key
const stripePromise = loadStripe("pk_test_51SjiME3QtbZnJ1qvUmBJNtSEMAbcLiefYNh83dTsISXXRSpyomF49Ic8ZCrHYO2WbrsTAkD8bmeGXSkUWQLSaEH800I6WU7Eix");

const CheckoutForm = ({ room }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setMessage("");

        try {
            // 1. Get Client Secret from Backend
            const amountToPay = room.rentAmount || room.rent || 5000;
            const { data } = await api.post('/payment/create-payment-intent', { 
                amount: amountToPay 
            });

            if (data.error) {
                setMessage(data.error);
                setIsProcessing(false);
                return;
            }

            // 2. Confirm Payment with Stripe
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setMessage(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                
                // 3. Update Room Status to OCCUPIED in Database
                try {
                    await api.put(`/rooms/${room.id}/status?status=OCCUPIED`);
                    alert(`Payment Successful! Room No: ${room.roomNumber || room.roomNo} has been booked.`);
                    navigate('/student/dashboard');
                } catch (dbError) {
                    console.error("DB Update Error:", dbError);
                    setMessage("Payment successful, but database update failed. Please contact admin.");
                }
            }
        } catch (err) {
            setMessage("Server error. Please ensure your backend is running.");
            console.error(err);
        }
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="summary-section">
                <h3>Booking Summary</h3>
                <div className="summary-item">
                    <span>Room Number:</span>
                    <strong>{room.roomNumber || room.roomNo || "N/A"}</strong>
                </div>
                <div className="summary-item">
                    <span>Amount to Pay:</span>
                    <strong>₹{room.rentAmount || room.rent || "0"}</strong>
                </div>
            </div>
            
            <div className="card-input-container">
                <CardElement options={cardStyle} />
            </div>

            <button 
                disabled={isProcessing || !stripe} 
                className={`pay-button ${isProcessing ? 'loading' : ''}`}
            >
                {isProcessing ? "Processing..." : `Pay ₹${room.rentAmount || room.rent || "0"}`}
            </button>
            
            {message && <p className="status-message error">{message}</p>}
        </form>
    );
};

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { room } = location.state || {};

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h2 className="payment-title">Secure Payment</h2>
                {room ? (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm room={room} />
                    </Elements>
                ) : (
                    <div className="no-data">
                        <p>No room selected. Please go back.</p>
                        <button onClick={() => navigate('/student/dashboard')} className="back-btn">
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const cardStyle = {
    style: {
        base: {
            fontSize: '16px',
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            '::placeholder': { color: '#aab7c4' },
        },
        invalid: { color: '#fa755a', iconColor: '#fa755a' },
    },
};

export default Payment;