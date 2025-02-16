// TODO
// TO BE DELETED
import { createContext, useContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [currentBusinessId, setCurrentBusinessId] = useState(
    sessionStorage.getItem('currentBusinessId') || ''
  );

  useEffect(() => {
    sessionStorage.setItem('currentBusinessId', currentBusinessId);
  }, [currentBusinessId]);

  const clearAccount = () => {
    setCurrentBusinessId('');
  };

  return (
    <AccountContext.Provider
      value={{
        currentBusinessId,
        setCurrentBusinessId,
        clearAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node,
};
