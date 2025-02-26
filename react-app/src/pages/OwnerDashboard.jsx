import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUserPlus, FiAlertCircle, FiHome, FiUser } from "react-icons/fi";

const OwnerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [tenants, setTenants] = useState([]);
  const [issues, setIssues] = useState([]);
  const [owner, setOwner] = useState({ name: "", email: "" });
  const [requestedTenants, setRequestedTenants] = useState([]);
  

  useEffect(() => {
    fetch("your-api-url/tenants")
      .then(response => response.json())
      .then(data => setTenants(data))
      .catch(error => console.error("Error fetching tenants:", error));
    
    fetch("your-api-url/issues")
      .then(response => response.json())
      .then(data => setIssues(data))
      .catch(error => console.error("Error fetching issues:", error));
    
    fetch("your-api-url/owner")
      .then(response => response.json())
      .then(data => setOwner(data))
      .catch(error => console.error("Error fetching owner details:", error));
    
    fetch("your-api-url/requested-tenants")
      .then(response => response.json())
      .then(data => setRequestedTenants(data))
      .catch(error => console.error("Error fetching requested tenants:", error));
  }, []);

  return (
    <div className="h-screen w-screen flex bg-[#330000] text-white">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-32"} bg-[#3E2C2C] h-full shadow-xl border-r-4 border-[#C4A38A] flex flex-col p-3`}>

        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className={`transition-all duration-300 mb-6 ${isSidebarOpen ? "text-[#B5927B] text-2xl self-end" : "text-[#A57B65] text-3xl self-center"}`}
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Dashboard Title (Only visible when open) */}
        {isSidebarOpen && <h2 className="text-2xl font-bold text-[#D6B8A4] mb-6">Dashboard</h2>}

        {/* Sidebar Buttons */}
        <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} mb-4 text-[#B5927B] hover:text-[#A57B65]`} onClick={() => setActiveView("home")}> 
          <FiHome className={`${isSidebarOpen ? "text-xl" : "text-2xl text-[#A57B65]"}`} /> {isSidebarOpen && <span>Home</span>}
        </button>

        <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} mb-4 text-[#B5927B] hover:text-[#A57B65]`} onClick={() => setActiveView("addTenant")}> 
          <FiUserPlus className={`${isSidebarOpen ? "text-xl" : "text-2xl text-[#A57B65]"}`} /> {isSidebarOpen && <span>Add Tenant</span>}
        </button>

        <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} text-[#B5927B] hover:text-[#A57B65]`} onClick={() => setActiveView("issues")}> 
          <FiAlertCircle className={`${isSidebarOpen ? "text-xl" : "text-2xl text-[#A57B65]"}`} /> {isSidebarOpen && <span>Issue List</span>}
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#D09683] text-[#330000] rounded-3xl shadow-2xl m-4 flex flex-col">
        {activeView === "home" && (
          <div>
            <h2 className="text-4xl font-bold mb-6">Available Tenants</h2>
            <ul>
              {tenants.map((tenant) => (
                <li key={tenant.id} className="bg-white p-4 rounded-lg shadow-md mb-2 text-black">
                  {tenant.name} - {tenant.phone}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeView === "addTenant" && (
          <div>
            <h2 className="text-4xl font-bold mb-6">Requested Tenants</h2>
            <ul>
              {requestedTenants.map((tenant) => (
                <li key={tenant.id} className="bg-white p-4 rounded-lg shadow-md mb-2 text-black">
                  {tenant.name} - {tenant.phone} <button className="ml-4 p-2 bg-green-500 text-white rounded">Approve</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeView === "issues" && (
          <div>
            <h2 className="text-4xl font-bold mb-6">Issue List</h2>
            <ul>
              {issues.map((issue) => (
                <li key={issue.id} className="bg-white p-4 rounded-lg shadow-md mb-2 text-black">
                  {issue.issue} - Raised by {issue.tenant}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Profile Panel */}
      <div className="w-72 bg-[#4F3D3D] h-full shadow-xl border-l-4 border-[#D09683] flex flex-col items-center p-5">
        <FiUser className="text-6xl text-[#D09683] mb-4" />
        <h2 className="text-2xl font-bold text-[#D09683] mb-2">Owner Profile</h2>
        <p className="text-white">{owner.name}</p>
        <p className="text-white">{owner.email}</p>
      </div>
    </div>
  );
};

export default OwnerDashboard;
