import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import CustomerListPage from './pages/customer-list/CustomerListPage';
import './index.css';

const rootEl = document.getElementById('root');
const page = rootEl?.dataset.page;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page === 'customer-list' ? <CustomerListPage /> : <App />}
  </StrictMode>
);
