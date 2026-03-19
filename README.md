# Hostel Management System

A comprehensive Client-Server application for managing hostel operations, featuring a React frontend and Spring Boot backend.

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js & npm
- MySQL (via XAMPP or separate installation)

### Backend Setup
1. Navigate to the `backend` folder.
2. Create a file named `secrets.properties`.
3. Add your Stripe key to the file:
   ```properties
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the `hostel-frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```

## 🛡️ Security Note
Sensitive keys are managed via `secrets.properties` (backend) and `.env` (frontend). These files are excluded from version control for your protection. Ensure they are configured before running the app.

## 🎨 Features
- **Modern Landing Page**: High-fidelity, animated design.
- **Secure Authentication**: JWT-based login with Admin/Student roles.
- **Room Management**: Admin dashboard for hostel configuration.
- **Payment Integration**: Stripe gateway for secure transactions.
