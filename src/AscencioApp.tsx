import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {theme} from './config/theme';
import AuthProvider from './presentation/provider/AuthProvider';

export const AscencioApp = () => {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        // eslint-disable-next-line react/no-unstable-nested-components
        icon: props => <IonIcon {...props} />,
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
  );
};

export default AscencioApp;
