
import React, { useState } from "react";

const Register = () => {
  const roles = ["Waiter", "Cashier", "Admin"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Employee Name */}
        <div>
          <label
            htmlFor="employee-name"
            className="mb-2 block text-sm font-medium text-[#ababab]"
          >
            Employee Name
          </label>
          <div className="flex items-center rounded-lg bg-[#1f1f1f] p-5">
            <input
              id="employee-name"
              type="text"
              name="name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleChange}
              className="w-full flex-1 bg-transparent text-white outline-none"
              required
            />
          </div>
        </div>

        {/* Employee Email */}
        <div>
          <label
            htmlFor="employee-email"
            className="mb-2 block text-sm font-medium text-[#ababab]"
          >
            Employee Email
          </label>
          <div className="flex items-center rounded-lg bg-[#1f1f1f] p-5">
            <input
              id="employee-email"
              type="email"
              name="email"
              placeholder="Enter employee email"
              value={formData.email}
              onChange={handleChange}
              className="w-full flex-1 bg-transparent text-white outline-none"
              required
            />
          </div>
        </div>

        {/* Employee Phone */}
        <div>
          <label
            htmlFor="employee-phone"
            className="mb-2 block text-sm font-medium text-[#ababab]"
          >
            Employee Phone
          </label>
          <div className="flex items-center rounded-lg bg-[#1f1f1f] p-5">
            <input
              id="employee-phone"
              type="tel"
              name="phone"
              placeholder="Enter employee phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full flex-1 bg-transparent text-white outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="employee-password"
            className="mb-2 block text-sm font-medium text-[#ababab]"
          >
            Password
          </label>
          <div className="flex items-center rounded-lg bg-[#1f1f1f] p-5">
            <input
              id="employee-password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full flex-1 bg-transparent text-white outline-none"
              required
            />
          </div>
        </div>

        {/* Employee Role */}
        <div>
          <label className="mb-3 block text-sm font-medium text-[#ababab]">
            Choose your role
          </label>

          <div className="flex items-center gap-3">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`w-full rounded-lg px-4 py-3 ${
                  formData.role === role
                    ? "bg-yellow-400 text-black"
                    : "bg-[#1f1f1f] text-[#ababab]"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={!formData.role}
          className="mt-6 w-full rounded-lg bg-yellow-400 py-4 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
