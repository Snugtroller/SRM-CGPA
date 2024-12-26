import React, { useState, useEffect, useLayoutEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";

export default function MapScreen() {
  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState({
    latitude: 12.8229,
    longitude: 80.044,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0071,
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Map View", // Custom title
      headerStyle: {
        backgroundColor: "#282c34", // Custom background color
      },
      headerTintColor: "#fff", // Text color
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>{" "}
          {/* Custom back button */}
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
