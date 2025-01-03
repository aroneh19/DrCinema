import CinemaView from "./src/views/Cinema/CinemaView";
import CinemaDetailView from "./src/views/Cinema/CinemaDetailView";
import MovieView from "./src/views/Movie/MovieView";
import MovieListView from "./src/views/Movie/MovieListView";
import store from "./src/redux/store";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
const Stack = createStackNavigator();

const Routes = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="CinemaView"
			screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CinemaView" component={CinemaView} />
			<Stack.Screen name="MovieList" component={MovieListView} />
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
