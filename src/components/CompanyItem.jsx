import styles from "./CompanyItem.module.css";
import { useJobs } from "../hooks/useJobs";
import { useNavigate } from "react-router-dom";

function CompanyItem({ companyName }) {
  const { filterJobsByCompany } = useJobs();
  const navigate = useNavigate();

  function handleClick() {
    filterJobsByCompany(companyName);
    navigate("/app/jobs");
  }

  return (
    <li
      className={styles.companyItem}
      onClick={() => handleClick()}
      style={{ cursor: "pointer" }}
    >
      <p>{companyName}</p>
    </li>
  );
}

export default CompanyItem;
