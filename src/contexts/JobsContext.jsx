import { useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const BASE_URL = "https://refaero-backend.onrender.com";

const JobsContext = createContext();

const initialState = {
  jobs: [],
  filteredJobs: [],
  baseForSearch: [],
  isLoading: false,
  currentJob: {},
  error: "",
  filtered: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "jobs/loading":
      return { ...state, isLoading: true };
    case "jobs/loaded":
      return {
        ...state,
        isLoading: false,
        jobs: action.payload,
        filteredJobs: action.payload,
        baseForSearch: action.payload,
      };
    case "jobDetails/loaded":
      return {
        ...state,
        isLoading: false,
        currentJob: action.payload,
      };
    case "jobs/rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "jobs/filterByCompany":
      return {
        ...state,
        filtered: true,
        filteredJobs: action.payload,
        baseForSearch: action.payload,
      };
    case "jobs/searchByQuery":
      return { ...state, filtered: true, filteredJobs: action.payload };
    case "jobs/resetSearch":
      return {
        ...state,
        filteredJobs: state.baseForSearch,
      };
    case "jobs/resetFilter":
      return {
        ...state,
        filtered: false,
        filteredJobs: state.jobs,
        baseForSearch: state.jobs,
      };
    case "jobs/delete":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
        filteredJobs: state.filteredJobs.filter(
          (job) => job.id !== action.payload
        ),
        baseForSearch: state.baseForSearch.filter(
          (job) => job.id !== action.payload
        ),
      };
    case "job/created":
      return {
        ...state,
        isLoading: false,
        jobs: [...state.jobs, action.payload],
        filteredJobs: [...state.filteredJobs, action.payload],
        baseForSearch: [...state.baseForSearch, action.payload],
      };
    default:
      throw new Error("Unknown action type");
  }
}

function JobsProvider({ children }) {
  const [
    {
      jobs,
      isLoading,
      currentJob,
      error,
      filteredJobs,
      filtered,
      baseForSearch,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchJobs() {
      dispatch({ type: "jobs/loading" });
      try {
        const res = await fetch(`${BASE_URL}/jobs`);
        const data = await res.json();
        dispatch({ type: "jobs/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "jobs/rejected", payload: err.message });
      }
    }
    fetchJobs();
  }, []);

  async function fetchJobDetails(id) {
    dispatch({ type: "jobs/loading" });
    try {
      const res = await fetch(`${BASE_URL}/jobs/${id}`);
      const data = await res.json();
      dispatch({ type: "jobDetails/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "jobs/rejected", payload: err.message });
    }
  }

  async function createJob(newJob) {
    dispatch({ type: "jobs/loading" });
    try {
      const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        body: JSON.stringify(newJob),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      dispatch({ type: "job/created", payload: data });
    } catch (err) {
      dispatch({ type: "jobs/rejected", payload: err.message });
    }
  }

  function searchForJob(query) {
    const filteredJobsByQuery = baseForSearch.filter((job) =>
      job.title.toLowerCase().includes(query.toLowerCase())
    );
    dispatch({ type: "jobs/searchByQuery", payload: filteredJobsByQuery });
  }

  function filterJobsByCompany(company) {
    const filteredJobsByCompany = jobs.filter((job) => job.company === company);
    dispatch({ type: "jobs/filterByCompany", payload: filteredJobsByCompany });
  }

  function resetSearch() {
    dispatch({ type: "jobs/resetSearch" });
  }

  function resetFilter() {
    dispatch({ type: "jobs/resetFilter" });
  }

  async function deleteJob(id) {
    dispatch({ type: "jobs/loading" });
    try {
      await fetch(`${BASE_URL}/jobs/${id}`, { method: "DELETE" });
      dispatch({ type: "jobs/delete", payload: id });
    } catch (err) {
      dispatch({ type: "jobs/rejected", payload: err.message });
    }
  }

  return (
    <JobsContext.Provider
      value={{
        jobs,
        filteredJobs,
        isLoading,
        currentJob,
        error,
        filtered,
        resetFilter,
        resetSearch,
        filterJobsByCompany,
        searchForJob,
        deleteJob,
        fetchJobDetails,
        createJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export { JobsProvider, JobsContext };
