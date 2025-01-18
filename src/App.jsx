import { BrowserRouter } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import Router from './routes/Router';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
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
  );
}

export default App;
