/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const theme = useTheme();

  const [form, setForm] = useState({
    fullName: 'Test Ten',
    phoneNumber: '917732227',
    email: 'test10@gmail.com',
    password: 'Abc123456',
    confirmPassword: 'Abc123456',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatchMsg, setPasswordMatchMsg] = useState('');

  const checkEqualPasswords = () => {
    if (form.password === form.confirmPassword) {
      setPasswordMatchMsg('');
      return true;
    } else {
      setPasswordMatchMsg('Passwords must match');
      return false;
    }
  };

  const {register} = useAuthStore();

  useEffect(() => {
    checkEqualPasswords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.password, form.confirmPassword]);

  const onRegister = async () => {
    if (form.email.length === 0 || form.password.length <= 6) {
      Alert.alert('Error', 'Please fill in the fields!');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords must match!');
      return;
    }
    setIsLoading(true);
    const wasSuccessful = await register(
      form.fullName,
      form.email,
      form.phoneNumber,
      form.password,
    );
    setIsLoading(false);
    if (wasSuccessful) {
      return;
    }

    Alert.alert(
      'Error',
      'The email address is already in use by another account.',
    );
  };

  return (
    <View style={{...styles.container, backgroundColor: theme.colors.primary}}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.webp')}
            style={styles.banner}
          />
          <Text
            style={{...styles.title, color: theme.colors.onPrimary}}
            variant="displayLarge">
            Sign Up
          </Text>
          <Text style={{color: theme.colors.onPrimary, marginTop: 20}}>
            Already a member?{' '}
            <Text
              style={{color: theme.colors.primaryContainer, fontWeight: '800'}}
              onPress={() => navigation.goBack()}>
              Sign In
            </Text>
          </Text>
        </View>

        {/* <View style={styles.social}>
          <FAB
            icon={'logo-google'}
            onPress={() => console.log('Pressed')}
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <FAB
            icon={'logo-apple'}
            onPress={() => console.log('Pressed')}
            style={{backgroundColor: theme.colors.onPrimary}}
          />

          <FAB
            icon={'logo-facebook'}
            onPress={() => console.log('Pressed')}
            style={{backgroundColor: theme.colors.onPrimary}}
          />
        </View> */}

        {/* <View style={styles.orEmail}>
          <Text variant="titleMedium" style={{color: theme.colors.onPrimary}}>
            Or sign up with email
          </Text>
        </View> */}

        <View style={styles.inputs}>
          <TextInput
            label="Full Name"
            value={form.fullName}
            onChangeText={fullName => setForm({...form, fullName})}
            autoCapitalize="words"
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <TextInput
            label="Email"
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <TextInput
            label="Phone Number"
            value={form.phoneNumber}
            onChangeText={phoneNumber => setForm({...form, phoneNumber})}
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <TextInput
            label="Password"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={password => setForm({...form, password})}
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <TextInput
            label="Confirm Password"
            autoCapitalize="none"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={confirmPassword =>
              setForm({...form, confirmPassword})
            }
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          {passwordMatchMsg !== '' && (
            <Text style={styles.passwordMatch}>* {passwordMatchMsg}</Text>
          )}

          <Button
            icon={'log-in-outline'}
            loading={isLoading}
            uppercase
            mode="elevated"
            onPress={onRegister}>
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
  },
  header: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '300',
  },
  social: {
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  orEmail: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputs: {
    gap: 20,
  },
  passwordMatch: {
    color: 'yellow',
  },
});

export default RegisterScreen;
