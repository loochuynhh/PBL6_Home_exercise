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
            })
        } catch (error) {
            console.error("Error API forgot password", error);

            toast.error('Username does not exist !!!', {
                autoClose: 3000
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-screen items-center justify-around">
            <h1 className="text-5xl font-bold font-heading">Forgot Password</h1>
            <div className="flex w-1/5 justify-between items-center">
                <label className="text-xl mr-2 mt-2">Username:</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="border border-gray-300 ml-2 p-2"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
                onClick={handleForgotPassword}
            >
                {loading
                    ? <>Please wait <span className="loader ml-2"></span></>
                    : 'Get new password'
                }
            </button>
        </div>
    );
}

export default ForgotPassword;