import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Import the logo

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#330000] text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?luxury,home,mansion')" }}></div>

      {/* Content Box */}
      <div className="z-10 text-center p-10 bg-[#73605B] bg-opacity-90 rounded-3xl shadow-2xl border-4 border-[#D09683] w-[50%] flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-32 mb-6" /> {/* Logo */}
        <h1 className="text-5xl font-extrabold mb-6 text-[#D09683] drop-shadow-lg">Welcome to Luxury Living</h1>
        <p className="text-lg mb-6 text-gray-200">Choose your role to get started</p>
        
        {/* Buttons - Now Fully Centered */}
        <div className="flex justify-center items-center space-x-8 w-full"> 
          <button className="px-8 py-4 bg-[#D09683] text-[#330000] font-bold text-xl rounded-xl shadow-lg transition-all transform hover:scale-105 hover:bg-opacity-90" 
            onClick={() => navigate("/auth?role=owner")}>Owner</button>
          <button className="px-8 py-4 bg-white text-[#330000] font-bold text-xl rounded-xl shadow-lg transition-all transform hover:scale-105 hover:bg-gray-200" 
            onClick={() => navigate("/auth?role=vendor")}>Vendor</button>
          <button className="px-8 py-4 bg-[#D09683] text-[#330000] font-bold text-xl rounded-xl shadow-lg transition-all transform hover:scale-105 hover:bg-opacity-90" 
            onClick={() => navigate("/auth?role=tenant")}>Tenant</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
