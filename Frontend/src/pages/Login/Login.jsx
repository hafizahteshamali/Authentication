import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PostReq } from "../../Api/axios.js";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await PostReq("/login", data);

      if (response?.status === 200) {
        console.log("Login Successful:", response.data);
        navigate("/dashboard"); // Redirect user after login
      } else {
        console.error("Login Failed:", response);
      }
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 ${
                errors.Email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.Email && <p className="mt-1 text-sm text-red-500">{errors.Email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 ${
                errors.Password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.Password && <p className="mt-1 text-sm text-red-500">{errors.Password.message}</p>}
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className={`w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring-2 ${
                errors.Role ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              {...register("Role", { required: "Role is required" })}
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.Role && <p className="mt-1 text-sm text-red-500">{errors.Role.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Additional Links */}
        <div className="flex justify-between mt-4">
          <a href="/forgotpassword" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
          <a href="/create-account" className="text-sm text-blue-500 hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
