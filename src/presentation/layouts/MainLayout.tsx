import React from 'react';
import {View} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;

  rightActionIcons?: React.ReactElement | React.ReactElement[];

  children: React.ReactNode;
}

export const MainLayout = ({
  // title = '',
  // rightActionIcons,
  children,
}: Props) => {
  // const {top} = useSafeAreaInsets();

  // const {canGoBack, goBack} = useNavigation();

  return (
    <View>
      {/* <Appbar.Header style={{backgroundColor: theme.colors.primary}}> */}
      {/* {canGoBack() && ( */}
      {/* <Appbar.BackAction onPress={goBack} color={theme.colors.onPrimary} /> */}
      {/* )} */}
      {/* <Appbar.Content title={title} color={theme.colors.onPrimary} /> */}
      {/* {rightActionIcons && rightActionIcons} */}
      {/* </Appbar.Header> */}
      {children}
    </View>
  );
};

export default MainLayout;
