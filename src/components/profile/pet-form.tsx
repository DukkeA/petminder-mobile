/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string;
  birthDate: string;
  imageUrl: string;
};

interface PetFormProps {
  pet: Pet;
  onUpdate: (pet: Pet) => void;
}

export function PetForm({ pet, onUpdate }: PetFormProps) {
  const [petData, setPetData] = useState<Pet>({
    id: "",
    name: "",
    type: "",
    breed: "",
    birthDate: "",
    imageUrl: "",
  });

  // Update petData when pet prop changes
  useEffect(() => {
    if (pet && pet.id) {
      setPetData(pet);
    }
  }, [pet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setPetData((prev) => ({ ...prev, type: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setPetData((prev) => ({
        ...prev,
        birthDate: format(date, "dd/MM/yyyy"),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(petData);
  };

  // Parse the date string to a Date object for the calendar
  const parsedDate = () => {
    try {
      if (!petData.birthDate) return undefined;
      return parse(petData.birthDate, "dd/MM/yyyy", new Date());
    } catch (error) {
      return undefined;
    }
  };

  // Guard against undefined pet
  if (!pet || !pet.id) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
      <div className="space-y-2">
        <Label htmlFor={`name-${petData.id}`}>Name</Label>
        <Input
          id={`name-${petData.id}`}
          name="name"
          value={petData.name}
          onChange={handleChange}
          className="rounded-full "
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`type-${petData.id}`}>Type</Label>
        <Select value={petData.type} onValueChange={handleTypeChange}>
          <SelectTrigger
            id={`type-${petData.id}`}
            className="rounded-full w-full"
          >
            <SelectValue placeholder="Select a pet type..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dog">Dog</SelectItem>
            <SelectItem value="Cat">Cat</SelectItem>
            <SelectItem value="Bird">Bird</SelectItem>
            <SelectItem value="Fish">Fish</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`breed-${petData.id}`}>Breed</Label>
        <Input
          id={`breed-${petData.id}`}
          name="breed"
          value={petData.breed}
          onChange={handleChange}
          className="rounded-full "
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`birthDate-${petData.id}`}>Date of birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={`birthDate-${petData.id}`}
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal rounded-full ",
                !petData.birthDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {petData.birthDate ? petData.birthDate : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={parsedDate()}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`imageUrl-${petData.id}`}>Image URL</Label>
        <Input
          id={`imageUrl-${petData.id}`}
          name="imageUrl"
          value={petData.imageUrl}
          onChange={handleChange}
          className="rounded-full "
        />
      </div>

      <Button type="submit" className="w-full rounded-full  mt-6">
        Update Pet
      </Button>
    </form>
  );
}
