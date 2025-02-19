import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/account/profile', label: 'Profile' },
  { path: '/account/add-business', label: 'Add Business' },
  { path: '/account/my-businesses', label: 'My Businesses' },
];

const LeftMenu = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <ul className="space-y-2">
        {menuItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `block rounded-md px-4 py-2 transition duration-300 ${
                  isActive
                    ? 'bg-blue-600 font-semibold text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;
