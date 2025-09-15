import { useJobs } from "../hooks/useJobs";
import JobItem from "./JobItem";
import style from "./JobList.module.css";

function JobList() {
  const { filteredJobs } = useJobs();

  return (
    <ul className={style.jobList}>
      {filteredJobs.map((job) => (
        <JobItem job={job} key={job.id} />
      ))}
    </ul>
  );
}

export default JobList;
