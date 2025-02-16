import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTopLayout({ children }) {
  const navigationType = useNavigationType();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return <>{children}</>;
}
