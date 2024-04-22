import "./styles/scss/style.scss";
import "reflect-metadata";

import App from 'application/App';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";

const container = document.getElementById("root");
const root = createRoot(container!)
const queryClient = new QueryClient()

root.render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>


);

