
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Employee Email */}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-[#ababab]"
          >
            Employee Email
          </label>
          <div className="flex items-center rounded-lg bg-[#1f1f1f] p-5">
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              className="w-full bg-transparent text-white outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="login-password"
            className="mb-2 block text-sm font-medium text-[#ababab]"
          >
            Password
          </label>
          <div className="flex items-center rounded-lg bg-[#1f1f1f] p-5">
            <input
              id="login-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full bg-transparent text-white outline-none"
              required
            />
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-yellow-400 py-4 font-semibold text-black"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
