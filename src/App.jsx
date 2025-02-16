import { BrowserRouter } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
// import { AccountProvider } from './contexts/AccountProvider';
import { AuthProvider } from './contexts/AuthProvider';
import ScrollToTopLayout from './components/layouts/ScrollToTopLayout';
import Router from './routes/Router';

function App() {
  return (
    // <AccountProvider>
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTopLayout>
          <MainLayout>
            <Router />
          </MainLayout>
        </ScrollToTopLayout>
      </BrowserRouter>
    </AuthProvider>
    // </AccountProvider>
  );
}

export default App;
