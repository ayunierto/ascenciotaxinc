import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getServices} from '../../../actions/services/get-services';
import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/FullScreenLoader';
// import {useAuthStore} from '../../store/auth/useAuthStore';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useBookingStore} from '../../store/useBookingStore';
import {Card, Chip} from 'react-native-paper';
import {Button} from '../../../components/ui';
import {theme} from '../../../config/theme';
import {ServiceResponse} from '../../../infrastructure/interfaces';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [statusError, setStatusError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await getServices();
        if (response) {
          if (response.length === 0) {
            setStatusError('No services found');
          }
          setServices(response);
        }
      } catch (error) {
        setStatusError('Failed to fetch services');
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  // const {logout} = useAuthStore();

  // const [visible, setVisible] = React.useState(false);
  // const openMenu = () => setVisible(true);
  // const closeMenu = () => setVisible(false);

  const {selectService} = useBookingStore();

  const handleSelectService = (service: ServiceResponse) => {
    selectService(service);
    navigation.navigate('BookingScreen');
    return;
  };

  const minutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60); // Get the whole number of hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes (remainder of the division)

    return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
  };

  return (
    <MainLayout
    // rightActionIcons={
    //   <>
    //     <Menu
    //       visible={visible}
    //       onDismiss={closeMenu}
    //       anchor={
    //         <Appbar.Action
    //           icon="ellipsis-vertical-outline"
    //           color={theme.colors.onPrimary}
    //           onPress={openMenu}
    //         />
    //       }>
    //       <Menu.Item
    //         leadingIcon="person-circle-outline"
    //         onPress={() => navigation.navigate('ProfileScreen')}
    //         title="Profile"
    //       />
    //       <Menu.Item
    //         leadingIcon="log-out-outline"
    //         onPress={logout}
    //         title="Logout"
    //       />
    //     </Menu>
    //   </>
    // }
    >
      <ScrollView>
        {/* <Sidebar /> */}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.container,
            backgroundColor: '',
            paddingTop: 30,
          }}>
          <Image
            source={require('../../../assets/logo.webp')}
            style={styles.banner}
          />
          {statusError.length !== 0 && (
            <Text style={styles.warning}>{statusError}</Text>
          )}
          {isLoading ? (
            <FullScreenLoader />
          ) : (
            services.map(service => (
              <Card key={service.id}>
                <Card.Cover source={{uri: service.images[0].url}} />
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text>{minutesToHoursAndMinutes(service.duration)}</Text>
                  {service.isAvailableOnline && (
                    <View style={styles.row}>
                      <Chip
                        icon={'videocam-outline'}
                        onPress={() => console.log('Pressed')}>
                        Available Online
                      </Chip>
                    </View>
                  )}
                </Card.Content>
                <Card.Actions>
                  <Button
                    style={styles.bookNowButton}
                    onPress={() => handleSelectService(service)}>
                    <Text style={styles.bookNowButtonText}>BOOK NOW</Text>
                  </Button>
                </Card.Actions>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  banner: {
    marginTop: -40,
    width: '100%',
    resizeMode: 'contain',
  },
  cardContent: {padding: 10, gap: 10},
  serviceName: {fontSize: 20},
  row: {
    flexDirection: 'row',
  },
  warning: {
    color: 'orange',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  bookNowButton: {
    padding: 6,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
  },
  bookNowButtonText: {color: 'white'},
});

export default HomeScreen;
