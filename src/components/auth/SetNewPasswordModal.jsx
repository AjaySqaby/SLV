"use client";

import { useState } from "react";
import { X, Lock, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SetNewPasswordModal({ isOpen, onClose, onComplete }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePassword = (pwd) => {
    const errors = {};
    if (pwd.length < 8) {
      errors.length = "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(pwd)) {
      errors.uppercase = "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      errors.lowercase = "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(pwd)) {
      errors.number = "Password must contain at least one number";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ match: "Passwords do not match" });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onComplete) {
        onComplete(password);
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[10000] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--green-100)] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[var(--green-600)]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Set New Password</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Please enter your new password. Make sure it's strong and secure.
          </p>

          <div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="New Password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({});
                }}
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {Object.keys(errors).length > 0 && errors.match === undefined && (
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p className="font-medium">Password must contain:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li className={password.length >= 8 ? "text-green-600" : ""}>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
                    One uppercase letter
                  </li>
                  <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>
                    One lowercase letter
                  </li>
                  <li className={/\d/.test(password) ? "text-green-600" : ""}>
                    One number
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({});
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.match && (
              <p className="mt-1 text-xs text-red-600">{errors.match}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!password || !confirmPassword || isLoading}
            >
              {isLoading ? "Setting..." : "Set Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

