import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import IonIcon from '@react-native-vector-icons/ionicons';
import {theme} from './config/theme';
import AuthProvider from './presentation/provider/AuthProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const AscencioApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider
        theme={theme}
        settings={{
          // eslint-disable-next-line react/no-unstable-nested-components
          icon: (props: any) => <IonIcon {...props} />,
        }}>
        <NavigationContainer
          theme={{
            dark: false,
            colors: {
              primary: theme.colors.primary,
              background: theme.colors.primary,
              card: theme.colors.primaryContainer,
              text: theme.colors.onPrimary,
              border: theme.colors.tertiary,
              notification: theme.colors.primaryContainer,
            },
          }}>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default AscencioApp;
