"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      email.includes("@") && password.length > 0 && password === confirmPassword
    );
  }, [email, password, confirmPassword]);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 text-foreground">
          Create an account
        </h1>
        <p className="text-lg text-foreground">
          Enter your email and password to register
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="rounded-full"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="rounded-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            className="rounded-full"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={!formIsValid}
        >
          Register
        </Button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-foreground">Already have an account? </span>
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
