import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLayout from './layouts/AppLayout';
import AppNavigation from './navigation/AppNavigation';
import { navigationRef } from './services/navigation.service';


const App: React.FC = () => {
  return (
      <NavigationContainer ref={navigationRef}>
        <AppLayout>
          <AppNavigation />
        </AppLayout>
      </NavigationContainer>
  );
};

export default App;
