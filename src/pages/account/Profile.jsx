// import envelopeIcon from '../../assets/images/envelope.png';
// import locationIcon from '../../assets/images/location.png';
// import userIcon from '../../assets/images/user.png';
// import { useAccount } from '../../context/AccountProvider';
import { useAuth } from '../../contexts/AuthProvider';

const Profile = () => {
  console.log('Profile');

  const { userData } = useAuth();
  //   const { setAccountPage } = useAccount();

  //   const handleEditProfile = useCallback(() => {
  //     setAccountPage('EditProfile');
  //   }, [setAccountPage]);

  return (
    <div className="col-lg-9 col-md-8">
      <div className="card border-0 p-4 shadow-sm">
        <div className="card-header border-bottom mb-4 bg-transparent">
          <h1 className="font-headings text-center text-2xl font-bold">
            Personal Profile
          </h1>
        </div>
        <div className="card-body">
          <div className="border-bottom mb-4 flex items-center pb-3">
            {/* <img src={userIcon} alt="User Icon" className="h-6 w-6" /> */}
            <p className="ml-3 text-xl">{`${userData.firstName} ${userData.lastName}`}</p>
          </div>
          <div className="border-bottom mb-4 flex items-center pb-3">
            {/* <img
                  src={envelopeIcon}
                  alt="Envelope Icon"
                  className="h-6 w-6"
                /> */}
            <p className="ml-3 text-xl">{userData.email}</p>
          </div>
          <div className="border-bottom mb-4 flex items-center pb-3">
            {/* <img
                  src={locationIcon}
                  alt="Location Icon"
                  className="h-6 w-6"
                /> */}
            <p className="ml-3 text-xl">
              {userData.location || 'Not specified'}
            </p>
          </div>
          <div className="text-center">
            <button
              as="button"
              //   onClick={handleEditProfile}
              className="btn btn-primary w-100"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
