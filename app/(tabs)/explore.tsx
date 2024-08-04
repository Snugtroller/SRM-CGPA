import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { FlatGrid } from "react-native-super-grid";

export default function Explore() {
  const [items, setItems] = React.useState([
    {
      name: "RESOURCE LIBRARY",
      code: "#8C92AC",
      image: require("../library.png"),
    },
    { name: "FEEDBACK", code: "#8C92AC", image: require("../feedback.png"), },
    { name: "WORKING...", code: "#8C92AC" },
    { name: "WORKING...", code: "#8C92AC" },
    { name: "WORKING...", code: "#8C92AC" },
    { name: "WORKING...", code: "#8C92AC" },
    { name: "WORKING...", code: "#8C92AC" },
    { name: "WORKING...", code: "#8C92AC" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Features</Text>
      <Text style={styles.info}>Select any category you want to explore</Text>
      <Divider style={styles.divider} />

      <FlatGrid
        itemDimension={130}
        data={items}
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: item.code }]}
          >
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    padding: 15,
  },
  title: {
    color: "white",
    marginTop: 50,
    marginLeft: 110,
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    marginTop: 10,
    color: "grey",
    marginLeft: 60,
  },
  divider: {
    backgroundColor: "#ffffff",
    height: 2,
    marginHorizontal: 15,
    borderRadius: 5,
    marginVertical: 15,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    height: 150,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
