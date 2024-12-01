"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchEntries, Entry, updateEntry } from "@/utils/api";

// Define the shape of your context
interface AppContextType {
  jobs: any[];
  setJobs: (jobs: any[]) => void;
  loading: boolean;
  fetchJobs: () => Promise<void>;
  updateJobStatus: (id: string, status: string) => Promise<void>;
}

// Create the context with default values
export const AppContext = createContext<AppContextType>({
  jobs: [],
  setJobs: () => {},
  loading: false,
  fetchJobs: () => Promise.resolve(),
  updateJobStatus: () => Promise.resolve(),
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobs = async () => {
    try {
      const response = await fetchEntries();
      setJobs(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const updateJobStatus = async (id: string, status: string) => {
    try {
      // Assuming updateEntry is a function that updates the job status and returns the updated job
      const updatedJob = await updateEntry(id, status);
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === id ? updatedJob : job))
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, setJobs, fetchJobs, loading, updateJobStatus }}>
      {children}
    </AppContext.Provider>
  );
};

// Usage in a component
export const useAppContext = () => useContext(AppContext);
