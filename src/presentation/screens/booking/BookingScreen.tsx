import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Button, Chip, useTheme} from 'react-native-paper';
import MainLayout from '../../layouts/MainLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import Select from '../../../components/ui/Select';
import {useBookingStore} from '../../store/useBookingStore';
import {API_URL} from '@env';

interface Day {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}
interface Option {
  label: string;
  value: string;
}
export const BookingScreen = ({navigation}: Props) => {
  const theme = useTheme();

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes empieza desde 0 (enero es 0)
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedStaff, setSelectedStaff] = useState<Option | null>(null);
  const [availableSlots, setAvailableSlots] = useState<
    {start: string; end: string}[]
  >([]);

  const [selectedSlot, setSelectedSlot] = useState<{
    start: string;
    end: string;
  }>();
  const [slotsToDisplay, setSlotsToDisplay] = useState<
    {
      start: string;
      end: string;
    }[]
  >();

  const {selectedService} = useBookingStore();
  const staff: Option[] = selectedService!.staff.map(
    ({name, lastName, id}) => ({
      label: `${name} ${lastName}`,
      value: id,
    }),
  );

  const URL_BASE = API_URL;

  // Fetch availability
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedStaff) {
        return;
      }
      try {
        const response = await fetch(
          `${URL_BASE}/availability?staffMemberId=${selectedStaff.value}&date=${selectedDate}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAvailableSlots(data);
      } catch (error) {
        console.error('Error fetching availability:', error);
        setAvailableSlots([]); // Manejar el error mostrando que no hay disponibilidad
      }
    };

    fetchAvailability();
  }, [URL_BASE, selectedDate, selectedStaff]);

  // Generate all day slots
  useEffect(() => {
    const generateAllDaySlots = () => {
      const allDaySlots = [];

      for (const slot of availableSlots) {
        const startTime = new Date(slot.start);
        const endTime = new Date(slot.end);
        let currentTime = new Date(startTime);

        while (currentTime < endTime) {
          allDaySlots.push({
            start: currentTime.toISOString(),
            end: new Date(currentTime.getTime() + 60 * 60 * 1000).toISOString(), // Intervalo de 1 hora
          });
          currentTime.setTime(currentTime.getTime() + 60 * 60 * 1000);
        }
      }
      return allDaySlots;
    };

    setSlotsToDisplay(generateAllDaySlots());
  }, [availableSlots]);

  const {saveDetails} = useBookingStore();
  function handleBookNow() {
    if (selectedSlot) {
      saveDetails(
        selectedStaff!.value,
        selectedStaff!.label,
        selectedSlot.start,
        selectedSlot.end,
      );
      navigation.navigate('ResumeScreen');
    }
  }

  return (
    <MainLayout>
      <ScrollView>
        <View
          style={{...styles.container, backgroundColor: theme.colors.primary}}>
          <Text style={styles.title}>Select your preferences</Text>
          <Text style={styles.subtitle}>
            Check out our availability and book the date and time that works for
            you.
          </Text>

          <Select
            options={staff}
            onSelect={item => setSelectedStaff(item)}
            placeholder="Select Staff Member..."
          />

          <View style={styles.calendar}>
            <Calendar
              minDate={getCurrentDate()}
              theme={{
                selectedDayBackgroundColor: '#2596be',
              }}
              onDayPress={(day: Day) => {
                console.log(day);
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }}
            />
          </View>

          <View style={styles.hours}>
            {!selectedStaff ? (
              <Text style={styles.warning}>
                Select a staff member to show the available schedules
              </Text>
            ) : availableSlots.length === 0 ? (
              <Text style={styles.warning}>
                There are no appointments available for this day
              </Text>
            ) : (
              slotsToDisplay &&
              slotsToDisplay.map(slot => {
                const startTime = new Date(slot.start).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                // const endTime = new Date(slot.end).toLocaleTimeString([], {
                //   hour: '2-digit',
                //   minute: '2-digit',
                // });
                return (
                  <Chip
                    key={slot.start}
                    style={[styles.chip]}
                    icon="alarm-outline"
                    onPress={() => setSelectedSlot(slot)}>
                    {startTime}
                    {/* {startTime} a {endTime} */}
                  </Chip>
                );
              })
            )}
          </View>
          <View>
            {selectedSlot && (
              <Button mode="elevated" onPress={() => handleBookNow()}>
                Schedule an appointment at{' '}
                {new Date(selectedSlot.start).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Button>
            )}
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
    color: 'white',
    fontSize: 40,
  },
  subtitle: {color: 'white'},
  calendar: {borderRadius: 20, overflow: 'hidden'},
  hours: {
    flexDirection: 'row', // Alinea los elementos horizontalmente
    flexWrap: 'wrap', // Permite que los elementos pasen a la siguiente línea
    justifyContent: 'space-between', // Distribuye el espacio entre los elementos (opcional)
    padding: 10, // Espacio alrededor del contenedor (opcional)
  },
  warning: {
    width: '100%',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'orange',
    opacity: 0.8,
    gap: 10,
  },
  chip: {
    width: '45%', // Ancho aproximado para 3 columnas (ajustar según sea necesario)
    // aspectRatio: 1, // Mantiene la proporción 1:1 (cuadrado). Puedes quitar esto si no necesitas cuadrados.
    backgroundColor: 'white',
    marginVertical: 5, // Espacio vertical entre elementos
    borderRadius: 8, // Bordes redondeados (opcional)
    alignItems: 'center', // Centrado vertical
    justifyContent: 'center', // Centrado horizontal
  },
});

export default BookingScreen;
