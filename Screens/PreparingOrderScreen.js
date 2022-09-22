import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ProgressBarAndroid,
} from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#00ccbb",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animatable.Image
        source={require("../assets/foodloading-unscreen.gif")}
        animation={"slideInUp"}
        iterationCount={1}
        style={{ width: 400, height: 400 }}
      />

      <Animatable.Text
        animation={"slideInUp"}
        iterationCount={1}
        style={styles.slideInUp}
      >
        Waiting for Restaurant to accept your Order
      </Animatable.Text>

      <View style={styles.example}>
        <ProgressBarAndroid color="#DD5A6D" />
      </View>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

const styles = StyleSheet.create({
  slideInUp: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 15,
    color: "#fff",
  },
  example: {
    marginVertical: 24,
    marginTop: 35,
  },
});
