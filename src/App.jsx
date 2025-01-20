import { BrowserRouter } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import Router from './routes/Router';
import { AccountProvider } from './contexts/AccountProvider';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
    <AccountProvider>
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <MainLayout>
            <Router />
          </MainLayout>
        </BrowserRouter>
      </AuthProvider>
    </AccountProvider>
  );
}

export default App;
