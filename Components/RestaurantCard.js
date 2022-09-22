import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
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
}) => {

  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ backgroundColor: '#FFFFFF', width: 300, elevation: 8, marginRight: 15 }}
      onPress={() => navigation.navigate("Restaurant", {
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
      })}>
      <Image source={{ uri: urlFor(imgUrl).url() }} style={{ width: 300, height: 200 }} />
      <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 5 }}>
          {title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="star"
            size={22}
            color="green"
            style={{ paddingRight: 5, opacity: 0.5 }}
          />
          <Text style={{ color: "#95a5a6", fontSize: 17 }}>
            <Text style={{ fontSize: 17, color: "green" }}>{rating}</Text> .
            {genre}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 3}}>
          <Ionicons
            name="location"
            size={25}
            color="gray"
            style={{ opacity: 0.5 }}
          />
          <Text style={{fontSize: 15, color: "#95a5a6"}}>Nearby: {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({});
