import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native-gesture-handler';

interface Props extends TouchableOpacityProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button = ({
  title,
  onPress,
  disabled,
  children,
  ...rest
}: Props) => {
  const buttonStyles: any[] = [styles.button];
  const textStyles: any[] = [styles.buttonText];

  if (disabled) {
    buttonStyles.push(styles.disabledButton);
    textStyles.push(styles.disabledButtonText);
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={disabled ? () => {} : onPress}
      {...rest}>
      {children ? (
        <Text style={textStyles}>{children}</Text>
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
    opacity: 0.6,
  },
  disabledButtonText: {
    color: '#444',
    fontWeight: 'bold',
  },
});

export default Button;
