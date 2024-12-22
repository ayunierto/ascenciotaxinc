import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {}

export const Input: React.FC<InputProps> = props => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 16,
    color: 'white',
    height: 50,
  },
});

export default Input;
