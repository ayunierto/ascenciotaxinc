import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-paper-dropdown';
import {Calendar} from 'react-native-calendars';
import {
  Button,
  Chip,
  MD2Colors,
  MD3DarkTheme,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import MainLayout from '../../layouts/MainLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

const options = [
  {label: 'Lucia Ascencio', value: 'lucia'},
  {label: 'Yulier Rondon', value: 'yulier'},
];

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const BookingScreen = ({navigation}: Props) => {
  const [staff, setStaff] = useState<string>();

  const [, setSelected] = useState('');

  const theme = useTheme();

  return (
    <MainLayout>
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
          onSelect={setStaff}
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
          // Customize the appearance of the calendar
          onDayPress={(day: {dateString: React.SetStateAction<string>}) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            '2024-11-01': {
              selected: true,
              marked: true,
              selectedColor: MD2Colors.blue700,
            },
            '2024-11-02': {marked: true},
            '2024-11-03': {
              selected: true,
              marked: true,
              selectedColor: MD2Colors.blue700,
            },
          }}
        />

        <View style={styles.hours}>
          <Chip
            style={{backgroundColor: theme.colors.onPrimary}}
            icon="information"
            onPress={() => console.log('Pressed')}>
            07:00 a.m.
          </Chip>
          <Chip
            icon="information"
            style={{backgroundColor: theme.colors.onPrimary}}
            onPress={() => console.log('Pressed')}>
            08:00 a.m.
          </Chip>
          <Chip
            style={{backgroundColor: theme.colors.onPrimary}}
            icon="information"
            onPress={() => console.log('Pressed')}>
            09:00 a.m.
          </Chip>
          <Chip
            style={{backgroundColor: theme.colors.onPrimary}}
            icon="information"
            onPress={() => console.log('Pressed')}>
            10:00 a.m.
          </Chip>
          <Chip
            style={{backgroundColor: theme.colors.onPrimary}}
            icon="information"
            onPress={() => console.log('Pressed')}>
            11:00 a.m.
          </Chip>
          <Chip
            style={{backgroundColor: theme.colors.onPrimary}}
            icon="information"
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
