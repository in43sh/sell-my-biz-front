import { useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import {
  updateProfile,
  updatePassword,
  deleteAccount,
} from '../../api/DBRequests';
import InputField from '../../components/form/InputField';
import DeleteAccountModal from '../../components/common/DeleteAccountModal';

const Profile = () => {
  const { token, userData, setUserData, clearUserSession } = useAuth();

  const [profile, setProfile] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleProfileSave = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await updateProfile(headers, profile, token);

      if (response.data?.user) {
        setUserData(response.data.user);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccessMessage('Profile updated successfully!');
        setIsEditingProfile(false);
      } else {
        setProfileError('API response does not contain updated user data.');
      }
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile');
    }
  };

  const handlePasswordSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await updatePassword(headers, passwords, token);

      if (response.data?.message) {
        setSuccessMessage('Password updated successfully!');
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setIsEditingPassword(false);
      } else {
        setPasswordError('API response does not contain success message.');
      }
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount({ Authorization: `Bearer ${token}` });
      setSuccessMessage('Your account has been deleted.');
      clearUserSession();
    } catch (error) {
      setDeleteError(error.message || 'Failed to delete account.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <SectionTitle title="Personal Profile" />

        <EditableSection
          title="Profile Details"
          isEditing={isEditingProfile}
          onEdit={() => setIsEditingProfile(true)}
          onCancel={() => setIsEditingProfile(false)}
          onSave={handleProfileSave}
        >
          <InputField
            id="firstName"
            name="firstName"
            label="First Name"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            required
            error={profileError}
            disabled={!isEditingProfile}
          />
          <InputField
            id="lastName"
            name="lastName"
            label="Last Name"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            required
            error={profileError}
            disabled={!isEditingProfile}
          />
          <InputField
            id="email"
            name="email"
            label="Email"
            value={profile.email}
            disabled
          />
        </EditableSection>

        <EditableSection
          title="Change Password"
          isEditing={isEditingPassword}
          onEdit={() => setIsEditingPassword(true)}
          onCancel={() => setIsEditingPassword(false)}
          onSave={handlePasswordSave}
        >
          <InputField
            id="currentPassword"
            name="currentPassword"
            type="password"
            label="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
            required
            error={passwordError}
            disabled={!isEditingPassword}
          />
          <InputField
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            required
            error={passwordError}
            disabled={!isEditingPassword}
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            required
            error={passwordError}
            disabled={!isEditingPassword}
          />
        </EditableSection>

        <div className="mt-8 space-y-4 border-t pt-6">
          <SectionTitle title="Delete Account" danger />
          <p className="text-sm text-gray-600">
            Warning: This action is irreversible. Once deleted, all data will be
            lost.
          </p>
          {deleteError && <ErrorMessage message={deleteError} />}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full cursor-pointer rounded-md bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Delete My Account
          </button>
        </div>
        {successMessage && <SuccessMessage message={successMessage} />}
      </div>

      {showDeleteModal && (
        <DeleteAccountModal
          title="Confirm Account Deletion"
          message="Are you sure you want to delete your account? This action cannot be undone."
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
          confirmText="Delete Account"
          confirmClass="bg-red-600 hover:bg-red-700"
        />
      )}
    </div>
  );
};

export default Profile;

/** ---------------------------------
 *   Reusable Components
 * --------------------------------- */

const SectionTitle = ({ title, danger }) => (
  <h1
    className={`text-lg font-semibold ${danger ? 'text-red-600' : 'text-gray-800'}`}
  >
    {title}
  </h1>
);

const EditableSection = ({
  title,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  children,
}) => (
  <div className="mt-8 space-y-6 border-t pt-6">
    <SectionTitle title={title} />
    {children}
    <ActionButtons
      isEditing={isEditing}
      onEdit={onEdit}
      onCancel={onCancel}
      onSave={onSave}
    />
  </div>
);

const ActionButtons = ({
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onConfirm,
  confirmText,
  confirmClass,
}) => (
  <div className="flex justify-between">
    {isEditing ? (
      <>
        <button
          onClick={onCancel}
          className="w-1/2 cursor-pointer rounded-md bg-gray-300 py-2 text-gray-700 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onSave || onConfirm}
          className={`ml-2 w-1/2 rounded-md py-2 text-white ${confirmClass || 'cursor-pointer bg-blue-600 hover:bg-blue-700'}`}
        >
          {confirmText || 'Save'}
        </button>
      </>
    ) : (
      <button
        onClick={onEdit}
        className="w-full cursor-pointer rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Edit
      </button>
    )}
  </div>
);

const ErrorMessage = ({ message }) => (
  <p className="text-sm text-red-500">{message}</p>
);
const SuccessMessage = ({ message }) => (
  <p className="mt-4 text-sm text-green-600">{message}</p>
);
