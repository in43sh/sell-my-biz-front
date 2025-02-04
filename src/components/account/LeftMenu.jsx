import { NavLink } from 'react-router-dom';

const LeftMenu = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/account/profile"
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 transition duration-300 ${
                isActive
                  ? 'bg-blue-600 font-semibold text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/add-business"
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 transition duration-300 ${
                isActive
                  ? 'bg-blue-600 font-semibold text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Add Business
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/my-businesses"
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 transition duration-300 ${
                isActive
                  ? 'bg-blue-600 font-semibold text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            My Businesses
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
