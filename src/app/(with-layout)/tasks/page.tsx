/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SelectItem } from "@/components/ui/select";

import { SelectContent } from "@/components/ui/select";

import { SelectValue } from "@/components/ui/select";

import { SelectTrigger } from "@/components/ui/select";

import { Select } from "@/components/ui/select";

import { useState } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  format,
  isToday,
  isTomorrow,
  addDays,
  isWithinInterval,
} from "date-fns";
import type { DateRange } from "react-day-picker";
import { TaskForm, type Task } from "@/components/tasks/task-form";

// Sample data
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Clean Rex's feeder",
    description:
      "Clean Rex's feeder and waterer with a little disinfectant and let it dry well.",
    date: new Date(), // Today
    time: "09:00",
    pet: "Rex",
    tags: ["Clean", "Weekly"],
    completed: false,
  },
  {
    id: "2",
    title: "Groom Rex",
    description: "Brush Rex's coat",
    date: addDays(new Date(), 1), // Tomorrow
    time: "16:30",
    pet: "Rex",
    tags: ["Grooming", "Weekly"],
    completed: false,
  },
  {
    id: "3",
    title: "Vet appointment",
    description: "Annual checkup and vaccinations",
    date: addDays(new Date(), 3), // In 3 days
    time: "Rex",
    pet: "Rex",
    tags: ["Health", "Yearly"],
    completed: false,
  },
  {
    id: "4",
    title: "Buy new toys",
    description: "Get some interactive toys from the pet store",
    date: addDays(new Date(), 5), // In 5 days
    time: "Rex",
    pet: "Rex",
    tags: ["Play", "Monthly"],
    completed: false,
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

export default function HomePage() {
  // State for tasks
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // State for delete confirmation
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // State for task form
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Open edit form
  const openEditForm = (task: Task) => {
    setTaskToEdit(task);
    setTaskFormOpen(true);
  };

  // Open create form
  const openCreateForm = () => {
    setTaskToEdit(null);
    setTaskFormOpen(true);
  };

  // Save task (create or update)
  const saveTask = (taskData: Omit<Task, "id" | "completed">) => {
    if (taskToEdit) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, ...taskData } : task
        )
      );
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  // Open delete confirmation
  const confirmDelete = (task: Task) => {
    setTaskToDelete(task);
  };

  // Cancel delete
  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  // Confirm and execute delete
  const executeDelete = () => {
    if (taskToDelete) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskToDelete.id)
      );
      setTaskToDelete(null);
    }
  };

  // Filtered tasks
  const filteredTasks = tasks.filter((task) => {
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
  });

  // Group tasks by date sections
  const todayTasks = filteredTasks.filter((task) => isToday(task.date));
  const tomorrowTasks = filteredTasks.filter((task) => isTomorrow(task.date));
  const futureTasks = filteredTasks.filter(
    (task) =>
      !isToday(task.date) && !isTomorrow(task.date) && task.date > new Date()
  );

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedPet(null);
    setDateRange(undefined);
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

  // Render task card
  const renderTaskCard = (task: Task) => (
    <div key={task.id} className="bg-white rounded-3xl p-4 shadow-sm mb-4">
      <div className="flex items-start gap-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => toggleTaskCompletion(task.id)}
          className="mt-2"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => openEditForm(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => confirmDelete(task)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-gray-700 mb-3">{task.description}</p>

          <div className="flex items-center text-gray-500 mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {format(task.date, "dd MMMM, yyyy")}
              {task.time && ` at ${task.time}`}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#3e75df] text-white rounded-full px-4 py-1">
              {task.pet}
            </Badge>
            {task.tags.map((tag: any) => (
              <Badge
                key={tag}
                className="bg-[#3e75df] text-white rounded-full px-4 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container max-w-md mx-auto p-4 pb-24">
      <div className="flex items-center mb-6">
        <h1 className="text-4xl font-bold">Pet Tasks Reminder</h1>
        <div className="ml-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15C10 12 12 10 15 10C18 10 20 12 20 15C20 18 18 20 15 20C12 20 10 18 10 15ZM30 15C30 12 32 10 35 10C38 10 40 12 40 15C40 18 38 20 35 20C32 20 30 18 30 15ZM15 25C15 22 17 20 20 20C23 20 25 22 25 25C25 28 23 30 20 30C17 30 15 28 15 25ZM35 25C35 22 37 20 40 20C43 20 45 22 45 25C45 28 43 30 40 30C37 30 35 28 35 25Z"
              fill="#3e75df"
            />
          </svg>
        </div>
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
          <SelectTrigger className="w-full rounded-full bg-white">
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
            className="rounded-full px-8 bg-white"
            onClick={handleClearFilters}
          >
            Clean
          </Button>
          <Button className="rounded-full px-8 bg-[#3e75df]">Apply</Button>
        </div>
      </div>

      {/* Today's tasks */}
      {todayTasks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Today</h2>
          {todayTasks.map(renderTaskCard)}
        </div>
      )}

      {/* Tomorrow's tasks */}
      {tomorrowTasks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Tomorrow</h2>
          {tomorrowTasks.map(renderTaskCard)}
        </div>
      )}

      {/* Future tasks */}
      {futureTasks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Upcoming</h2>
          {futureTasks.map(renderTaskCard)}
        </div>
      )}

      {/* Add new task button */}
      <Button
        size="icon"
        className="h-10 w-10 rounded-full fixed bottom-24 right-4 shadow-lg bg-[#3e75df]"
        onClick={openCreateForm}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Task form (create/edit) */}
      <TaskForm
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        task={taskToEdit}
        onSave={saveTask}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={taskToDelete !== null}
        onOpenChange={(open: any) => !open && cancelDelete()}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* {taskToDelete && (
            <div className="py-4">
              <h3 className="font-medium">{taskToDelete.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{taskToDelete.description}</p>
            </div>
          )} */}

          <AlertDialogFooter className="flex space-x-2 sm:space-x-0">
            <AlertDialogCancel className="rounded-full" onClick={cancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDelete}
              className="bg-destructive hover:bg-destructive/90 rounded-full"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
