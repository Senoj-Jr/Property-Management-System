import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SignInSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/SignIn/${role}`, formData);
      
      localStorage.setItem("User",JSON.stringify(response.data)) // Show success message
      alert("Login successfull!!")
      // Store JWT Token if authentication is implemented
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }//

      // Redirect based on role
      if (role === "owner") navigate("/owner-dashboard");
      else if (role === "vendor") navigate("/vendor-dashboard");
      else if (role === "tenant") navigate("/tenant-dashboard");
      else alert("Invalid role!");

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#330000] text-white relative p-6">
      {/* Background Blur Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?luxury,interior')" }}
      ></div>

      {/* Form Box */}
      <div className="z-10 p-12 bg-[#73605B] bg-opacity-95 rounded-3xl shadow-2xl border-4 border-[#D09683] w-full max-w-lg flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-8 text-[#D09683] drop-shadow-lg">
          Login as {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-400 font-bold">{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-3/4 p-4 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-3/4 p-4 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="mt-6 px-10 py-4 bg-[#D09683] text-[#330000] font-bold text-xl rounded-xl shadow-lg transition-all transform hover:scale-105 hover:bg-opacity-90"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OR Separator */}
        <div className="my-10 flex items-center w-full max-w-lg">
          <hr className="flex-grow border-[#D09683]" />
          <span className="mx-4 text-[#D09683] font-semibold">OR</span>
          <hr className="flex-grow border-[#D09683]" />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-6">Don't have an account?</h2>
          <button
            onClick={() => navigate(`/signup/${role}`)}
            className="px-10 py-4 bg-white text-[#330000] font-bold text-lg rounded-xl shadow-lg transition-all transform hover:scale-105 hover:bg-gray-200"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;

