"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Calendar, Clock, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Task type definition
export type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time?: string;
  pet: string;
  tags: string[];
  completed: boolean;
};

// Available pets and tags for selection
const availablePets = ["Rex", "Max", "Bella"];
const availableTags = [
  "Clean",
  "Grooming",
  "Health",
  "Play",
  "Food",
  "Weekly",
  "Monthly",
  "Yearly",
];

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (task: Omit<Task, "id" | "completed">) => void;
}

export function TaskForm({ open, onOpenChange, task, onSave }: TaskFormProps) {
  // State for form values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [pet, setPet] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Reset form when opened/closed or task changes
  useEffect(() => {
    if (open && task) {
      // Edit mode - populate form with task data
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date);
      setTime(task.time || "");
      setPet(task.pet);
      setTags(task.tags);
    } else if (open) {
      // Create mode - reset form
      setTitle("");
      setDescription("");
      setDate(new Date());
      setTime("");
      setPet("");
      setTags([]);
    }
    setTagInput("");
  }, [open, task]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !pet) {
      // Basic validation
      alert("Please fill in all required fields");
      return;
    }

    onSave({
      title,
      description,
      date: date as Date,
      time,
      pet,
      tags,
    });

    onOpenChange(false);
  };

  // Add a tag
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle tag input keydown (add tag on Enter)
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Select a predefined tag
  const selectTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Title of your task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Please include all information relevant to your task."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="font-medium">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-full",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd MMM yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="font-medium">
                Time
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="pet" className="font-medium">
              Pet
            </label>
            <Select value={pet} onValueChange={setPet}>
              <SelectTrigger id="pet" className="rounded-full w-full">
                <SelectValue placeholder="Select a pet..." />
              </SelectTrigger>
              <SelectContent>
                {availablePets.map((petOption) => (
                  <SelectItem key={petOption} value={petOption}>
                    {petOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="font-medium">
              Tags
            </label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="rounded-full"
              />
              <Button
                type="button"
                size="icon"
                className="h-10 w-10 rounded-full bg-[#3e75df]"
                onClick={addTag}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {/* Selected tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-[#3e75df] text-white rounded-full px-3 py-1 flex items-center gap-1"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full p-0 text-white hover:bg-blue-600"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Suggested tags */}
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">
                Suggested tags:
              </p>
              <div className="flex flex-wrap gap-2">
                {availableTags
                  .filter((tag) => !tags.includes(tag))
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-full px-3 py-1 cursor-pointer hover:bg-gray-100"
                      onClick={() => selectTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-6"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full px-6 bg-[#3e75df]">
              {task ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
