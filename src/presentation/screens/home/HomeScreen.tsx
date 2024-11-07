/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Chip,
  Divider,
  Menu,
  Text,
  useTheme,
} from 'react-native-paper';
import {getServices} from '../../../actions/services/get-services';
import {useQuery} from '@tanstack/react-query';
import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/FullScreenLoader';
import {useAuthStore} from '../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const theme = useTheme();

  const {isLoading, data: services = []} = useQuery({
    queryKey: ['service', 'infinite'],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getServices(),
  });

  const {logout} = useAuthStore();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <MainLayout
      rightActionIcons={
        <>
          <Menu
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
              onPress={() => {}}
              title="Profile"
            />
            <Divider />
            <Menu.Item
              leadingIcon="log-out-outline"
              onPress={logout}
              title="Logout"
            />
          </Menu>
        </>
      }>
      <ScrollView>
        <View
          style={{
            ...styles.container,
            backgroundColor: theme.colors.primary,
            paddingTop: 30,
          }}>
          <Image
            source={require('../../../assets/logo.webp')}
            style={styles.banner}
          />
          {isLoading ? (
            <FullScreenLoader />
          ) : (
            services.map(service => (
              <Card key={service.id}>
                <Card.Cover source={{uri: service.image}} />
                <Card.Content style={{padding: 10, gap: 10}}>
                  <Text variant="titleLarge">{service.title}</Text>
                  <Text variant="bodyMedium">{service.duration}</Text>
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
                  <Button mode="contained">Book Now</Button>
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
