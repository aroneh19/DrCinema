import CinemasView from "./src/views/Cinema/CinemasView";
import CinemaDetailView from "./src/views/Cinema/CinemaDetailView";
import MovieView from "./src/views/Movie/MovieView";
import store from "./src/redux/store";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
const Stack = createStackNavigator();

const Routes = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="CinemasView"
			screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CinemasView" component={CinemasView} />
			<Stack.Screen name="CinemaDetailView" component={CinemaDetailView} />
			<Stack.Screen name="MovieView" component={MovieView} />
		</Stack.Navigator>
	</NavigationContainer>
);

const App = () => (
	<Provider store={store}>
		<Routes />
	</Provider>
);
export default App;
