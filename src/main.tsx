import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nProvider as HeroUIProvider } from '@heroui/react';
import CustomerDetailPage from './pages/customer-detail/CustomerDetailPage';
import CustomerListPage from './pages/customer-list/CustomerListPage';
import LoginPage from './pages/login/LoginPage';
import './index.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('React root element #root was not found.');
}

const page = rootEl.dataset.page;

function renderPage() {
  switch (page) {
    case 'login':
      return <LoginPage />;

    case 'customer-list':
      return <CustomerListPage />;

    case 'customer-detail':
      return <CustomerDetailPage />;

    default:
      throw new Error(`Unknown React page: ${page || '(missing data-page)'}`);
  }
}

createRoot(rootEl).render(
  <StrictMode>
    <HeroUIProvider>
      {renderPage()}
    </HeroUIProvider>
  </StrictMode>
);
