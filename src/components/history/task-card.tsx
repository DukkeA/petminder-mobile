import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  pet: string;
  tags: string[];
  status: "Done" | "Missed" | "Upcoming";
};

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold">{task.title}</h3>
        <Badge
          variant={task.status === "Missed" ? "destructive" : "default"}
          className={`${
            task.status === "Done"
              ? "bg-[#3e75df]"
              : task.status === "Missed"
              ? ""
              : "bg-yellow-500"
          } text-white rounded-full px-4 py-1`}
        >
          {task.status}
        </Badge>
      </div>

      <p className="text-gray-700 mb-3">{task.description}</p>

      <div className="flex items-center text-gray-500 mb-3">
        <Calendar className="h-4 w-4 mr-2" />
        <span>{format(task.date, "dd MMMM, yyyy")}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge className="bg-[#3e75df] text-white rounded-full px-4 py-1">
          {task.pet}
        </Badge>
        {task.tags.map((tag) => (
          <Badge
            key={tag}
            className="bg-[#3e75df] text-white rounded-full px-4 py-1"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
