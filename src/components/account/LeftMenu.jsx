import { NavLink } from 'react-router-dom';

const LeftMenu = () => {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <NavLink
          to="/account/profile"
          className={({ isActive }) =>
            isActive ? 'text-primary font-weight-bold' : 'text-dark'
          }
        >
          Profile
        </NavLink>
      </li>
      <li className="list-group-item">
        <NavLink
          to="/account/add-business"
          className={({ isActive }) =>
            isActive ? 'text-primary font-weight-bold' : 'text-dark'
          }
        >
          Add Business
        </NavLink>
      </li>
      <li className="list-group-item">
        <NavLink
          to="/account/my-businesses"
          className={({ isActive }) =>
            isActive ? 'text-primary font-weight-bold' : 'text-dark'
          }
        >
          My Businesses
        </NavLink>
      </li>
    </ul>
  );
};

export default LeftMenu;
