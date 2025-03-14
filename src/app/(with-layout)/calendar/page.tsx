"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { cn } from "@/lib/utils";

// Task type definition
type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  pet: string;
  tags: string[];
  completed: boolean;
};

// Sample tasks data
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Clean Rex's feeder",
    description:
      "Clean Rex's feeder and waterer with a little disinfectant and let it dry well.",
    date: parseISO("2024-10-04"),
    pet: "Rex",
    tags: ["Clean", "Weekly"],
    completed: true,
  },
  {
    id: "2",
    title: "Groom Rex",
    description: "Brush Rex's coat",
    date: parseISO("2024-10-06"),
    pet: "Rex",
    tags: ["Grooming", "Weekly"],
    completed: false,
  },
  {
    id: "3",
    title: "Take Rex to the vet",
    description: "Annual vaccination",
    date: parseISO("2024-10-16"),
    pet: "Rex",
    tags: ["Health", "Yearly"],
    completed: true,
  },
  {
    id: "4",
    title: "Buy new toys",
    description: "Get some interactive toys from the pet store",
    date: parseISO("2024-10-20"),
    pet: "Rex",
    tags: ["Play", "Monthly"],
    completed: false,
  },
];

export default function CalendarPage() {
  // State for current month and selected date
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1)); // October 2024
  const [selectedDate, setSelectedDate] = useState<Date>(
    parseISO("2024-10-16")
  );

  // State for tasks
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  // State for delete confirmation
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Get days for the current month view (including days from prev/next month to fill the grid)
  const getDaysForMonthView = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    // Get all days in the month
    const days = eachDayOfInterval({ start, end });

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startDay = start.getDay();

    // Add days from the previous month to fill the first row
    const prevMonthDays = [];
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(start);
      date.setDate(start.getDate() - (i + 1));
      prevMonthDays.push(date);
    }

    // Add days from the next month to fill the last row
    const lastDay = end.getDay();
    const nextMonthDays = [];
    for (let i = 1; i < 7 - lastDay; i++) {
      const date = new Date(end);
      date.setDate(end.getDate() + i);
      nextMonthDays.push(date);
    }

    return [...prevMonthDays, ...days, ...nextMonthDays];
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Check if a date has tasks
  const hasTasksOnDate = (date: Date) => {
    return tasks.some((task) => isSameDay(task.date, date));
  };

  // Get tasks for the selected date
  const getTasksForSelectedDate = () => {
    return tasks.filter((task) => isSameDay(task.date, selectedDate));
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
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

  // Render calendar
  const renderCalendar = () => {
    const days = getDaysForMonthView();
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-lg"
            onClick={prevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-lg"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Days of week headers */}
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isSelected = isSameDay(day, selectedDate);
            const hasTasks = hasTasksOnDate(day);

            return (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "h-12 w-full rounded-lg text-center font-medium",
                  !isCurrentMonth && "text-gray-300",
                  isSelected && "bg-[#3e75df] text-white hover:bg-[#3e75df]/90",
                  hasTasks && !isSelected && "bg-[#e6efff]"
                )}
                onClick={() => setSelectedDate(day)}
              >
                {format(day, "d")}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  // Render tasks for selected date
  const renderTasksForSelectedDate = () => {
    const tasksForDate = getTasksForSelectedDate();

    return (
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">
          {format(selectedDate, "MMMM d, yyyy")}
        </h2>

        {tasksForDate.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
            <p className="text-muted-foreground">No tasks for this date.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasksForDate.map((task) => (
              <div key={task.id} className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                  </div>
                  {task.completed && (
                    <div className="bg-[#f8fafc] p-2 rounded-full">
                      <Check className="h-5 w-5 text-[#3e75df]" />
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="destructive"
                    className="rounded-full px-6"
                    onClick={() => confirmDelete(task)}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="default"
                    className="rounded-full px-6 bg-[#3e75df]"
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    {task.completed ? "Undone" : "Complete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container max-w-md mx-auto p-4 pb-24">
      <div className="flex items-center mb-6">
        <h1 className="text-4xl font-bold">Calendar</h1>
      </div>

      {/* Calendar */}
      {renderCalendar()}

      {/* Tasks for selected date */}
      {renderTasksForSelectedDate()}

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={taskToDelete !== null}
        onOpenChange={(open) => !open && cancelDelete()}
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
              <p className="text-sm text-muted-foreground mt-1">
                {taskToDelete.description}
              </p>
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
