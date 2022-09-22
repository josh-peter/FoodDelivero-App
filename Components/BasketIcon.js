import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const basketTotals = useSelector(selectBasketTotal);

  if(items.length === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: "#00ccbb",
          marginHorizontal: 25,
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Basket")}
      >
        <Text
          style={{
            fontWeight: "400",
            fontSize: 23,
            backgroundColor: "#01A296",
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: "#fff",
          }}
        >
          {items.length}
        </Text>
        <Text
          style={{
            flex: 1,
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          View Basket
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <Currency quantity={basketTotals} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: 80,
    overflow: "hidden",
    zIndex: 999,
    bottom: 40,
  },
});
