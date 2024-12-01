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

export default function Tabled() {
  const { jobs, loading } = useAppContext();
  const [entries, setEntries] = useState<Entry[]>([]);
  console.log(jobs, loading);
  useEffect(() => {
    setEntries(jobs);
  }, [loading]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Entries</h2>
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
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell>{entry.company}</TableCell>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
