import React, {useState} from 'react';
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

  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async ({
    verification_code,
  }: z.infer<typeof verifyUserSchema>) => {
    setIsLoading(true);
    const response = await verifyCode(user!.phone_number, verification_code);
    setIsLoading(false);

    if (response.statusCode === 401) {
      setError('verification_code', {
        type: 'manual',
        message:
          response.message + '. Please check SMS or talk to an administrator',
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
      <Button disabled={isLoading} onPress={handleSubmit(handleVerify)}>
        Verify
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 20,
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
    textAlign: 'center',
  },
  paragraph: {
    color: 'yellow',
    fontSize: 14,
  },

  errorText: {
    marginTop: -15,
    marginBottom: 20,
    color: 'yellow',
  },
});

export default VerifyScreen;
