import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, MD2Colors, Text, useTheme} from 'react-native-paper';

export const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <View style={{...styles.container, backgroundColor: theme.colors.primary}}>
      <ActivityIndicator animating={true} color={MD2Colors.white} size={50} />
      <Text style={{...styles.title, color: theme.colors.onPrimary}}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '100%',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
  },
});

export default LoadingScreen;
