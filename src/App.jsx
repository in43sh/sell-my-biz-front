import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthProvider';
import ScrollToTopLayout from './components/layouts/ScrollToTopLayout';
import MainLayout from './components/layouts/MainLayout';
import Router from './routes/Router';

function App() {
  return (
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
  );
}

export default App;
