import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'; 
import ItemDetails from './item-details';

const Stack = createStackNavigator();

export default function App() {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home}   options={{ headerShown: false }} />
          <Stack.Screen name="ItemDetails" component={ItemDetails}   options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
