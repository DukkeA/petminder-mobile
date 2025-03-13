"use client";

import Link from "next/link";
import { Facebook, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFormIsValid(email.includes("@") && password.length > 0);
  }, [email, password]);

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Sign In</h1>
        <p className="text-lg text-foreground">
          Choose your preferred sign in method
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

        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={!formIsValid}
          onClick={() => router.push("/tasks")}
        >
          Sign In
        </Button>
      </form>

      <div className="flex justify-between mt-6 gap-4">
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2 rounded-full"
          onClick={() => router.push("/tasks")}
        >
          <GoogleIcon className="w-5 h-5" />
          Google
        </Button>

        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2 rounded-full"
          onClick={() => router.push("/tasks")}
        >
          <Facebook className="w-5 h-5 text-[#1877f2]" />
          Facebook
        </Button>

        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2 rounded-full"
          onClick={() => router.push("/tasks")}
        >
          <Github className="w-5 h-5" />
          Github
        </Button>
      </div>

      <div className="mt-6 text-center">
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/forgot-password">Forgot password?</Link>
        </Button>

        <div className="mt-2">
          <span className="text-foreground">No account? </span>
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        fill="#EA4335"
        d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
      />
      <path
        fill="#34A853"
        d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
      />
      <path
        fill="#4A90E2"
        d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
      />
    </svg>
  );
}
