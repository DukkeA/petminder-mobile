"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type NewPet = {
  name: string
  type: string
  breed: string
  birthDate: string
  imageUrl: string
}

interface AddPetFormProps {
  onSubmit: (pet: NewPet) => void
  onCancel: () => void
}

export function AddPetForm({ onSubmit, onCancel }: AddPetFormProps) {
  const [petData, setPetData] = useState<NewPet>({
    name: "",
    type: "",
    breed: "",
    birthDate: "",
    imageUrl: "",
  })
  const [date, setDate] = useState<Date | undefined>(undefined)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPetData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setPetData((prev) => ({ ...prev, type: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      setPetData((prev) => ({
        ...prev,
        birthDate: format(date, "dd/MM/yyyy"),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(petData)
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Add New Pet</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Name of your pet"
            value={petData.name}
            onChange={handleChange}
            className="rounded-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={petData.type} onValueChange={handleTypeChange}>
            <SelectTrigger id="type" className="rounded-full w-full">
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
          <Label htmlFor="breed">Breed</Label>
          <Input
            id="breed"
            name="breed"
            placeholder="Breed of your pet"
            value={petData.breed}
            onChange={handleChange}
            className="rounded-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Date of birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="birthDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal rounded-full",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : "dd/mm/yyyy"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            placeholder="www.image.com"
            value={petData.imageUrl}
            onChange={handleChange}
            className="rounded-full"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="rounded-full px-6">
            Create Pet
          </Button>
        </div>
      </form>
    </div>
  )
}

