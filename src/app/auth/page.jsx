import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const Login = () => {
  return (
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
            <a
              href="#"
              className="text-sm text-primary hover:underline font-medium"
            >
              Forgot password?
            </a>
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
  );
};

export default Login;
