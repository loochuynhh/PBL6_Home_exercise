import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import userIcon from 'assets/other/userIcon.png';
import { azureBlobEndpoint } from '../../common/index';
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/account', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        setUserData({
          ...user,
          birthday: user.birthday ? new Date(user.birthday).toISOString() : '',
        });
        setImagePreview(user.avatarUrl);
        setProfilePic(user.avatarUrl);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setProfilePic(file);
    }
  };

  const handleUploadPic = async () => {
    if (!profilePic) return;

    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('file', profilePic);

    try {
      const response = await axios.post('/api/update-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Avatar updated successfully!');
    } catch (error) {
      toast.error('Failed to update avatar. Please try again.');
    }
  };

  const getAvatarUrl = () => {
    if (imagePreview) {
      if (imagePreview.includes('/user')) {
        return `${azureBlobEndpoint}${imagePreview}`;
      } else {
        return imagePreview;
      }
    }
    return userIcon;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: name === 'birthday' && value ? new Date(`${value}T00:00:00.000Z`).toISOString() : value,
    }));
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.put('/api/account', userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Không tìm thấy dữ liệu người dùng.</p>
      </div>
    );
  }

  return (
    <div className="py-10 pt-0">
      {/* Profile Card */}
      <div className="py-12 w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="bg-white w-full max-w-4xl shadow-2xl rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-44 h-44 bg-blue-300 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-36 h-36 bg-purple-300 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-30"></div>

          <div className="flex flex-col items-center relative mb-8">
            <div className="relative w-40 h-40 rounded-full shadow-lg mb-6 overflow-hidden border-4 border-white">
              <img
                src={getAvatarUrl()}
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="upload-avatar"
                className="absolute inset-0 flex items-center justify-center bg-opacity-30 hover:bg-opacity-50 transition-opacity cursor-pointer rounded-full">
                <input
                  type="file"
                  id="upload-avatar"
                  onChange={handleFileChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition"
              onClick={handleUploadPic} 
              disabled={!profilePic} 
            >
              Update Avatar
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* First Name */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <p className="text-lg pb-2 text-gray-600">Họ:</p>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="text-left rounded-md text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-primary-500 w-full py-2 px-4 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-lg text-gray-500">{userData.firstName || 'Điền họ của bạn'}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <p className="text-lg pb-2 text-gray-600">Tên:</p>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="text-left rounded-md text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-primary-500 w-full py-2 px-4 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-lg text-gray-500">{userData.lastName || 'Điền tên của bạn'}</p>
              )}
            </div>

            {/* Email */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <p className="text-lg pb-2 text-gray-600">Email:</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="text-left rounded-md text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-primary-500 w-full py-2 px-4 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-lg text-gray-500">{userData.email}</p>
              )}
            </div>

            {/* Username */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <p className="text-lg pb-2 text-gray-600">Username:</p>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="text-left rounded-md text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-primary-500 w-full py-2 px-4 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-lg text-gray-500">{userData.username}</p>
              )}
            </div>
            {/* Birthday */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <p className="text-lg pb-2 text-gray-600">Ngày sinh:</p>
              {isEditing ? (
                <input
                  type="date"
                  name="birthday"
                  value={
                    userData.birthday ? new Date(userData.birthday).toISOString().split('T')[0] : ''
                  }
                  onChange={handleChange}
                  className="text-left rounded-md text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-primary-500 w-full py-2 px-4 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-lg font-medium">
                  {userData.birthday ? new Date(userData.birthday).toLocaleDateString() : 'Chưa đặt năm sinh'}
                </p>
              )}
            </div>

            {/* Level */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <p className="text-lg pb-2 text-gray-600">Cấp độ:</p>
              {isEditing ? (
                <select
                  name="level"
                  value={userData.level}
                  onChange={handleChange}
                  className="text-left rounded-md text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-primary-500 w-full py-2 px-4 transition-all ease-in-out duration-300"
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </select>
              ) : (
                <p className="text-lg font-semibold text-primary-700">{userData.level || 'Chưa xác định'}</p>
              )}
            </div>

          </div>

          {/* Edit Profile Button */}
          <div className="flex justify-center mt-10">
            {isEditing ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 font-semibold py-3 px-8 rounded-full shadow-md transition-transform transform hover:scale-105"
                onClick={handleSaveChanges}
              >
                Lưu thay đổi
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 font-semibold py-3 px-8 rounded-full shadow-md transition-transform transform hover:scale-105"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa hồ sơ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <div className="w-[90%] max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lịch sử khóa tập</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Tên khóa học</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Huấn luyện viên</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Thời gian</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Trạng thái</th>
              </tr>
            </thead>
            <tbody>

              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">Yoga cho người mới</td>
                <td className="px-6 py-4">Trần Văn A</td>
                <td className="px-6 py-4">8:00 - 9:00 AM</td>
                <td className="px-6 py-4 text-green-600">Đang tham gia</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">Cardio giảm cân</td>
                <td className="px-6 py-4">Nguyễn Thị B</td>
                <td className="px-6 py-4">7:00 - 8:00 PM</td>
                <td className="px-6 py-4 text-red-600">Đã hoàn thành</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
