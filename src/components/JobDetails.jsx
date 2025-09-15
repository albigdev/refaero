import { useEffect } from "react";
import styles from "./JobDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import Spinner from "./Spinner";
import { useAuth } from "../hooks/useAuth";
import Message from "./Message";

function JobDetails() {
  const { id } = useParams();
  const { fetchJobDetails, currentJob: job, isLoading } = useJobs();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      fetchJobDetails(id);
    },
    [id]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentUser) {
    return <Message message="You must be logged in to view job details." />;
  }

  return (
    <div className={styles.jobDetails}>
      <div className={styles.buttonRow}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          type="button"
        >
          &larr; Back
        </button>
      </div>
      <h2>{job.title}</h2>
      <p>
        <strong>Company:</strong> {job.company}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Type:</strong> {job.type}
      </p>
      <p>
        <strong>Description:</strong> {job.description}
      </p>
      <p>
        <strong>Posted date:</strong> {job.postedDate}
      </p>
      <p>
        <strong>Created by:</strong> {job.createdBy}
      </p>
    </div>
  );
}

export default JobDetails;
