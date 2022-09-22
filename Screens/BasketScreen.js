import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { urlFor } from "../sanity";
import { removeFromBasket } from "../features/basketSlice";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const totalInBasket = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "#f1f2f6" }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Basket</Text>
            <Text style={styles.restaurantName}>{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack} style={styles.dropdown}>
            <FontAwesome5 name="arrow-down" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.dispatchInfo}>
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.image}
          />
          <Text
            style={{ flex: 1, marginLeft: 15, fontSize: 19, fontWeight: "500" }}
          >
            Delivers in 50-75 mins
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#00ccbb", fontSize: 18, fontWeight: "500" }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ bottom: 50, marginTop: 40 }}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} style={styles.container}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {items.length} X{" "}
              </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={styles.orderImg}
              />
              <Text style={{ flex: 1, fontSize: 18, fontWeight: "bold" }}>
                {items[0]?.name}
              </Text>
              <Text
                style={{ marginRight: 15, fontSize: 18, fontWeight: "bold" }}
              >
                <Currency quantity={items[0]?.price} currency="USD" />
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "#00ccbb",
                  padding: 5,
                  borderRadius: 30,
                }}
              >
                <Ionicons
                  name="ios-close"
                  size={30}
                  color="#00ccbb"
                  onPress={() => dispatch(removeFromBasket(items[0]?.id))}
                  style={{ color: "#fff", fontWeight: "500" }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#ced6e0",
            elevation: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#57606f", fontSize: 15, fontWeight: "500" }}>
              Subtotal
            </Text>
            <Text style={{ color: "#57606f", fontSize: 15, fontWeight: "500" }}>
              <Currency quantity={totalInBasket} currency="USD" />
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#57606f", fontSize: 15, fontWeight: "500" }}>
              Delivery fee
            </Text>
            <Text style={{ color: "#57606f", fontSize: 15, fontWeight: "500" }}>
              <Currency quantity={5.99} currency="USD" />
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{ color: "#57606f", fontWeight: "bold", fontSize: 19 }}
            >
              Order total
            </Text>
            <Text
              style={{ color: "#57606f", fontWeight: "bold", fontSize: 19 }}
            >
              <Currency quantity={totalInBasket + 5.99} currency="USD" />
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#00ccbb",
              padding: 15,
              borderRadius: 30,
              margin: 15,
            }}
            onPress={() => navigation.navigate("PreparingOrder")}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 21,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#00ccbb",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    top: -55,
    left: 460,
    borderRadius: 30,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: "gray",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  header: {
    padding: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#57606f",
    elevation: 10,
    height: 110,
  },
  image: {
    width: 50,
    height: 50,
    padding: 20,
    backgroundColor: "#gray",
    borderRadius: 30,
    resizeMode: "contain",
  },
  dispatchInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 30,
    backgroundColor: "#FFFF",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    marginTop: 15,
  },
  orderImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 10,
  },
});
