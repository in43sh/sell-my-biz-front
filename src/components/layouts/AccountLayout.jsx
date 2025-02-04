import { Outlet } from 'react-router-dom';
import LeftMenu from '../../components/account/LeftMenu';

const AccountLayout = () => {
  return (
    <div className="mt-10 w-full px-4">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <LeftMenu />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
