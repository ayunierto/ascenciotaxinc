import React, {useEffect, useState} from 'react';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-paper-dropdown';
import {Calendar} from 'react-native-calendars';
import {
  Button,
  Chip,
  MD3DarkTheme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import MainLayout from '../../layouts/MainLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useBookingStore} from '../../store/useBookingStore';
import GoogleCalendarService from '../../../actions/google-calendar/calendar';

interface Day {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const BookingScreen = ({navigation}: Props) => {
  const theme = useTheme();

  const [staff, setStaff] = useState<string>();
  const [selected, setSelected] = useState('');
  const {staffMembers} = useBookingStore();
  const options = staffMembers.map(member => {
    return {label: member, value: member};
  });

  const onSelectedStaff = (name: string = '') => {
    setStaff(name);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes empieza desde 0 (enero es 0)
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleAuth = async () => {
    const authUrl = await GoogleCalendarService.getAuthUrl();
    if (authUrl) {
      Linking.openURL(authUrl); // Abre la URL en el navegador para autenticar
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <MainLayout>
      <ScrollView>
        <View
          style={{...styles.container, backgroundColor: theme.colors.primary}}>
          <Text
            variant="displaySmall"
            style={{...styles.title, color: theme.colors.onPrimary}}>
            Select your preferences
          </Text>
          <Dropdown
            label="Select Staff"
            placeholder="Select Staff"
            options={options}
            value={staff}
            onSelect={onSelectedStaff}
            menuContentStyle={{backgroundColor: theme.colors.onPrimary}}
            menuDownIcon={
              <TextInput.Icon
                icon="chevron-down-outline"
                color={MD3DarkTheme.colors.primaryContainer}
                pointerEvents="none"
              />
            }
            menuUpIcon={
              <TextInput.Icon
                icon="chevron-up-outline"
                color={MD3DarkTheme.colors.primaryContainer}
                pointerEvents="none"
              />
            }
          />
          <Calendar
            minDate={getCurrentDate()}
            theme={{
              selectedDayBackgroundColor: '#2596be',
            }}
            onDayPress={(day: Day) => {
              console.log(day);
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />

          <View style={styles.hours}>
            <Chip
              style={{backgroundColor: theme.colors.onPrimary}}
              icon="alarm-outline"
              onPress={() => console.log('Pressed')}>
              07:00 a.m.
            </Chip>
            <Chip
              icon="alarm-outline"
              style={{backgroundColor: theme.colors.onPrimary}}
              onPress={() => console.log('Pressed')}>
              08:00 a.m.
            </Chip>
            <Chip
              style={{backgroundColor: theme.colors.onPrimary}}
              icon="alarm-outline"
              onPress={() => console.log('Pressed')}>
              09:00 a.m.
            </Chip>
            <Chip
              style={{backgroundColor: theme.colors.onPrimary}}
              icon="alarm-outline"
              onPress={() => console.log('Pressed')}>
              10:00 a.m.
            </Chip>
            <Chip
              style={{backgroundColor: theme.colors.onPrimary}}
              icon="alarm-outline"
              onPress={() => console.log('Pressed')}>
              11:00 a.m.
            </Chip>
            <Chip
              style={{backgroundColor: theme.colors.onPrimary}}
              icon="alarm-outline"
              onPress={() => console.log('Pressed')}>
              12:00 p.m.
            </Chip>
          </View>
          <View>
            <Button
              mode="elevated"
              onPress={() => navigation.navigate('ResumeScreen')}>
              BOOK NOW
            </Button>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    gap: 20,
  },
  title: {
    fontWeight: '300',
  },
  hours: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
});

export default BookingScreen;
