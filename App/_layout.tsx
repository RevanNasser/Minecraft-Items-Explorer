import { Slot, Stack } from 'expo-router';  // Slot is used to render the correct page
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Home from './Home';
export default function Layout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Home /> 
    </QueryClientProvider>
  );
}
