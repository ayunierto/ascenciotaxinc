import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useAuthStore} from '../../store/auth/useAuthStore';

import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '../../../components/ui';
import Input from '../../../components/ui/Input';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

const loginUserSchema = z.object({
  username: z
    .string()
    .refine(
      value =>
        z.string().email().safeParse(value).success ||
        /^\+\d{1,3}\d{10}$/.test(value),
      {
        message: 'Username must be a valid email address or phone number',
      },
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password must include uppercase, lowercase and numbers',
    ),
});

export const LoginScreen = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: 'admin@ascenciotaxinc.com',
      password: 'Abcd1234',
    },
  });

  const {signin} = useAuthStore();

  const onLogin = async (values: z.infer<typeof loginUserSchema>) => {
    setIsLoading(true);
    const response = await signin(values.username, values.password);
    setIsLoading(false);
    if (response.error === 'Inactive') {
      navigation.navigate('VerifyScreen');
      return;
    }
    if (response.error === 'Unauthorized') {
      setError('root', {
        type: 'manual',
        message:
          response.message +
          '. Please check your credentials or register a new account.',
      });
      return;
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
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.subtitle}>
            Don’t have an account?{' '}
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={styles.link}>
              Sign up.
            </Text>
          </Text>
        </View>

        {/* <View style={styles.social}> */}
        {/* <FAB */}
        {/* icon={'logo-google'} */}
        {/* onPress={() => console.log('signin with google')} */}
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
            Or signin with email
          </Text>
        </View> */}

        <View style={styles.inputs}>
          {errors.root && (
            <Text style={styles.errorText}>
              {errors.root?.message as string}
            </Text>
          )}
          <Controller
            control={control}
            name="username"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="email-address"
                placeholder="Email or phone number"
                autoCapitalize="none"
                autoComplete="email"
                autoFocus
              />
            )}
          />
          {errors.username && (
            <Text style={styles.errorText}>
              {errors.username?.message as string}
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
                autoCapitalize="words"
                secureTextEntry
                placeholder="Enter password"
                autoComplete="password"
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>
              {errors.password?.message as string}
            </Text>
          )}

          <Button disabled={isLoading} onPress={handleSubmit(onLogin)}>
            Login
          </Button>
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
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    fontWeight: '300',
    color: 'white',
  },
  subtitle: {
    marginTop: 20,
    color: 'white',
    fontSize: 16,
  },
  link: {
    color: 'orange',
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
  errorText: {
    marginTop: -15,
    color: 'yellow',
  },
});

export default LoginScreen;
