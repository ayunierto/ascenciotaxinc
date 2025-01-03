import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import LoadingScreen from '../screens/loading/LoadingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyScreen from '../screens/auth/VerifyScreen';
import HomeScreen from '../screens/home/HomeScreen';
import BookingScreen from '../screens/booking/BookingScreen';
import ResumeScreen from '../screens/booking/ResumeScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  VerifyScreen: undefined;
  HomeScreen: undefined;
  BookingScreen: undefined;
  ResumeScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="ResumeScreen" component={ResumeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
