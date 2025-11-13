"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import OTPVerificationModal from "@/components/auth/OTPVerificationModal";
import SetNewPasswordModal from "@/components/auth/SetNewPasswordModal";
import { useAuth } from "@/components/auth/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

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

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      return;
    }
    if (loginEmail !== "admin@gmail.com" || loginPassword !== "1234") {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      login();
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.replace(redirectTo);
      setIsSubmitting(false);
    }, 700);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary to-primary text-white text-lg">
        Loading...
      </div>
    );
  }

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
          <form className="space-y-5" onSubmit={handleLogin}>
            <Input
              type="email"
              name="email"
              label="Email address"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              type={showLoginPassword ? "text" : "password"}
              name="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              rightIcon={showLoginPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              onRightIconClick={() => setShowLoginPassword(!showLoginPassword)}
              rightIconAriaLabel={showLoginPassword ? "Hide password" : "Show password"}
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
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
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

const Login = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary to-primary text-white text-lg">
        Loading...
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
};

export default Login;
