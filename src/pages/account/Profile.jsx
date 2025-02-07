import { useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import {
  updateProfile,
  updatePassword,
  deleteAccount,
} from '../../api/DBRequests';

const Profile = () => {
  const { token, userData, setUserData, clearUserSession } = useAuth();
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email] = useState(userData.email);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [profileError, setProfileError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleProfileSave = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const profileData = {
        firstName,
        lastName,
      };

      const response = await updateProfile(headers, profileData, token);

      if (response.data?.user) {
        setUserData(response.data.user);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccessMessage('Profile updated successfully!');
        setIsEditingProfile(false);
      } else {
        setProfileError('API response does not contain updated user data.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setProfileError(err.message || 'Failed to update profile');
    }
  };

  const handlePasswordSave = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const passwordData = {
        currentPassword,
        newPassword,
      };
      const response = await updatePassword(headers, passwordData, token);

      if (response.data?.message) {
        setSuccessMessage('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsEditingPassword(false);
      } else {
        setPasswordError('API response does not contain success message.');
      }
    } catch (err) {
      console.error('Error updating password:', err);
      setPasswordError(err.message || 'Failed to update password');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      await deleteAccount(headers);
      setSuccessMessage('Your account has been deleted.');
      clearUserSession();
    } catch (error) {
      console.error('Error deleting account:', error);
      setDeleteError(error.message || 'Failed to delete account.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl p-6">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 border-b pb-3">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            Personal Profile
          </h1>
        </div>

        {/* Edit Profile Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Details
          </h2>

          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditingProfile}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditingProfile}
            />
          </div>

          {/* Email (Not Editable) */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 p-2 text-lg text-gray-500"
              value={email}
              disabled
            />
          </div>
          {profileError && (
            <p className="mt-4 text-sm text-red-600">{profileError}</p>
          )}

          {/* Profile Buttons */}
          <div className="flex justify-between">
            {isEditingProfile ? (
              <>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="w-1/2 rounded-md bg-gray-300 py-2 font-semibold text-gray-700 transition hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  className="ml-2 w-1/2 rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="w-full cursor-pointer rounded-md bg-blue-600 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mt-8 space-y-6 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Change Password
          </h2>

          {/* Current Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
          </div>

          {/* Password Error Message */}
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}

          {/* Password Buttons */}
          <div className="flex justify-between">
            {isEditingPassword ? (
              <>
                <button
                  onClick={() => setIsEditingPassword(false)}
                  className="w-1/2 rounded-md bg-gray-300 py-2 font-semibold text-gray-700 transition hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSave}
                  className="ml-2 w-1/2 rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditingPassword(true)}
                className="w-full cursor-pointer rounded-md bg-blue-600 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Change Password
              </button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <p className="mt-4 text-sm text-green-600">{successMessage}</p>
        )}

        {/* Account Deletion Section */}
        <div className="mt-8 space-y-6 border-t pt-6">
          <h2 className="text-lg font-semibold text-red-600">Delete Account</h2>
          <p className="text-sm text-gray-600">
            Warning: This action is irreversible. Once you delete your account,
            all your data will be lost.
          </p>

          {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}

          {showDeleteConfirm ? (
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-1/2 cursor-pointer rounded-md bg-gray-300 py-2 font-semibold text-gray-700 transition hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="ml-2 w-1/2 cursor-pointer rounded-md bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full cursor-pointer rounded-md bg-red-600 py-2 font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              Delete My Account
            </button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <p className="mt-4 text-sm text-green-600">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
