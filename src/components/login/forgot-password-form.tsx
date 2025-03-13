"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    setFormIsValid(email.includes("@"));
  }, [email]);
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 text-foreground">
          Forgot your password?
        </h1>
        <p className="text-lg text-foreground">
          Enter your email address and we&apos;ll send you a link to reset your
          password
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

        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={!formIsValid}
        >
          Reset Password
        </Button>
      </form>

      <div className="mt-6 flex justify-between">
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/sign-in">Back to login</Link>
        </Button>

        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/register">Don&apos;t have an account?</Link>
        </Button>
      </div>
    </div>
  );
}
