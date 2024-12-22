/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Input from '../../components/ui/Input';
import {Button} from '../../components/ui';

import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthStore} from '../store/auth/useAuthStore';

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

export const ProfileScreen = () => {
  const {user} = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    setFocus,
  } = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      confirm_password: '',
      name: '',
      last_name: '',
      email: user?.email,
      phone_number: '',
      password: '',
    },
  });

  const onUpdate = async (values: z.infer<typeof registerUserSchema>) => {
    // const response = await signup(values);
    // if (response.verification_code) {
    // }
    // if (response.code === 409) {
    //   if (response.cause === 'email') {
    //     setFocus('email');
    //     setError('email', {
    //       type: 'manual',
    //       message:
    //         'Your email is already being used by an existing AscencioTax account. You can go the AscencioTax login screen to login using this email.',
    //     });
    //     return;
    //   }
    //   if (response.cause === 'phone_number') {
    //     setFocus('phone_number');
    //     setError('phone_number', {
    //       type: 'manual',
    //       message:
    //         'Your phone number is already being used by an existing AscencioTax account. You can go the AscencioTax login screen to login using this phone number.',
    //     });
    //     return;
    //   }
    // }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>
            Please complete your personal information.
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
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Last name"
                autoCapitalize="words"
                autoComplete="family-name"
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
                placeholder="Email"
                autoCapitalize="words"
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
                placeholder="Phone number"
                autoCapitalize="words"
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
                placeholder="password"
                autoCapitalize="words"
                autoComplete="new-password"
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
                placeholder="Confirm password"
                autoCapitalize="words"
                autoComplete="new-password"
              />
            )}
          />
          {errors.confirm_password && (
            <Text style={styles.errorText}>
              {errors.confirm_password?.message as string}
            </Text>
          )}
          <Button onPress={handleSubmit(onUpdate)}>Save</Button>
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
  },
  header: {
    paddingBottom: 20,
  },
  title: {
    fontWeight: '300',
    color: 'white',
    fontSize: 40,
  },
  subtitle: {color: 'white', fontSize: 16},
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
  errorText: {
    marginTop: -15,
    color: 'yellow',
  },
});

export default ProfileScreen;
