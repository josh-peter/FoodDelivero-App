import React from 'react';
import { StyleSheet } from 'react-native';



    const styles = StyleSheet.create({
        headerImg: {
          width: 50,
          height: 50,
          resizeMode: "cover",
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 30,
          backgroundColor: "#eee",
        },
        header: {
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingTop: 15,
          paddingHorizontal: 20,
          
        },
        search: {
          backgroundColor: "white",
          flexDirection: "row",
          paddingBottom: 15,
          paddingVertical: 10,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        searchInput: {
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#eee",
          flex: 1,
          padding: 10,
          fontSize: 15,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
    });
      
    
export default styles;