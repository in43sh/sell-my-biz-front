import { BrowserRouter } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import Router from './routes/Router';

function App() {
  return (
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
  );
}

export default App;
