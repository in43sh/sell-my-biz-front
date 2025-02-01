import { Outlet } from 'react-router-dom';
import LeftMenu from '../../components/account/LeftMenu';

const AccountLayout = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <LeftMenu />
        </div>
        <div className="col-lg-9 col-md-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
