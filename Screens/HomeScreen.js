import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import styles from "./HomeStyles";
import Categories from "../Components/Categories";
import FeaturedRow from "../Components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured"]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->{
          }
        }
      }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  console.log(featuredCategories);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        {/* Header */}
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          style={styles.headerImg}
        />
        <View style={{ paddingLeft: 10, paddingBottom: 3, flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15, color: "#D3D3D3" }}>
            Deliver Now!
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 25, color: "#000" }}>
            Current Location{" "}
            <FontAwesome5 name="chevron-down" size={20} color="#00CCBB" />
          </Text>
        </View>
        <FontAwesome5 name="user" size={30} color="#00ccbb" />
      </View>

      {/* Search */}
      <View style={styles.search}>
        <View style={styles.searchInput}>
          <FontAwesome5
            name="search"
            size={20}
            color="#000"
            style={{ paddingRight: 10 }}
          />
          <TextInput
            placeholder="Restaurants and Cousines"
            keyboardType="default"
            style={{ fontSize: 18 }}
          />
        </View>
        <Ionicons name="settings" size={30} color="#00ccbb" />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 13,
          paddingBottom: 200,
          marginTop: 10,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* featured Row */}

        {/* featured */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
