/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Report } from "@/app/(with-layout)/alerts/page";

interface ReportCardProps {
  report: Report;
  onAction: (report: Report) => void;
  actionLabel: string;
}

export function ReportCard({ report, onAction, actionLabel }: ReportCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold">{report.title}</h3>
        <Badge
          variant={report.status === "missing" ? "destructive" : "default"}
          className="rounded-full px-4 py-1"
        >
          {report.status === "missing" ? "Missing" : "Found"}
        </Badge>
      </div>

      <p className="text-gray-500 mb-4">{report.date}</p>

      <p className="text-gray-700 mb-4">{report.description}</p>

      <div className="flex items-center text-gray-600 mb-6">
        <MapPin className="h-4 w-4 mr-2" />
        <span className="underline">{report.location}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {report.images.map((image: any, index: any) => (
          <div
            key={index}
            className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-4xl font-bold text-gray-400 overflow-hidden"
          >
            {image ? (
              <img
                src={image || "/placeholder.svg"}
                alt={`Pet image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        ))}
      </div>

      <Button
        className="w-full rounded-full bg-[#3e75df]"
        onClick={() => onAction(report)}
      >
        {actionLabel}
      </Button>
    </div>
  );
}
