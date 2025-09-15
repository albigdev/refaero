import { useEffect } from "react";
import { useUrlCoordinates } from "../hooks/useUrlCoordinates";
import styles from "./Form.module.css";
import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Message from "./Message";

const BASE_URL = "https://geocode.maps.co/reverse";
const API_KEY = "68c15b3bca3a6476271860yaoa30afd";
const LIMIT = 1;

function Form() {
  const [lat, lng] = useUrlCoordinates();
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const { currentUser } = useAuth();
  const [createdBy] = useState(currentUser?.email);
  const { jobs, createJob } = useJobs();
  const navigate = useNavigate();

  const createdByUserCount = jobs.filter(
    (job) => job.createdBy === createdBy
  ).length;

  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchLocation() {
        try {
          const res = await fetch(
            `${BASE_URL}?lat=${lat}&lon=${lng}&api_key=${API_KEY}`
          );
          const data = await res.json();
          setAddress(
            `${data.address.postcode} ${data.address.city}, ${
              data.address.road
            } ${data.address.house_number || ""}${
              data.address.house_number ? "." : ""
            }`
          );
        } catch (err) {
          console.error(err);
        }
      }
      fetchLocation();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    e.preventDefault();

    const newJob = {
      title,
      company,
      location: address,
      coordinates: { lat, lng },
      type,
      description,
      postedDate,
      createdBy,
    };

    createJob(newJob);
    navigate("/app/jobs");
  }

  if (!currentUser)
    return <Message message="You must be logged in to create a job." />;

  if (createdByUserCount === LIMIT && currentUser.type === "free") {
    return (
      <Message message="You have reached the job creation limit. Upgrade your plan to create more jobs." />
    );
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="title">
          Title:
        </label>
        <input
          className={styles.formInput}
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="company">
          Company:
        </label>
        <input
          className={styles.formInput}
          type="text"
          id="company"
          name="company"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="location">
          Location:
        </label>
        <input
          className={styles.formInput}
          type="text"
          id="location"
          name="location"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="type">
          Type:
        </label>
        <select
          className={styles.formSelect}
          id="type"
          name="type"
          onChange={(e) => setType(e.target.value)}
          value={type}
          required
        >
          <option value="">Select type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="description">
          Description:
        </label>
        <textarea
          className={styles.formTextarea}
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="postedDate">
          Posted Date:
        </label>
        <input
          className={styles.formInput}
          type="date"
          id="postedDate"
          name="postedDate"
          onChange={(e) => setPostedDate(e.target.value)}
          value={postedDate}
          required
        />
      </div>
      <button className={styles.formButton} type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
