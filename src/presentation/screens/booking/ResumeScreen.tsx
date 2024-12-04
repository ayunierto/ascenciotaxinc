/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MainLayout from '../../layouts/MainLayout';
import {useBookingStore} from '../../store/useBookingStore';

export const ResumeScreen = () => {
  const theme = useTheme();
  const {service, staff} = useBookingStore();

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
            subtitle={service}
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
            subtitle="October 7, 2024 at 10:00 a.m."
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
            subtitle="271 Thomas Street, Peterborough ON"
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
            subtitle={staff}
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
            subtitle="October 7, 2024 at 10:00 a.m."
            left={props => (
              <Icon
                style={{color: theme.colors.primary}}
                name="time-outline"
                {...props}
              />
            )}
          />
        </Card>
        <Button mode="elevated" icon={'save-outline'}>
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
