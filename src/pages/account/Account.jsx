import { useState } from 'react';

import Profile from './Profile';
import LeftMenu from '../../components/account/LeftMenu';

const AccountPage = () => {
  const [activePage, setActivePage] = useState('Profile');

  const accountContent = () => {
    switch (activePage) {
      case 'Profile':
        return <Profile />;
      case 'Orders':
        return <div>Your order history goes here.</div>;
      default:
        return <div>Select a page.</div>;
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <LeftMenu activePage={activePage} setActivePage={setActivePage} />

        <div className="col-lg-9 col-md-8 p-4">
          {/* <h3 className="mb-4">{activePage}</h3> */}
          {accountContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
