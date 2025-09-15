import styles from "./CompanyList.module.css";
import { useJobs } from "../hooks/useJobs";
import CompanyItem from "./CompanyItem";

function CompanyList() {
  const { jobs } = useJobs();

  const uniqueCompanies = [...new Set(jobs.map((job) => job.company))];

  return (
    <ul className={styles.companyList}>
      {uniqueCompanies.map((companyName) => (
        <CompanyItem companyName={companyName} key={companyName} />
      ))}
    </ul>
  );
}

export default CompanyList;
