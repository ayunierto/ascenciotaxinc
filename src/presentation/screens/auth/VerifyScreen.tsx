import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {Button} from '../../../components/ui';

import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '../../../components/ui/Input';

const verifyUserSchema = z.object({
  verification_code: z.string().min(6, 'The code must have 6 characters'),
});

export const VerifyScreen = () => {
  const {user, verifyCode} = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<z.infer<typeof verifyUserSchema>>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      verification_code: '',
    },
  });

  const handleVerify = async ({
    verification_code,
  }: z.infer<typeof verifyUserSchema>) => {
    // Aquí puedes agregar la lógica para verificar el código
    const response = await verifyCode(user!.phone_number, verification_code);
    if (response.statusCode === 401) {
      setError('verification_code', {
        type: 'manual',
        message: response.message + '. Please check SMS.',
      });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify</Text>
      <Text style={styles.subtitle}>Please verify your account</Text>
      <Text style={styles.paragraph}>
        We have sent a verification code to your phone number. Please enter the
        code sent to verify your account.
      </Text>
      <Controller
        control={control}
        name="verification_code"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="words"
            placeholder="Verification code"
            keyboardType="numeric"
            autoComplete="sms-otp"
          />
        )}
      />
      {errors.verification_code && (
        <Text style={styles.errorText}>
          {errors.verification_code?.message as string}
        </Text>
      )}
      <Button onPress={handleSubmit(handleVerify)}>Verify</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: '300',
    color: 'white',
    fontSize: 60,
  },
  subtitle: {
    color: 'white',
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  paragraph: {
    marginBottom: 10,
    color: 'yellow',
    fontSize: 14,
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 18,
    borderRadius: 10,
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    marginTop: -15,
    marginBottom: 20,
    color: 'yellow',
  },
});

export default VerifyScreen;
