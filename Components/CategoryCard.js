import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: "white",
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
      }}
    >
      <Image source={{ uri: imgUrl }} style={{ width: 100, height: 100 }} />
      <Text
        style={{
          position: "absolute",
          bottom: 16,
          fontSize: 14,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
