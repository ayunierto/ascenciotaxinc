import React from 'react';
import {Pressable, StyleSheet, Text, PressableProps, View} from 'react-native';

export const Button: React.FC<
  PressableProps & React.RefAttributes<View>
> = props => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.buttonText}>{props.children as React.ReactNode}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Button;
