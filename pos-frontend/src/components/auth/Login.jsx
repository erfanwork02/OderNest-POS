import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  // Login API Mutation
  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),

   

onSuccess: (res) => {
  const { data } = res;

  dispatch(
    setUser({
      _id: data.data.id,
      name: data.data.name,
      email: data.data.email,
      phone: data.data.phone,
      role: data.data.role,
    })
  );

  enqueueSnackbar(data.message || "Login successful!", {
    variant: "success",
  });
  navigate("/");
},


onError: (error) => {
  const message =
    error.response?.data?.message || "Login failed. Please try again.";

  enqueueSnackbar(message, {
    variant: "error",
  });
},
});


  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
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
          disabled={loginMutation.isPending}
          className="mt-6 w-full rounded-lg bg-yellow-400 py-4 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;

