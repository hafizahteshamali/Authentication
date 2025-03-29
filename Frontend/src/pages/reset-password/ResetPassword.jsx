import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PostReq } from '../../Api/axios';

const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const {token} = useParams()

    const onSubmit = async(data) => {
        if(data.newPassword !== data.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            const response = await PostReq(`/reset-password/${token}`, {
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            })
            console.log(response);
            setMessage("Password reset successfully.");
        } catch (error) {
            setMessage("An error occurred while resetting the password.");
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col relative">
                        <label htmlFor="newPassword" className="mb-1 text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            {...register('newPassword', { required: 'New password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-10 text-gray-500 focus:outline-none"
                        >
                            {showNewPassword ? 'Hide' : 'Show'}
                        </button>
                        {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword.message}</span>}
                    </div>

                    <div className="flex flex-col relative">
                        <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            {...register('confirmPassword', { required: 'Confirm password is required' })}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 text-gray-500 focus:outline-none"
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Reset Password
                    </button>
                </form>

                {message && <p className="mt-4 text-center text-sm text-green-500">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
