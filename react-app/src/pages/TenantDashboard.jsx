import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUserCheck, FiAlertCircle, FiHome, FiUser } from "react-icons/fi";

const TenantDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);
  const [tenant, setTenant] = useState({ name: "", email: "" });
  const [owner, setOwner] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    fetch("your-api-url/tenant")
      .then(response => response.json())
      .then(data => setTenant(data))
      .catch(error => console.error("Error fetching tenant details:", error));

    fetch("your-api-url/owner")
      .then(response => response.json())
      .then(data => {
        if (data) {
          setOwner(data);
          setIsRequestAccepted(true);
        }
      })
      .catch(error => console.error("Error fetching owner details:", error));
  }, []);

  const handleRequestOwner = (e) => {
    e.preventDefault();
    console.log("Request Sent to Owner:", formData);
    setIsRequestAccepted(true);
    setOwner({ name: formData.name, phone: formData.phone, address: "Not Available" }); // Temporary data
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#D09683] text-[#330000] rounded-3xl shadow-2xl m-4 flex flex-col">
        {activeView === "home" && (
          <div>
            {isRequestAccepted ? (
              <div>
                <h2 className="text-4xl font-bold mb-6 text-[#330000]">Owner Details</h2>
                <p className="text-xl">Name: <span className="font-semibold">{owner.name}</span></p>
                <p className="text-xl">Address: <span className="font-semibold">{owner.address}</span></p>
                <p className="text-xl">Phone: <span className="font-semibold">{owner.phone}</span></p>
              </div>
            ) : (
              <div>
                <h2 className="text-4xl font-bold mb-6 text-[#330000]">Request Owner</h2>
                <form className="bg-[#E5C3AD] p-6 rounded-lg shadow-md" onSubmit={handleRequestOwner}>
                  <label className="block text-lg font-semibold mb-2 text-[#330000]">Owner Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 mb-4 border border-[#73605B] rounded-lg bg-[#D6B8A4] text-[#330000] placeholder-[#73605B]"
                    placeholder="Enter Owner's Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />

                  <label className="block text-lg font-semibold mb-2 text-[#330000]">Owner Phone Number</label>
                  <input 
                    type="text" 
                    className="w-full p-3 mb-4 border border-[#73605B] rounded-lg bg-[#D6B8A4] text-[#330000] placeholder-[#73605B]"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />

                  <label className="block text-lg font-semibold mb-2 text-[#330000]">Request Message</label>
                  <textarea 
                    className="w-full p-3 mb-4 border border-[#73605B] rounded-lg bg-[#D6B8A4] text-[#330000] placeholder-[#73605B]"
                    placeholder="Write your request message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>

                  <button type="submit" className="w-full p-3 bg-[#73605B] text-white font-bold rounded-lg shadow-md hover:bg-[#A57B65] transition-all">Send Request</button>
                </form>
              </div>
            )}
          </div>
        )}
        {activeView === "raiseIssue" && (
          <div>
            <h2 className="text-4xl font-bold mb-6 text-[#330000]">Raise an Issue</h2>

            <form className="bg-[#E5C3AD] p-6 rounded-lg shadow-md">
              
              {/* Issue Type */}
              <label className="block text-lg font-semibold mb-2 text-[#330000]">Issue Type</label>
              <select 
                className="w-full p-3 mb-4 border border-[#73605B] rounded-lg bg-[#D6B8A4] text-[#330000] placeholder-[#73605B]"
                required
              >
                <option value="">Select Issue Type</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="heating">Heating</option>
                <option value="structural">Structural</option>
                <option value="other">Other</option>
              </select>

              {/* Urgency Level */}
              <label className="block text-lg font-semibold mb-2 text-[#330000]">Urgency Level</label>
              <select 
                className="w-full p-3 mb-4 border border-[#73605B] rounded-lg bg-[#D6B8A4] text-[#330000] placeholder-[#73605B]"
                required
              >
                <option value="">Select Urgency</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              {/* Issue Description */}
              <label className="block text-lg font-semibold mb-2 text-[#330000]">Issue Description</label>
              <textarea 
                className="w-full p-4 mb-4 border border-[#73605B] rounded-lg bg-[#D6B8A4] text-[#330000] placeholder-[#73605B]"
                placeholder="Describe your issue..."
                required
              ></textarea>

              {/* Submit Button */}
              <button 
                className="mt-4 w-full p-4 bg-[#A57B65] text-white font-bold rounded-lg shadow-md hover:bg-[#73605B] transition-all"
              >
                Submit Issue
              </button>

            </form>
          </div>
        )}

        {/* {activeView === "raiseIssue" && (
          <div>
            <h2 className="text-4xl font-bold mb-6 text-[#330000]">Raise an Issue</h2>
            <textarea className="w-full p-4 border rounded-lg bg-[#D6B8A4] text-[#330000] placeholder-[#73605B]" placeholder="Describe your issue..."></textarea>
            <button className="mt-4 p-4 bg-[#A57B65] text-white rounded-lg shadow-md hover:bg-[#73605B] transition-all">Submit</button>
          </div>
        )} */}
      </div>

      {/* Right Profile Panel */}
      <div className="w-72 bg-[#3E2C2C] h-full shadow-xl border-l-4 border-[#C4A38A] flex flex-col items-center p-5">
        <FiUser className="text-6xl text-[#D6B8A4] mb-4" />
        <h2 className="text-2xl font-bold text-[#D6B8A4] mb-2">Tenant Profile</h2>
        <p className="text-[#D6B8A4]">{tenant.name}</p>
        <p className="text-[#D6B8A4]">{tenant.email}</p>
      </div>
    </div>
  );
};

export default TenantDashboard;
