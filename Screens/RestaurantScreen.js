import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import DishRow from "../Components/DishRow";
import BasketIcon from "../Components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
const RestaurantScreen = () => {
  const dispatch = useDispatch();
  const {
    params: {
      id,
      title,
      imgUrl,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        title,
        imgUrl,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View style={{ position: "relative" }}>
          <Image source={{ uri: urlFor(imgUrl).url() }} style={styles.img} />
          <TouchableOpacity style={styles.back} onPress={navigation.goBack}>
            <Ionicons name="arrow-back-circle" size={38} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "#fff", bottom: 100 }}>
          <View style={styles.title}>
            <Text style={{ fontWeight: "bold", fontSize: 45 }}>{title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="star"
                  size={25}
                  color="green"
                  style={{ paddingRight: 5, opacity: 0.5 }}
                />
                <Text style={{ color: "#95a5a6", fontSize: 17 }}>
                  <Text style={{ fontSize: 17, color: "green" }}>{rating}</Text>{" "}
                  .{genre}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 15,
                }}
              >
                <Ionicons
                  name="location"
                  size={25}
                  color="green"
                  style={{ opacity: 0.5 }}
                />
                <Text style={{ fontSize: 15, color: "#95a5a6" }}>
                  Nearby: {address}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 18,
                color: "gray",
                marginTop: 13,
                paddingBottom: 15,
              }}
            >
              {short_description}
            </Text>
          </View>
          <TouchableOpacity style={styles.foodTitle}>
            <Ionicons
              name="alert-circle"
              size={29}
              color="gray"
              opacity={0.8}
            />
            <Text
              style={{
                color: "#95a5a6",
                fontSize: 19,
                paddingLeft: 10,
                flex: 1,
                Bottom: 100,
                fontWeight: "500",
              }}
            >
              Have a food allergy
            </Text>
            <FontAwesome5
              name="arrow-right"
              size={20}
              color="green"
              opacity={0.8}
            />
          </TouchableOpacity>
        </View>
        <View style={{ bottom: 140 }}>
          <Text
            style={{
              paddingHorizontal: 13,
              paddingTop: 55,
              marginBottom: 10,
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            Menu
          </Text>
          {/* Dish row */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 350,
    padding: 10,
    backgroundColor: "gray",
    resizeMode: "cover",
  },
  back: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 30,
  },
  title: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  foodTitle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#bdc3c7",
  },
});
