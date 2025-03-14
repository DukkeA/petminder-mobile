"use client";

import { useState } from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { format, isWithinInterval } from "date-fns";
import { TaskCard } from "@/components/history/task-card";
import type { DateRange } from "react-day-picker";

// Task type definition
type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  pet: string;
  tags: string[];
  status: "Done" | "Missed" | "Upcoming";
};

// Sample data
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Clean Rex's feeder",
    description:
      "Clean Rex's feeder and waterer with a little disinfectant and let it dry well.",
    date: new Date(2024, 9, 8), // October 8, 2024
    pet: "Rex",
    tags: ["Clean", "Weekly"],
    status: "Done",
  },
  {
    id: "2",
    title: "Groom Rex",
    description: "Brush Rex's coat",
    date: new Date(2024, 9, 6), // October 6, 2024
    pet: "Rex",
    tags: ["Grooming", "Weekly"],
    status: "Missed",
  },
  {
    id: "4",
    title: "Buy new toys",
    description: "Get some interactive toys from the pet store",
    date: new Date(2024, 9, 10), // October 10, 2024
    pet: "Rex",
    tags: ["Play", "Monthly"],
    status: "Done",
  },
];

// Available pets and tags for filtering
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

export default function HistoryPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Filtered tasks
  const filteredTasks = sampleTasks
    .filter((task) => {
      // Filter by search query
      if (
        searchQuery &&
        !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by pet
      if (selectedPet && task.pet !== selectedPet) {
        return false;
      }

      // Filter by date range
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          if (
            !isWithinInterval(task.date, {
              start: dateRange.from,
              end: dateRange.to,
            })
          ) {
            return false;
          }
        } catch (e) {
          // Handle potential date errors
          console.error("Date filtering error:", e);
        }
      } else if (dateRange && dateRange.from) {
        // If only "from" date is selected
        if (task.date < dateRange.from) {
          return false;
        }
      }

      // Filter by tags (if any tags are selected)
      if (
        selectedTags.length > 0 &&
        !selectedTags.some((tag) => task.tags.includes(tag))
      ) {
        return false;
      }

      return true;
    })

    // Sort tasks by date (newest first)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedPet(null);
    setDateRange(undefined);
  };

  // Apply filters (this function doesn't need to do anything as filtering is reactive)
  const handleApplyFilters = () => {
    // Filtering is already applied reactively, but this could be used for analytics or other side effects
    console.log("Filters applied");
  };

  // Format the date range for display
  const formatDateRange = () => {
    if (!dateRange) return "Pick a date";

    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd MMM")} - ${format(
        dateRange.to,
        "dd MMM"
      )}`;
    }

    if (dateRange.from) {
      return `From ${format(dateRange.from, "dd MMM")}`;
    }

    return "Pick a date";
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="flex items-center mb-6">
        <h1 className="text-4xl font-bold">Task History</h1>
      </div>

      {/* Search and filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="Search tasks..."
            className="pl-10 rounded-full bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select onValueChange={(value) => setSelectedTags([value])}>
          <SelectTrigger className="rounded-full bg-white w-full">
            <SelectValue placeholder="Select Tags..." />
          </SelectTrigger>
          <SelectContent>
            {availableTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSelectedPet(value)}>
          <SelectTrigger className="rounded-full bg-white w-full">
            <SelectValue placeholder="Select Pet..." />
          </SelectTrigger>
          <SelectContent>
            {availablePets.map((pet) => (
              <SelectItem key={pet} value={pet}>
                {pet}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-full bg-white justify-between"
            >
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDateRange()}
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              initialFocus
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <div className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleClearFilters}
            size={"default"}
          >
            Clean
          </Button>
          <Button
            className="rounded-full"
            onClick={handleApplyFilters}
            size={"default"}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Task cards */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
