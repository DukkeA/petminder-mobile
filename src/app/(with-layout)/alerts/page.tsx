"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { ReportCard } from "@/components/alerts/report-card";
import { CreateReportForm } from "@/components/alerts/create-report-form";

// Report type definition
export type Report = {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  petName: string;
  petType: string;
  petAge: string;
  status: "missing" | "found";
  isOwner: boolean;
  images: string[];
};

// Sample data for my reports
const myReports: Report[] = [
  {
    id: "1",
    title: "Rex is missing",
    date: "2025-02-20",
    description:
      "Rex, Golden Retriever 3 years old, last seen in Simón Bolivar Park. He had a red bowtie and is very friendly",
    location: "Bogotá, Colombia",
    petName: "Rex",
    petType: "Golden Retriever",
    petAge: "3 years",
    status: "missing",
    isOwner: true,
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
];

// Sample data for community reports
const communityReports: Report[] = [
  {
    id: "2",
    title: "Max is missing",
    date: "2025-02-20",
    description:
      "Max, Labrador Retriever 7 years old, last seen in Bosque San Carlos. He had a purple kerchief and he has an injury in his right leg",
    location: "Bogotá, Colombia",
    petName: "Max",
    petType: "Labrador Retriever",
    petAge: "7 years",
    status: "missing",
    isOwner: false,
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: "3",
    title: "Bella is missing",
    date: "2025-02-18",
    description:
      "Bella, Poodle 2 years old, last seen near Central Park. She has a pink collar with a heart tag.",
    location: "Bogotá, Colombia",
    petName: "Bella",
    petType: "Poodle",
    petAge: "2 years",
    status: "missing",
    isOwner: false,
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
];

// Available pets for selection
const availablePets = [
  { id: "1", name: "Rex", type: "Golden Retriever", age: "3 years" },
  { id: "2", name: "Max", type: "Labrador", age: "5 years" },
  { id: "3", name: "Bella", type: "Poodle", age: "2 years" },
];

export default function AlertsPage() {
  // State for reports
  const [myReportsList, setMyReportsList] = useState<Report[]>(myReports);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [communityReportsList, setCommunityReportsList] =
    useState<Report[]>(communityReports);

  // State for create/edit mode
  const [isCreating, setIsCreating] = useState(false);

  // State for confirmation dialogs
  const [reportToMarkAsFound, setReportToMarkAsFound] = useState<Report | null>(
    null
  );
  const [contactOwnerReport, setContactOwnerReport] = useState<Report | null>(
    null
  );

  // Handle mark as found
  const confirmMarkAsFound = (report: Report) => {
    setReportToMarkAsFound(report);
  };

  const executeMarkAsFound = () => {
    if (reportToMarkAsFound) {
      setMyReportsList((prevReports) =>
        prevReports.map((report) =>
          report.id === reportToMarkAsFound.id
            ? { ...report, status: "found" }
            : report
        )
      );
      setReportToMarkAsFound(null);
    }
  };

  // Handle contact owner
  const confirmContactOwner = (report: Report) => {
    setContactOwnerReport(report);
  };

  // Handle create report
  const handleCreateReport = (
    reportData: Omit<Report, "id" | "isOwner" | "status">
  ) => {
    const newReport: Report = {
      ...reportData,
      id: Date.now().toString(),
      isOwner: true,
      status: "missing",
    };

    setMyReportsList((prevReports) => [...prevReports, newReport]);
    setIsCreating(false);
  };

  return (
    <div className="container max-w-md mx-auto p-4 pb-24">
      <div className="flex items-center mb-6">
        <h1 className="text-4xl font-bold">Alerts</h1>
      </div>

      {isCreating ? (
        <div>
          <div className="rounded-3xl overflow-hidden mb-4">
            <Tabs defaultValue="myReports">
              <TabsList className="grid grid-cols-2 w-full rounded-full p-1 bg-white">
                <TabsTrigger
                  value="myReports"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  My Reports
                </TabsTrigger>
                <TabsTrigger
                  value="communityReports"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Community Reports
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <CreateReportForm
            availablePets={availablePets}
            onSubmit={handleCreateReport}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      ) : (
        <div>
          <div className="rounded-3xl overflow-hidden mb-4">
            <Tabs defaultValue="myReports">
              <TabsList className="grid grid-cols-2 w-full rounded-full p-1 bg-white">
                <TabsTrigger
                  value="myReports"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  My Reports
                </TabsTrigger>
                <TabsTrigger
                  value="communityReports"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Community Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value="myReports" className="p-0 mt-8">
                <div className="space-y-4">
                  {myReportsList.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You haven&apos;t created any reports yet.
                      </p>
                    </div>
                  ) : (
                    myReportsList.map((report) => (
                      <ReportCard
                        key={report.id}
                        report={report}
                        onAction={confirmMarkAsFound}
                        actionLabel="Mark as Found"
                      />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="communityReports" className="p-0 mt-8">
                <div className="space-y-4">
                  {communityReportsList.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No community reports available.
                      </p>
                    </div>
                  ) : (
                    communityReportsList.map((report) => (
                      <ReportCard
                        key={report.id}
                        report={report}
                        onAction={confirmContactOwner}
                        actionLabel="Contact Owner"
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Create report button */}
          <Button
            size="icon"
            className="h-10 w-10 rounded-full fixed bottom-24 right-4 shadow-lg bg-[#3e75df]"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Mark as Found confirmation dialog */}
      <AlertDialog
        open={reportToMarkAsFound !== null}
        onOpenChange={(open) => !open && setReportToMarkAsFound(null)}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Found</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this pet as found? This will update
              the status of your report.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {reportToMarkAsFound && (
            <div className="py-4">
              <h3 className="font-medium">{reportToMarkAsFound.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {reportToMarkAsFound.petName}, {reportToMarkAsFound.petType}
              </p>
            </div>
          )}

          <AlertDialogFooter className="flex space-x-2 sm:space-x-0">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeMarkAsFound}
              className="bg-[#3e75df]"
            >
              Mark as Found
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Contact Owner dialog */}
      <AlertDialog
        open={contactOwnerReport !== null}
        onOpenChange={(open) => !open && setContactOwnerReport(null)}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Contact Owner</AlertDialogTitle>
            <AlertDialogDescription>
              Contact information for the owner of this pet.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {contactOwnerReport && (
            <div className="py-4">
              <h3 className="font-medium">{contactOwnerReport.title}</h3>
              <p className="text-sm mt-1">Owner: John Doe</p>
              <p className="text-sm mt-1">Phone: (123) 456-7890</p>
              <p className="text-sm mt-1">Email: john.doe@example.com</p>
            </div>
          )}

          <AlertDialogFooter className="flex space-x-2 sm:space-x-0">
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
