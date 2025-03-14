"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AddPetForm } from "@/components/profile/add-pet-form";
import { PetForm } from "@/components/profile/pet-form";

type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string;
  birthDate: string;
  imageUrl: string;
};

export function PetsList() {
  const [pets, setPets] = useState<Pet[]>([
    {
      id: "1",
      name: "Rex",
      type: "Dog",
      breed: "Labrador",
      birthDate: "08/12/2020",
      imageUrl: "www.image.com",
    },
  ]);

  const [isAddingPet, setIsAddingPet] = useState(false);
  const [expandedValue, setExpandedValue] = useState<string>("pet-1");

  const handleUpdatePet = (updatedPet: Pet) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
    );
  };

  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    const pet = {
      ...newPet,
      id: Date.now().toString(),
    };
    setPets((prev) => [...prev, pet]);
    setIsAddingPet(false);
    setExpandedValue(`pet-${pet.id}`); // Expand the newly added pet
  };

  return (
    <div className="space-y-4">
      {pets.length === 0 ? (
        <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
          <p className="text-muted-foreground">
            No pets found. Add a pet to get started.
          </p>
        </div>
      ) : (
        <Accordion
          type="single"
          collapsible
          value={expandedValue}
          onValueChange={setExpandedValue}
          className="space-y-4"
        >
          {pets.map((pet) => (
            <AccordionItem
              key={pet.id}
              value={`pet-${pet.id}`}
              className="bg-white rounded-3xl shadow-sm overflow-hidden border-none"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg" alt={pet.name} />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {pet.name && pet.name.length > 0 ? pet.name[0] : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3 className="font-semibold">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pet.type} - {pet.breed}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0">
                <PetForm pet={pet} onUpdate={handleUpdatePet} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {isAddingPet ? (
        <div className="mt-4">
          <AddPetForm
            onSubmit={handleAddPet}
            onCancel={() => setIsAddingPet(false)}
          />
        </div>
      ) : (
        <Button
          size="icon"
          className="h-10 w-10 rounded-full fixed bottom-24 right-4 shadow-lg"
          onClick={() => setIsAddingPet(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
