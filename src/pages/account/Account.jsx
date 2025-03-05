import { useState } from 'react';
import AddBusiness from './AddBusiness';
import MyBusinesses from './MyBusinesses';
import Profile from './Profile';
import LeftMenu from '../../components/account/LeftMenu';

const Account = () => {
  const [activePage, setActivePage] = useState('Profile');

  const accountContent = () => {
    switch (activePage) {
      case 'AddBusiness':
        return <AddBusiness />;
      case 'Profile':
        return <Profile />;
      case 'MyBusinesses':
        return <MyBusinesses />;
      default:
        return <div>Select a page.</div>;
    }
  };

  return (
    <div className="mt-10 w-full px-4">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-1/4">
          <LeftMenu activePage={activePage} setActivePage={setActivePage} />
        </div>
        <div className="w-full rounded-lg bg-white p-4 shadow md:w-3/4">
          {accountContent()}
        </div>
      </div>
    </div>
  );
};

export default Account;
