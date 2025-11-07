"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import OTPVerificationModal from "@/components/auth/OTPVerificationModal";
import SetNewPasswordModal from "@/components/auth/SetNewPasswordModal";

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleForgotPasswordNext = (userEmail) => {
    setEmail(userEmail);
    setShowForgotPassword(false);
    setShowOTP(true);
  };

  const handleOTPNext = (otp) => {
    // Verify OTP here if needed
    setShowOTP(false);
    setShowSetPassword(true);
  };

  const handlePasswordSet = (newPassword) => {
    // Handle password reset completion
    console.log("Password reset completed for:", email);
    setShowSetPassword(false);
    setEmail("");
    // Optionally show success message or redirect
    alert("Password reset successful! Please login with your new password.");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary to-primary">
        <div className="bg-background rounded-2xl shadow-lg p-8 w-full max-w-md border border-card-border">
          <div className="mb-6 text-center">
            <span className="text-3xl font-bold text-secondary">SLV</span>
            <span className="text-3xl font-bold text-primary ml-1">Ride.</span>
            <h2 className="mt-2 text-xl font-semibold text-heading">
              Sign in to your account
            </h2>
          </div>
          <form className="space-y-5">
            <Input
              type="email"
              name="email"
              label="Email address"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <div className="flex justify-end -mt-3 mb-2">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>
            <Button
              className="bg-button-bg text-button-text hover:bg-button-hover"
              variant="primary"
              fullWidth
            >
              Sign in
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted">
            Don't have an account?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Forgot Password Flow Modals */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onNext={handleForgotPasswordNext}
      />

      <OTPVerificationModal
        isOpen={showOTP}
        onClose={() => {
          setShowOTP(false);
          setEmail("");
        }}
        email={email}
        onNext={handleOTPNext}
      />

      <SetNewPasswordModal
        isOpen={showSetPassword}
        onClose={() => {
          setShowSetPassword(false);
          setEmail("");
        }}
        onComplete={handlePasswordSet}
      />
    </>
  );
};

export default Login;
