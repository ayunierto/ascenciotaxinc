/* eslint-disable react-native/no-inline-styles */
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {RootStackParams} from '../../navigation/StackNavigator';
import {API_URL} from '@env';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const theme = useTheme();

  const [isLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  console.log({apiUrl: API_URL});

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
            Sign In
          </Text>
          <Text
            style={{
              marginTop: 20,
              color: theme.colors.onPrimary,
            }}>
            You don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={{
                color: theme.colors.primaryContainer,
                fontWeight: '800',
              }}>
              Sign Up
            </Text>
          </Text>
        </View>

        {/* <View style={styles.social}> */}
        {/* <FAB */}
        {/* icon={'logo-google'} */}
        {/* onPress={() => console.log('login with google')} */}
        {/* style={{backgroundColor: theme.colors.onPrimary}} */}
        {/* /> */}
        {/* <FAB
            icon={'logo-apple'}
            onPress={() => console.log('Pressed')}
            style={{backgroundColor: theme.colors.onPrimary}}
          />

          <FAB
            icon={'logo-facebook'}
            onPress={() => console.log('Pressed')}
            style={{backgroundColor: theme.colors.onPrimary}}
          /> */}
        {/* </View> */}

        {/* <View style={styles.orEmail}>
          <Text variant="titleMedium" style={{color: theme.colors.onPrimary}}>
            Or login with email
          </Text>
        </View> */}

        <View style={styles.inputs}>
          <TextInput
            autoCapitalize="none"
            placeholder="user@gmail.com"
            label="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <TextInput
            label="Password"
            placeholder="Enter password here"
            value={form.password}
            onChangeText={password => setForm({...form, password})}
            secureTextEntry
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <Button
            icon={'log-in-outline'}
            loading={isLoading}
            disabled={isLoading}
            uppercase
            mode="elevated">
            Login
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
    paddingTop: 40,
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
});

export default LoginScreen;
