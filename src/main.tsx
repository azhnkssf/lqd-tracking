import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as HeroUIProvider } from 'react-aria-components';
import App from './App';
import CustomerDetailPage from './pages/customer-detail/CustomerDetailPage';
import CustomerListPage from './pages/customer-list/CustomerListPage';
import './index.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('React root element #root was not found.');
}

const page = rootEl.dataset.page;

function renderPage() {
  if (page === 'login') {
    return <App />;
  }

  if (page === 'customer-detail') {
    return <CustomerDetailPage />;
  }

  if (page === 'customer-list') {
    return <CustomerListPage />;
  }

  return <App />;
}

createRoot(rootEl).render(
  <StrictMode>
    <HeroUIProvider>
      {renderPage()}
    </HeroUIProvider>
  </StrictMode>
);
