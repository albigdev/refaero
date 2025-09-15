import { useAuth } from "../hooks/useAuth";
import { useJobs } from "../hooks/useJobs";
import styles from "./JobItem.module.css";
import { Link } from "react-router-dom";

function JobItem({ job }) {
  const { deleteJob, currentJob } = useJobs();
  const { currentUser } = useAuth();

  function handleClick(e) {
    e.preventDefault();
    deleteJob(job.id);
  }

  return (
    <Link
      to={`${job.id}?lat=${job.coordinates.lat}&lng=${job.coordinates.lng}`}
      className={styles.jobLink}
    >
      <li
        className={`${styles.jobItem} ${
          currentJob?.id === job.id ? styles.active : ""
        }`}
      >
        <span className={styles.title}>{job.title}</span>
        <span className={styles.separator}>|</span>
        <span className={styles.company}>{job.company}</span>
        {job.createdBy === currentUser?.email && (
          <button className={styles.deleteBtn} onClick={(e) => handleClick(e)}>
            Delete
          </button>
        )}
      </li>
    </Link>
  );
}

export default JobItem;
