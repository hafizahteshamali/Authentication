import { useState } from "react";
import { useForm } from "react-hook-form";
import { PostReq } from "../../Api/axios";

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await PostReq("/forgot-password", data);

      if (response?.status === 200) {
        setMessage("Password reset instructions sent to your email.");
      } else {
        setMessage("Failed to send reset instructions. Try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Enter your registered email to reset your password.
        </p>

        {message && (
          <p className="text-center text-sm text-blue-600 bg-blue-100 p-2 rounded mb-4">
            {message}
          </p>
        )}

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
