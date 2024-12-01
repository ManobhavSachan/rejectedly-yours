"use client";

import { useState, useEffect } from "react";
import { fetchEntries, Entry } from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/ui/loader";
import { useAppContext } from "../context/ctx";
import JobDetailsModal from "@/components/job-details-modal";

export default function Inbox() {
  const { jobs, loading } = useAppContext();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedJob, setSelectedJob] = useState<Entry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setEntries(jobs);
  }, [loading]);

  const handleRowClick = (entry: Entry) => {
    setSelectedJob(entry);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center">
        Inbox
      </h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <Loader />
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <TableRow key={entry.id} onClick={() => handleRowClick(entry)} className="cursor-pointer">
                  <TableCell className="font-medium">{entry.position}</TableCell>
                  <TableCell>{entry.company}</TableCell>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell>{entry.created_at}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {selectedJob && (
        <JobDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={selectedJob}
        />
      )}
    </div>
  );
}
