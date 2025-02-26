import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupOwner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    aadhar: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      setPasswordMatch(formData.password === e.target.value || formData.confirmPassword === e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Preparing data to match your Spring Boot `Owners` model
    const ownerData = {
      owner_name: formData.name,
      email: formData.email,
      mobile_number: formData.phone,
      address: formData.address,
      password: formData.password,
    };
  
    try {
      const response = await fetch("http://localhost:8080/SignUp/Owners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ownerData),
      });
  
      if (response.ok) {
        alert("Signup Successful!");
        navigate("/owner-dashboard");
      } else {
        alert("Signup Failed! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error connecting to the server.");
    }
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }
  //   alert("Form Submitted Successfully");
  //   console.log(formData);
  //   navigate("/owner-dashboard");
  // };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#330000] text-white relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?luxury,architecture')" }}></div>

      {/* Form Box */}
      <div className="z-10 p-10 bg-[#73605B] bg-opacity-95 rounded-3xl shadow-2xl border-4 border-[#D09683] w-[40%] flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-6 text-[#D09683] drop-shadow-lg">Owner Signup</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="w-3/4 p-3 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-3/4 p-3 mt-4 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
          />

          {/* Phone Number & DOB in Same Row */}
          <div className="flex w-3/4 gap-4 mt-4">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="flex-1 p-3 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
            />
           <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="flex-1 p-3 rounded-lg text-gray-500 bg-white outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
            />
          </div>

          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            required
            placeholder="Aadhar Number"
            className="w-3/4 p-3 mt-4 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="House Address"
            className="w-3/4 p-3 mt-4 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-3/4 p-3 mt-4 rounded-lg text-black outline-none shadow-md focus:ring-2 focus:ring-[#D09683] transition"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            className={`w-3/4 p-3 mt-4 rounded-lg text-black outline-none shadow-md focus:ring-2 transition ${passwordMatch ? "focus:ring-[#D09683]" : "focus:ring-red-500 border-red-500"}`}
          />
          {!passwordMatch && <p className="text-red-500 mt-2">Passwords do not match!</p>}

          {/* Submit Button */}
          <button type="submit" className="mt-6 px-8 py-3 bg-[#D09683] text-[#330000] font-bold text-xl rounded-xl shadow-lg transition-all transform hover:scale-105 hover:bg-opacity-90">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupOwner;
