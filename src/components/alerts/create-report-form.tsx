"use client";

import type React from "react";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Report } from "@/app/(with-layout)/alerts/page";

interface Pet {
  id: string;
  name: string;
  type: string;
  age: string;
}

interface CreateReportFormProps {
  availablePets: Pet[];
  onSubmit: (reportData: Omit<Report, "id" | "isOwner" | "status">) => void;
  onCancel: () => void;
}

export function CreateReportForm({
  availablePets,
  onSubmit,
  onCancel,
}: CreateReportFormProps) {
  const [title, setTitle] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState("Bogotá, Colombia");
  const [images, setImages] = useState<string[]>([]);
  const [fileInputValue, setFileInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !selectedPet || !description) {
      alert("Please fill in all required fields");
      return;
    }

    const pet = availablePets.find((p) => p.id === selectedPet);

    if (!pet) {
      alert("Please select a valid pet");
      return;
    }

    onSubmit({
      title,
      date: new Date().toISOString().split("T")[0],
      description,
      location,
      petName: pet.name,
      petType: pet.type,
      petAge: pet.age,
      images:
        images.length > 0
          ? images
          : [
              "/placeholder.svg?height=200&width=200",
              "/placeholder.svg?height=200&width=200",
            ],
    });
  };

  const handleFileUpload = () => {
    // In a real app, this would handle file upload to a server
    // For now, we'll just add a placeholder image
    setImages((prev) => [...prev, "/placeholder.svg?height=200&width=200"]);
    setFileInputValue("");
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Create Missing Pet Report</h2>
      <p className="text-gray-500 mb-6">Fill all the relevant data</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="font-medium">
            Alert title
          </label>
          <Input
            id="title"
            placeholder="Max is Missing"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pet" className="font-medium">
            Select the Pet
          </label>
          <Select value={selectedPet} onValueChange={setSelectedPet}>
            <SelectTrigger id="pet" className="rounded-full w-full">
              <SelectValue placeholder="Select your pet" />
            </SelectTrigger>
            <SelectContent>
              {availablePets.map((pet) => (
                <SelectItem key={pet.id} value={pet.id}>
                  {pet.name} ({pet.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Please include all information relevant to your issue."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Location</label>
          <div className="border border-gray-200 rounded-3xl p-4 h-48 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-10 w-10 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">Map placeholder</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-medium">Upload Photos</label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Choose file"
                value={fileInputValue}
                onChange={(e) => setFileInputValue(e.target.value)}
                className="rounded-full pr-24"
                readOnly
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                No file chosen
              </span>
            </div>
            <Button
              type="button"
              className="rounded-full px-6 bg-[#3e75df]"
              onClick={handleFileUpload}
            >
              Upload
            </Button>
          </div>
          <p className="text-sm text-gray-500">Upload photos of your pet</p>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="rounded-full px-6 bg-[#3e75df]">
            Create Report
          </Button>
        </div>
      </form>
    </div>
  );
}
