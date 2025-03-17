import { useState } from "react";

const VendorDashboard = () => {
  const [jobs, setJobs] = useState([
    { id: 1, owner: "John Doe", job: "Fix plumbing leak", status: "Pending" },
    { id: 2, owner: "Jane Smith", job: "Repair electrical wiring", status: "Pending" },
  ]);

  const updateJobStatus = (id, newStatus) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job));
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Vendor Dashboard</h2>
        <h3 className="text-xl font-medium text-gray-700 text-center mb-6">Job Requests</h3>

        {jobs.length === 0 ? (
          <p className="text-gray-500 text-center">No job requests available.</p>
        ) : (
          <ul className="w-full space-y-6 px-4">
            {jobs.map((job) => (
              <li 
                key={job.id} 
                className="w-full p-6 bg-gray-50 border rounded-lg flex flex-col md:flex-row justify-between items-center"
              >
                <div className="text-center md:text-left w-full md:w-auto">
                  <p className="text-lg font-semibold text-gray-800">{job.owner}</p>
                  <p className="text-gray-600">{job.job}</p>
                  <span 
                    className={`mt-2 inline-block px-3 py-1 text-sm font-medium rounded-md 
                    ${job.status === "Pending" ? "bg-yellow-200 text-yellow-800" : 
                    job.status === "Accepted" ? "bg-green-200 text-green-800" : 
                    "bg-red-200 text-red-800"}`}
                  >
                    {job.status}
                  </span>
                </div>

                {job.status === "Pending" && (
                  <div className="mt-4 md:mt-0 space-x-3">
                    <button 
                      onClick={() => updateJobStatus(job.id, "Accepted")}
                      className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => updateJobStatus(job.id, "Rejected")}
                      className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;