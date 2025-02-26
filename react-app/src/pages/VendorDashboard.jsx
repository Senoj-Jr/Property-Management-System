import { useState } from "react";

const VendorDashboard = () => {
  const [jobs, setJobs] = useState([
    { id: 1, owner: "John Doe", job: "Plumbing", status: "Pending" },
    { id: 2, owner: "Jane Smith", job: "Electrical Work", status: "Pending" }
  ]);

  const acceptJob = (id) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: "Accepted" } : job));
  };

  return (
    <div>
      <h2>Vendor Dashboard</h2>
      <h3>Job Requests</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>Owner:</strong> {job.owner} | <strong>Job:</strong> {job.job} | 
            <strong>Status:</strong> {job.status} 
            {job.status === "Pending" && (
              <button onClick={() => acceptJob(job.id)}>Accept</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorDashboard;
