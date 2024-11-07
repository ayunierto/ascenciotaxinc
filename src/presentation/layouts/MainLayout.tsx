/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {theme} from '../../config/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;

  rightActionIcons?: React.ReactElement | React.ReactElement[];

  children: React.ReactNode;
}

export const MainLayout = ({title, rightActionIcons, children}: Props) => {
  const {top} = useSafeAreaInsets();

  const {canGoBack, goBack} = useNavigation();

  return (
    <View style={{paddingTop: top, height: '100%'}}>
      <Appbar.Header style={{backgroundColor: theme.colors.primary}}>
        {canGoBack() && (
          <Appbar.BackAction onPress={goBack} color={theme.colors.onPrimary} />
        )}
        <Appbar.Content title={title} color={theme.colors.onPrimary} />
        {rightActionIcons && rightActionIcons}
      </Appbar.Header>
      {children}
    </View>
  );
};

export default MainLayout;
