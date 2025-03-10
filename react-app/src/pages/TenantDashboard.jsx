import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiMenu,
  FiX,
  FiAlertCircle,
  FiHome,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const TenantDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [issues, setIssues] = useState([]);
  const [tenant, setTenant] = useState({
    tenant_id:"",
    tenant_name: "",
    email: "",
    mobile_number: "",
    family_count: "",
    matched_owner: "",
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", message: "", address: "", location: "" });
  const [issueData,setIssueData]=useState({statement :"", type:"",estimated_days:0})
  useEffect(() => {
    const storedTenant = localStorage.getItem("User");
    if (storedTenant) {
      const parsedTenant = JSON.parse(storedTenant);
      console.log(parsedTenant.matched_owner.owner_id)
      setTenant(parsedTenant);
    }

     // fetch("")
    //   .then(response => response.json())
    //   .then(data => setIssues(data))
    //   .catch(error => console.error("Error fetching issues:", error));
    
    // fetch("your-api-url/requests")
    //   .then(response => response.json())
    //   .then(data => setRequests(data))
    //   .catch(error => console.error("Error fetching requests:", error));
  
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleIssueChange = (e) => {
    setIssueData({ ...issueData, [e.target.name]: e.target.value });
  };

  const handleSignOut = () => {
    localStorage.removeItem("User");
    navigate("/");
  };
  const handleIssue = async (e) => {
    e.preventDefault();
    const requestissue = {
      tenant_id: tenant.tenant_id,
      owner_id:tenant.matched_owner.owner_id,
      posted:new Date().toISOString().replace("T", " ").split(".")[0],
      ...issueData,

    };
    console.log(requestissue);
    try {
      const response = await axios.post("http://localhost:8080/Tenant/Raise-issue", requestissue, {
        headers: { "Content-Type": "application/json" },
      });
      
      console.log("Issue Submitted Successfully:", response.data);
    } catch (error) {
      console.error("Submission Failed!!", error.response?.data || error.message);
    }
  };
  const handleOwnerRequest = async (e) => {
    e.preventDefault();
    const requestData = {
      id: tenant.tenant_id,
      ...formData,
    };
    try {
      await axios.post("http://localhost:8080/Tenant/Owner-Request", requestData);
      alert("Successfully submitted");
    } catch (err) {
      console.error("Submission Failed!!", err);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-[#330000] text-[#D6B8A4]">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} bg-[#3E2C2C] h-full shadow-xl border-r-4 border-[#C4A38A] flex flex-col p-3`}>
        {/* Sidebar Toggle */}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mb-6 text-2xl self-center">
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        
        {/* Sidebar Buttons */}
        <button className="flex items-center space-x-2 mb-4" onClick={() => setActiveView("home")}>
          <FiHome className="text-xl" /> {isSidebarOpen && <span>Home</span>}
        </button>
       {( tenant.matched_owner && <button className="flex items-center space-x-2" onClick={() => setActiveView("raiseIssue")}>
          <FiAlertCircle className="text-xl" /> {isSidebarOpen &&  <span>Raise Issues</span>}
        </button>
       )}
        {/* Profile and Sign-out */}
        <div className="mt-auto">
          <button className="flex items-center space-x-2 mb-4" onClick={() => setIsProfileOpen(true)}>
            <FiUser className="text-xl" /> {isSidebarOpen && <span>Profile</span>}
          </button>
          <button className="flex items-center space-x-2 text-red-500" onClick={handleSignOut}>
            <FiLogOut className="text-xl" /> {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#D09683] text-[#330000] rounded-3xl shadow-2xl m-4 flex flex-col">
        {activeView === "home" && (
          <div>
            <h2 className="text-4xl font-bold mb-6">Request Owner</h2>
            <form onSubmit={handleOwnerRequest} className="w-full flex flex-col items-center space-y-4">
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-3/4 p-4 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
                />
              ))}
              <button type="submit" className="mt-6 px-8 py-3 bg-[#D09683] text-[#330000] font-bold text-xl rounded-xl shadow-lg hover:scale-105">
                Submit
              </button>
            </form>
          </div>
        )}

        {activeView === "raiseIssue" && (
          <div>
            <h2 className="text-4xl font-bold mb-6" 
            >Raise an Issue</h2>
            <form onSubmit={handleIssue} className="w-full flex flex-col items-center space-y-4">
              {Object.keys(issueData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleIssueChange}
                  required
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-3/4 p-4 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
                />
              ))}
              <button type="submit" className="mt-6 px-8 py-3 bg-[#D09683] text-[#330000] font-bold text-xl rounded-xl shadow-lg hover:scale-105">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#4F3D3D] p-6 rounded-lg shadow-xl w-96 text-center">
            <FiUser className="text-6xl text-[#D09683] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#D09683]">Tenant Profile</h2>
            {Object.entries(tenant).map(([key, value]) => (
              <p key={key} className="text-white">{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</p>
            ))}
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={() => setIsProfileOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;
