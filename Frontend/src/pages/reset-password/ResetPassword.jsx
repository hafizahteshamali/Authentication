import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { PostReq } from "../../Api/axios";

const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"
    const { token } = useParams();

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType("error");
            return;
        }
        try {
            const response = await PostReq(`/reset-password/${token}`, {
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            });

            if (response?.status === 200) {
                setMessage("Password reset successfully. You can now log in.");
                setMessageType("success");
            } else {
                setMessage("Failed to reset password. Try again.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred while resetting the password.");
            setMessageType("error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

                {message && (
                    <p className={`text-center text-sm p-2 rounded mb-4 ${messageType === "success" ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* New Password Field */}
                    <div className="flex flex-col relative">
                        <label htmlFor="newPassword" className="mb-1 text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters long" },
                            })}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-10 text-gray-500 focus:outline-none"
                        >
                            {showNewPassword ? "Hide" : "Show"}
                        </button>
                        {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword.message}</span>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col relative">
                        <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) => value === watch("newPassword") || "Passwords do not match",
                            })}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 text-gray-500 focus:outline-none"
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
