import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom"; // Import navigate
import { FiMenu, FiX, FiUserPlus, FiAlertCircle, FiHome, FiUser, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { CCard, CCardBody, CCardLink, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react'

const OwnerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [tenants, setTenants] = useState([]);
  const [issues, setIssues] = useState([]);
  const [owner, setOwner] = useState({ owner_id:"",owner_name: "", email: "", mobile_number: "", address: "" });
  const [requestedTenants, setRequestedTenants] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  useEffect(() => {
    // Fetch local storage data
    const storedOwner = localStorage.getItem("User");
    if (storedOwner) {
      setOwner(JSON.parse(storedOwner));
    }
  
    if (owner?.owner_id) {
      // Fetch accepted requests
      axios.get(`http://localhost:8080/Owner/Accepted-Request/${owner.owner_id}`)
        .then((response) => {
          console.log("Accepted Requests:", response.data); // Debugging step
          const extractedTenants = response.data.map((request) => request.tenants);
          setTenants(extractedTenants);
        })
        .catch((error) => console.error("Error fetching accepted requests:", error));
  
      // Fetch pending issues
      axios.get(`http://localhost:8080/Owner/PendingIssue/${owner.owner_id}`)
        .then((response) => {
          console.log("Issues Related to Owner:", response.data);
          setIssues(response.data);
        })
        .catch((err) => console.error("Error fetching pending issues:", err));
  
      // Fetch pending requests
      axios.get(`http://localhost:8080/Owner/Pending-Request/${owner.owner_id}`)
        .then((response) => {
          console.log("Pending Requests:", response.data); // Debugging step
          const extractedPendingTenants = response.data.map((request) => request.tenants);
          setRequestedTenants(extractedPendingTenants);
        })
        .catch((err) => console.error("Error fetching pending tenant requests:", err));
    }
  }, [owner?.owner_id]); // Dependency array corrected
  

  // Logout function
  const handleSignOut = () => {
    localStorage.removeItem("User"); // Clear local storage
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="h-screen w-screen flex bg-[#330000] text-white">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-32"} bg-[#3E2C2C] h-full shadow-xl border-r-4 border-[#C4A38A] flex flex-col p-3`}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className={`transition-all duration-300 mb-6 ${isSidebarOpen ? "text-[#B5927B] text-2xl self-end" : "text-[#A57B65] text-3xl self-center"}`}
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        {isSidebarOpen && <h2 className="text-2xl font-bold text-[#D6B8A4] mb-6">Dashboard</h2>}

        <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} mb-4 text-[#B5927B] hover:text-[#A57B65]`} onClick={() => setActiveView("home")}> 
          <FiHome className="text-xl" /> {isSidebarOpen && <span>Home</span>}
        </button>

        <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} mb-4 text-[#B5927B] hover:text-[#A57B65]`} onClick={() => setActiveView("addTenant")}> 
          <FiUserPlus className="text-xl" /> {isSidebarOpen && <span>Add Tenant</span>}
        </button>

        <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} text-[#B5927B] hover:text-[#A57B65]`} onClick={() => setActiveView("issues")}> 
          <FiAlertCircle className="text-xl" /> {isSidebarOpen && <span>Issue List</span>}
        </button>

        {/* Logout & Profile Buttons */}
        <div className="mt-auto">
          <button className={`flex ${isSidebarOpen ? "items-center space-x-2 text-lg" : "justify-center"} text-[#B5927B] hover:text-[#A57B65] mb-4`} onClick={() => setIsProfileOpen(true)}>
            <FiUser className="text-xl" /> {isSidebarOpen && <span>Owner Profile</span>}
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
            <h2 className="text-4xl font-bold mb-6">Available Tenants</h2>
            <ul>
              {tenants.map((tenant) => (
                <li key={tenant.tenant_id} className="bg-white p-4 rounded-lg shadow-md mb-2 text-black">
                  {tenant.tenant_name} - {tenant.email}
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
                <li key={tenant.tenant_id} className="bg-white p-4 rounded-lg shadow-md mb-2 text-black">
                  {tenant.tenant_name} - {tenant.mobile_number} <button className="ml-4 p-2 bg-green-500 text-white rounded">Approve</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeView === "issues" && (
          <CCard style={{ width: '18rem' }}>
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardSubtitle className="mb-2 text-body-secondary">Card subtitle</CCardSubtitle>
            <CCardText>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </CCardText>
            <CCardLink href="#">Card link</CCardLink>
            <CCardLink href="#">Another link</CCardLink>
          </CCardBody>
        </CCard>
        
        )}
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#4F3D3D] p-6 rounded-lg shadow-xl w-96 text-center">
            <FiUser className="text-6xl text-[#D09683] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#D09683]">Owner Profile</h2>
            <p className="text-white mt-2">Name: {owner.owner_name}</p>
            <p className="text-white">Email: {owner.email}</p>
            <p className="text-white">Phone: {owner.mobile_number}</p>
            <p className="text-white">Address: {owner.address}</p>
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

export default OwnerDashboard;
