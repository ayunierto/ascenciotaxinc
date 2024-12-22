/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getServices} from '../../../actions/services/get-services';
import {useQuery} from '@tanstack/react-query';
import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/FullScreenLoader';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useBookingStore} from '../../store/useBookingStore';
import {Service} from '../../../domain/entities/service';
import {Card, Chip} from 'react-native-paper';
import {Button} from '../../../components/ui';
import Sidebar from '../../../components/sidebar/Sidebar';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const {isLoading, data: services = []} = useQuery({
    queryKey: ['service', 'infinite'],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getServices(),
  });

  const {logout} = useAuthStore();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const {bookNow} = useBookingStore();

  const handleBookNow = (service: string, staffMembers: string[]) => {
    bookNow(service, staffMembers);
    navigation.navigate('BookingScreen');
    return;
  };

  return (
    <MainLayout
      rightActionIcons={
        <>
          {/* <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="ellipsis-vertical-outline"
                color={theme.colors.onPrimary}
                onPress={openMenu}
              />
            }>
            <Menu.Item
              leadingIcon="person-circle-outline"
              onPress={() => navigation.navigate('ProfileScreen')}
              title="Profile"
            />
            <Divider />
            <Menu.Item
              leadingIcon="log-out-outline"
              onPress={logout}
              title="Logout"
            />
          </Menu> */}
        </>
      }>
      <ScrollView>
        <Sidebar />
        <View
          style={{
            ...styles.container,
            backgroundColor: '',
            paddingTop: 30,
          }}>
          <Image
            source={require('../../../assets/logo.webp')}
            style={styles.banner}
          />
          {isLoading ? (
            <FullScreenLoader />
          ) : (
            (services as Service[]).map(service => (
              <Card key={service.id}>
                <Card.Cover source={{uri: service.image}} />
                <Card.Content style={{padding: 10, gap: 10}}>
                  <Text>{service.title}</Text>
                  <Text>{service.duration}</Text>
                  {service.isAvailableOnline && (
                    <View style={{flexDirection: 'row'}}>
                      <Chip
                        icon="videocam-outline"
                        onPress={() => console.log('Pressed')}>
                        Available Online
                      </Chip>
                    </View>
                  )}
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={() =>
                      handleBookNow(service.title, service.staffMembers)
                    }>
                    Book Now
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
});

export default HomeScreen;
