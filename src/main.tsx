import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import CustomerDetailPage from './pages/customer-detail/CustomerDetailPage';
import CustomerListPage from './pages/customer-list/CustomerListPage';
import './index.css';

const rootEl = document.getElementById('root');
const page = rootEl?.dataset.page;

const root = createRoot(document.getElementById('root')!);

function renderPage() {
  if (page === 'customer-detail') {
    return <CustomerDetailPage />;
  }

  if (page === 'customer-list') {
    return <CustomerListPage />;
  }

  return <App />;
}

root.render(
  <StrictMode>
    {renderPage()}
  </StrictMode>
);
