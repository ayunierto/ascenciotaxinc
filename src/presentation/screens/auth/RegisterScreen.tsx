import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParams} from '../../navigation/StackNavigator';

import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthStore} from '../../store/auth/useAuthStore';
import Input from '../../../components/ui/Input';
import {Button} from '../../../components/ui';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

const registerUserSchema = z
  .object({
    name: z.string().min(3, 'First name must be at least 3 characters'),
    last_name: z.string().min(3, 'First name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone_number: z
      .string()
      .regex(
        /^\+\d{1,3}\d{10}$/,
        'Invalid phone number format. It should include the country code and be a valid phone number',
      ),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must include uppercase, lowercase and numbers',
      ),
    confirm_password: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters')
      .optional(),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords must match',
    path: ['confirm_password'],
  });

export const RegisterScreen = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    setFocus,
  } = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
  });

  const {signup} = useAuthStore();

  const onRegister = async (values: z.infer<typeof registerUserSchema>) => {
    const response = await signup(values);
    if (response.verification_code) {
      navigation.navigate('VerifyScreen');
    }
    if (response.code === 409) {
      if (response.cause === 'email') {
        setFocus('email');
        setError('email', {
          type: 'manual',
          message:
            'Your email is already being used by an existing AscencioTax account. You can go the AscencioTax login screen to login using this email.',
        });
        return;
      }
      if (response.cause === 'phone_number') {
        setFocus('phone_number');
        setError('phone_number', {
          type: 'manual',
          message:
            'Your phone number is already being used by an existing AscencioTax account. You can go the AscencioTax login screen to login using this phone number.',
        });
        return;
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.webp')}
            style={styles.banner}
          />
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>
            Already a member?{' '}
            <Text onPress={() => navigation.goBack()} style={styles.link}>
              Sign In
            </Text>
          </Text>
        </View>

        <View style={styles.inputs}>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="First name"
                autoCapitalize="words"
                autoComplete="name"
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>
              {errors.name?.message as string}
            </Text>
          )}

          <Controller
            control={control}
            name="last_name"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Last name"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="words"
                autoComplete="name-family"
              />
            )}
          />
          {errors.last_name && (
            <Text style={styles.errorText}>
              {errors.last_name?.message as string}
            </Text>
          )}

          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="email-address"
                placeholder="Email"
                autoCapitalize="none"
                autoComplete="email"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>
              {errors.email?.message as string}
            </Text>
          )}

          <Controller
            control={control}
            name="phone_number"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="phone-pad"
                placeholder="Phone Number"
                autoCapitalize="none"
                autoComplete="tel"
              />
            )}
          />
          {errors.phone_number && (
            <Text style={styles.errorText}>
              {errors.phone_number?.message as string}
            </Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
                secureTextEntry
                placeholder="Password"
                autoComplete="password-new"
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>
              {errors.password?.message as string}
            </Text>
          )}

          <Controller
            control={control}
            name="confirm_password"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
                secureTextEntry
                placeholder="Confirm Password"
                autoComplete="password-new"
              />
            )}
          />
          {errors.confirm_password && (
            <Text style={styles.errorText}>
              {errors.confirm_password?.message as string}
            </Text>
          )}

          <Button onPress={handleSubmit(onRegister)}>Sign Up</Button>
        </View>
      </View>
    </ScrollView>
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
    color: 'white',
    fontSize: 60,
  },
  subtitle: {color: 'white', fontSize: 16},
  link: {
    color: 'white',
    fontWeight: '900',
    textDecorationLine: 'underline',
    fontSize: 16,
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
  errorText: {
    marginTop: -15,
    color: 'yellow',
  },
});

export default RegisterScreen;
