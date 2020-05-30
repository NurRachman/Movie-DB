/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppListMovies from './src/screen/list_movies/AppListMovies';
import DetailMovie from './src/screen/detail_movie/DetailMovie';

const Stack = createStackNavigator();

const ImageLogo = () => (
  <Image
    style={{ width: 50, height: 50 }}
    source={{
      uri: "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
    }}
  />
);

var navOptions = {
  headerTitle: props => <ImageLogo {...props} />,
  headerTitleAlign: 'center',
  headerRight: () => (
    <TouchableOpacity
      onPress={() => console.log("alert('This is a button!')")}
      style={{ marginRight: 16 }} >
      <Icon name="search" color="#FFF" size={24} />
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => console.log("alert('This is a button!')")}
      style={{ marginLeft: 16 }} >
      <Icon name="menu" color="#FFF" size={24} />
    </TouchableOpacity>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#032541',
        },
      }}>
        <Stack.Screen
          name="Home"
          component={AppListMovies}
          options={navOptions} />
        <Stack.Screen
          name="Detail"
          component={DetailMovie}
          options={navOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
