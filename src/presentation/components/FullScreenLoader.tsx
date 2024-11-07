import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {MD2Colors} from 'react-native-paper';
import {theme} from '../../config/theme';

export const FullScreenLoader = () => {
  return (
    <View style={{...styles.container, backgroundColor: theme.colors.primary}}>
      <ActivityIndicator animating={true} color={MD2Colors.white} size={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginTop: -80,
  },
});

export default FullScreenLoader;
