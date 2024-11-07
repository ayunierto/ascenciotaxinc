/* eslint-disable react/react-in-jsx-scope */
import {View, StyleSheet} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import MainLayout from '../layouts/MainLayout';

export const SettingsScreen = () => {
  const theme = useTheme();
  return (
    <MainLayout>
      <View
        style={{...styles.container, backgroundColor: theme.colors.primary}}>
        <View style={styles.header}>
          <Text
            style={{...styles.title, color: theme.colors.onPrimary}}
            variant="displaySmall">
            Profile
          </Text>
          <Text variant="titleMedium" style={{color: theme.colors.onPrimary}}>
            Please complete your personal information.
          </Text>
        </View>

        <View style={styles.inputs}>
          <TextInput
            label="Full Name"
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <TextInput
            label="Email"
            disabled
            value="jhon-doe@gmail.com"
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <TextInput
            label="Phone Number"
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <TextInput
            label="Address"
            style={{backgroundColor: theme.colors.onPrimary}}
          />
          <Button icon={'save-outline'} uppercase mode="elevated">
            Save and continue
          </Button>
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

export default SettingsScreen;
