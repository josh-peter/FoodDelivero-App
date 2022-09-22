import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ProgressBarAndroid,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <>
      <View style={{ backgroundColor: "#00ccbb", flex: 1 }}>
        <SafeAreaView style={{ zIndex: 999, position: "absolute" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 30,
              width: Dimensions.get("window").width,
            }}
          >
            <TouchableOpacity style={{backgroundColor: "#fff", padding: 10, borderRadius: 30}}>
              <Ionicons
                name="ios-close"
                size={30}
                color="#00ccbb"
                onPress={() => navigation.navigate("HomeScreen")}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, color: "#fff", fontWeight: "500" }}>
              Order Help
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              marginVertical: 20,
              marginHorizontal: 30,
              padding: 20,
              borderRadius: 10,
              zIndex: 999,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text
                  style={{ fontSize: 20, color: "#747d8c", fontWeight: "500" }}
                >
                  Estimated Arrival
                </Text>
                <Text
                  style={{ fontSize: 40, color: "#000", fontWeight: "500" }}
                >
                  45-55 Minutes
                </Text>
              </View>
              <Image
                source={{ uri: "https://links.papareact.com/fls" }}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              color="#00ccbb"
              style={{ marginTop: 10 }}
            />
            <Text style={{ marginTop: 15, color: "#747d8c", fontSize: 16 }}>
              Your order at {restaurant.title} is being prepared
            </Text>
          </View>
        </SafeAreaView>

        <MapView
          mapType="mutedStandard"
          initialRegion={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.short_description}
            pinColor="#00ccbb"
            identifier="origin"
          />
        </MapView>
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            paddingHorizontal: 16,
            height: 120,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            style={{
              width: 60,
              height: 60,
              padding: 15,
              backgroundColor: "#747d8c",
              borderRadius: 50,
            }}
          />
          <View style={{ flex: 1, marginLeft: 10, marginTop: 6 }}>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              Joshua Peter
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#747d8c" }}>
              Your Rider
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#00ccbb" }}
            >
              Call
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    marginTop: 220,
    zIndex: 0,
  },
});
