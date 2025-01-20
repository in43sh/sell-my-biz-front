const LeftMenu = ({ activePage, setActivePage }) => {
  return (
    <div className="col-lg-3 col-md-4 bg-light border-right">
      <div className="list-group">
        <button
          className={`list-group-item list-group-item-action ${activePage === 'Profile' ? 'active' : ''}`}
          onClick={() => setActivePage('Profile')}
        >
          Profile
        </button>
        <button
          className={`list-group-item list-group-item-action ${activePage === 'Orders' ? 'active' : ''}`}
          onClick={() => setActivePage('Orders')}
        >
          Orders
        </button>
      </div>
    </div>
  );
};

export default LeftMenu;
