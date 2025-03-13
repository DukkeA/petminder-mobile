"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileForm() {
  // Separate state for displayed profile and form values
  const [displayProfile, setDisplayProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    imageUrl: "www.image.com",
  });

  // Form state that changes as user types
  const [formValues, setFormValues] = useState({
    name: displayProfile.name,
    email: displayProfile.email,
    phone: displayProfile.phone,
    imageUrl: displayProfile.imageUrl,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the displayed profile only on submit
    setDisplayProfile(formValues);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/placeholder.svg" alt={displayProfile.name} />
          <AvatarFallback className="bg-muted text-muted-foreground text-lg">
            {displayProfile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{displayProfile.name}</h2>
          <p className="text-muted-foreground">{displayProfile.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="rounded-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            className="rounded-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formValues.phone}
            onChange={handleChange}
            className="rounded-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formValues.imageUrl}
            onChange={handleChange}
            className="rounded-full"
          />
        </div>

        <Button type="submit" className="w-full rounded-full">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
