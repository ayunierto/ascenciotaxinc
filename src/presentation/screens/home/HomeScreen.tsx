/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, Card, Text, useTheme} from 'react-native-paper';
import {useAuthStore} from '../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const theme = useTheme();

  const {logout} = useAuthStore();

  const onLogout = () => {
    logout();
  };

  return (
    <ScrollView>
      <Appbar.Header style={{backgroundColor: theme.colors.primary}}>
        <Appbar.Content title="" color={theme.colors.onPrimary} />
        <Appbar.Action
          icon="person-outline"
          onPress={() => {}}
          color={theme.colors.onPrimary}
        />
        <Appbar.Action
          icon="log-out-outline"
          color={theme.colors.onPrimary}
          onPress={onLogout}
        />
      </Appbar.Header>
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
        <Card>
          <Card.Cover source={{uri: 'https://picsum.photos/600'}} />
          <Card.Content>
            <Text variant="titleLarge">In-person Tax Filing (Walk-in)</Text>
            <Text variant="bodyMedium">45 min</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained">Book Now</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Cover source={{uri: 'https://picsum.photos/800'}} />
          <Card.Content>
            <Text variant="titleLarge">In-person Tax Filing (Walk-in)</Text>
            <Text variant="bodyMedium">45 min</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained">Book Now</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Cover source={{uri: 'https://picsum.photos/900'}} />
          <Card.Content>
            <Text variant="titleLarge">In-person Tax Filing (Walk-in)</Text>
            <Text variant="bodyMedium">45 min</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained">Book Now</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Cover source={{uri: 'https://picsum.photos/500'}} />
          <Card.Content>
            <Text variant="titleLarge">In-person Tax Filing (Walk-in)</Text>
            <Text variant="bodyMedium">45 min</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained">Book Now</Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
  },
});

export default HomeScreen;
