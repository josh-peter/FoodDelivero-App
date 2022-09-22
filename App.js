import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./Screens/HomeScreen";
import RestaurantScreen from "./Screens/RestaurantScreen";
import BasketScreen from "./Screens/BasketScreen";
import PreparingOrderScreen from "./Screens/PreparingOrderScreen";
import DeliveryScreen from "./Screens/DeliveryScreen";

export default function Navigation() {
  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Basket" component={BasketScreen} options={{presentation: "modal", headerShown: false}}  />
            <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} options={{presentation: "fullScreenModal", headerShown: false}}  />
            <Stack.Screen name="Delivery" component={DeliveryScreen} options={{presentation: "fullScreenModal", headerShown: false}}  />
          </Stack.Navigator>
          </Provider>
      </NavigationContainer>
    </>
  );
}
