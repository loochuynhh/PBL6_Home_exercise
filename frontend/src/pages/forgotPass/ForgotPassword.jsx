import axiosInstance from "axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        setLoading(true);
        try {
            await axiosInstance.put(`/api/forgot-password/${username}`);

            toast.success('Your password has been reset and sent to your email. Please check your email.', {
                autoClose: 3000,
                onClose: () => {
                    navigate('/login');
                }
            });
        } catch (error) {
            console.error("Error API forgot password", error);

            toast.error('Username does not exist !!!', {
                autoClose: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-white">
            <div className="bg-gray-100 shadow-xl rounded-lg p-10 w-full max-w-lg text-gray-800">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Forgot Password</h1>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-all duration-300`}
                    onClick={handleForgotPassword}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <span className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-6 w-6 mr-2"></span>
                            Processing...
                        </div>
                    ) : (
                        'Get New Password'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;