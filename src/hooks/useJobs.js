import { JobsContext } from "../contexts/JobsContext";
import { useContext } from "react";

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
}
