import { useAuth } from '../../contexts/AuthProvider';

const Profile = () => {
  const { userData } = useAuth();

  return (
    <div className="mx-auto w-full max-w-xl p-4 md:w-2/3 lg:w-3/4">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 border-b pb-3">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            Personal Profile
          </h1>
        </div>
        <div className="space-y-4">
          <div className="flex items-center border-b border-gray-200 pb-3">
            <p className="ml-3 text-xl text-gray-700">
              {`${userData.firstName} ${userData.lastName}`}
            </p>
          </div>
          <div className="flex items-center border-b border-gray-200 pb-3">
            <p className="ml-3 text-xl text-gray-700">{userData.email}</p>
          </div>
          <div className="flex items-center border-b border-gray-200 pb-3">
            <p className="ml-3 text-xl text-gray-700">
              {userData.location || 'Not specified'}
            </p>
          </div>
          <div className="text-center">
            <button className="w-full cursor-pointer rounded-md bg-blue-600 py-2 font-semibold text-white shadow-sm transition duration-300 hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
