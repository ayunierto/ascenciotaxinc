/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text, useTheme} from 'react-native-paper';
import Icon from '@react-native-vector-icons/ionicons';
import MainLayout from '../../layouts/MainLayout';
import {useBookingStore} from '../../store/useBookingStore';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'ResumeScreen'> {}
export const ResumeScreen = ({navigation}: Props) => {
  const theme = useTheme();
  const {selectedService, staffName, startDateAndTime, bookNow} =
    useBookingStore();

  const handleConfirm = async () => {
    const appointment = await bookNow();
    if (appointment.id) {
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <MainLayout>
      <View
        style={{...styles.container, backgroundColor: theme.colors.primary}}>
        <Text variant="displaySmall" style={{color: theme.colors.onPrimary}}>
          Booking Details
        </Text>

        <Card
          mode="contained"
          style={{backgroundColor: theme.colors.onPrimary}}>
          <Card.Title
            title="Service"
            subtitle={selectedService?.name}
            left={props => (
              <Icon
                style={{color: theme.colors.primary}}
                name="file-tray-stacked-outline"
                {...props}
              />
            )}
          />
        </Card>
        <Card
          mode="contained"
          style={{backgroundColor: theme.colors.onPrimary}}>
          <Card.Title
            title="Date"
            subtitle={new Date(startDateAndTime!).toLocaleDateString()}
            left={props => (
              <Icon
                style={{color: theme.colors.primary}}
                name="calendar-outline"
                {...props}
              />
            )}
          />
        </Card>
        <Card
          mode="contained"
          style={{backgroundColor: theme.colors.onPrimary}}>
          <Card.Title
            title="Address"
            subtitle={selectedService!.address}
            left={props => (
              <Icon
                style={{color: theme.colors.primary}}
                name="map-outline"
                {...props}
              />
            )}
          />
        </Card>
        <Card
          mode="contained"
          style={{backgroundColor: theme.colors.onPrimary}}>
          <Card.Title
            title="Staff"
            subtitle={staffName}
            left={props => (
              <Icon
                style={{color: theme.colors.primary}}
                name="person-outline"
                {...props}
              />
            )}
          />
        </Card>
        <Card
          mode="contained"
          style={{backgroundColor: theme.colors.onPrimary}}>
          <Card.Title
            title="Time"
            subtitle={new Date(startDateAndTime!).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            left={props => (
              <Icon
                style={{color: theme.colors.primary}}
                name="time-outline"
                {...props}
              />
            )}
          />
        </Card>
        <Button
          mode="elevated"
          icon={'save-outline'}
          onPress={() => handleConfirm()}>
          Confirm Appointment
        </Button>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    gap: 20,
  },
  details: {
    fontWeight: '700',
    fontSize: 20,
  },
  resumeCard: {
    padding: 20,
    gap: 20,
    flexDirection: 'column',
  },
});

export default ResumeScreen;
