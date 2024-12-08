import Cinemas from './src/views/Cinemas/index';
import CinemaDetail from "./src/views/CinemaDetail/index";
import Movie from "./src/views/Movie/Index";
import store from './src/redux/store';


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from "react-redux";
const Stack = createStackNavigator();

const Routes = () => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cinemas" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cinemas" component={Cinemas} />
        <Stack.Screen name="CinemaDetail" component={CinemaDetail} />
        <Stack.Screen name="Movie" component={Movie} />
      </Stack.Navigator>
    </NavigationContainer>
);

const App = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
);
export default App;
