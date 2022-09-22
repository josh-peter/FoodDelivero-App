import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPress, setIsPress] = useState(false);
  const dispatch = useDispatch();
  const basketItems = useSelector((state) =>
    selectBasketItemsWithId(state, id)
  );

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!basketItems.length) return;
    dispatch(removeFromBasket(id));
  };
  return (
    <>
      <TouchableOpacity
        style={styles.dishRow}
        onPress={() => setIsPress(!isPress)}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{name}</Text>
            <Text style={{ color: "#7f8c8d" }}>{description}</Text>
            <Text style={{ color: "#7f8c8d", marginTop: 5 }}>
              <Currency quantity={price} currency="USD" />
            </Text>
          </View>
          <View>
            <Image source={{ uri: urlFor(image).url() }} style={styles.img} />
          </View>
        </View>
      </TouchableOpacity>
      {isPress && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              disabled={!basketItems.length}
              onPress={removeItemFromBasket}
            >
              <FontAwesome5
                name="minus"
                size={28}
                color="#fff"
                style={[
                  styles.minusbtn,
                  basketItems.length > 0
                    ? { backgroundColor: "#e74c3c" }
                    : { backgroundColor: "gray" },
                ]}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 27, fontWeight: "500" }}>
              {basketItems.length}
            </Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <FontAwesome5
                name="plus"
                size={28}
                color="#fff"
                style={{
                  backgroundColor: "#00ccbb",
                  padding: 7,
                  borderRadius: 30,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderColor: "#eee",
    resizeMode: "cover",
    padding: 15,
    borderWidth: 1,
    elevation: 8,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 13,
  },
  modalContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  dishRow: {
    padding: 18,
    borderWidth: 1,
    borderColor: "#dfe4ea",
    backgroundColor: "#fff",
  },
  minusbtn: {
    backgroundColor: "#f39c12",
    padding: 7,
    borderRadius: 30,
    marginRight: 10,
  },
});
