import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  placeholder?: string;
}

export const Input = ({placeholder, ...props}: Props) => {
  return (
    <TextInput style={styles.input} placeholder={placeholder} {...props} />
  );
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
