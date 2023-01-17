import './App.css';
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom';
import { RoutingTable } from './pages/RoutingTable';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster position='top-left'/>
        <RoutingTable/>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
