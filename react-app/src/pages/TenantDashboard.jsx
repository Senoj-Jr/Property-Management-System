import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiPlusCircle, FiAlertCircle, FiHome, FiUser, FiLogOut } from "react-icons/fi";

const TenantDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [issues, setIssues] = useState([]);
  const [tenant, setTenant] = useState({ tenant_name: "", email: "", mobile_number: "", family_count: "" ,matched_owner:""});
  const [requests, setRequests] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [isHavingOwner,setIsHavingOwner]=useState(false);

  useEffect(() => {
    const storedTenant = localStorage.getItem("User");
    console.log(storedTenant.matched_owner);
    if (storedTenant) {
      const parsedTenant = JSON.parse(storedTenant);
      console.log(parsedTenant.matched_owner);
      setTenant(parsedTenant);
    }
    
    
    fetch("your-api-url/issues")
      .then(response => response.json())
      .then(data => setIssues(data))
      .catch(error => console.error("Error fetching issues:", error));
    
    fetch("your-api-url/requests")
      .then(response => response.json())
      .then(data => setRequests(data))
      .catch(error => console.error("Error fetching requests:", error));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("User");
    navigate("/");
  };

  return (
    <div className="h-screen w-screen flex bg-[#330000] text-[#D6B8A4]">
    {/* Sidebar */}
    <div className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-32"} bg-[#3E2C2C] h-full shadow-xl border-r-4 border-[#C4A38A] flex flex-col p-3`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`transition-all duration-300 mb-6 ${isSidebarOpen ? "text-[#B5927B] text-2xl self-end" : "text-[#A57B65] text-3xl self-center"}`}
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar Buttons */}
      <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} mb-4 text-[#D6B8A4] hover:text-[#A57B65]`} onClick={() => setActiveView("home")}>
        <FiHome className={`${isSidebarOpen ? "text-xl" : "text-2xl text-[#A57B65]"}`} /> {isSidebarOpen && <span>Home</span>}
      </button>

      <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} text-[#D6B8A4] hover:text-[#A57B65]`} onClick={() => setActiveView("raiseIssue")}>
        <FiAlertCircle className={`${isSidebarOpen ? "text-xl" : "text-2xl text-[#A57B65]"}`} /> {isSidebarOpen && <span>Raise Issues</span>}
      </button>
  


        <div className="mt-auto">
          <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} text-[#B5927B] hover:text-[#A57B65] mb-4`} onClick={() => setIsProfileOpen(true)}>
            <FiUser className="text-xl" /> {isSidebarOpen && <span>Profile</span>}
          </button>
          <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} text-red-500 hover:text-red-400`} onClick={handleSignOut}>
            <FiLogOut className="text-xl" /> {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#D09683] text-[#330000] rounded-3xl shadow-2xl m-4 flex flex-col">
        {activeView === "home" && (
          <div>
            <h2 className="text-4xl font-bold mb-6">Tenant Requests</h2>
            <ul>
              {requests.map((request) => (
                <li key={request.id} className="bg-white p-4 rounded-lg shadow-md mb-2 text-black">
                  {request.description} - Status: {request.status}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeView === "raiseIssue" && (
          <div>
            <h2 className="text-4xl font-bold mb-6">Issue List</h2>
            <ul>
              {issues.map((issue) => (
                <li key={issue.id} className="bg-white p-4 rounded-lg shadow-md mb-2 text-black">
                  {issue.issue} - Status: {issue.status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#4F3D3D] p-6 rounded-lg shadow-xl w-96 text-center">
            <FiUser className="text-6xl text-[#D09683] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#D09683]">Tenant Profile</h2>
            <p className="text-white mt-2">Name: {tenant.tenant_name}</p>
            <p className="text-white">Email: {tenant.email}</p>
            <p className="text-white">Phone: {tenant.mobile_number}</p>
            <p className="text-white">Family Count: {tenant.family_count}</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" 
              onClick={() => setIsProfileOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;
