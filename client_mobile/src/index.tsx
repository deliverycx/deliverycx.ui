/* eslint-disable @typescript-eslint/no-var-requires */
import './styles/scss/style.scss';
import './styles/index.css';
import 'reflect-metadata';

import App from 'application/App';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  QueryClient as NewQueryClient,
  QueryClientProvider as NewQueryClientProvider,
} from '@tanstack/react-query';

const newQueryClient = new NewQueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <NewQueryClientProvider client={newQueryClient}>
      <App />
    </NewQueryClientProvider>
  </QueryClientProvider>,
);
