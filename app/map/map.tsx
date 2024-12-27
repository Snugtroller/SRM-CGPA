import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Text,
} from "react-native";
import { useNavigation } from "expo-router";
import Back from "../back.png";

export default function MapScreen() {
  const navigation = useNavigation();
  const mapRef = useRef(null); // Create a ref for the MapView

  const [mapRegion, setMapRegion] = useState({
    latitude: 12.8229,
    longitude: 80.044,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0071,
  });
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to show your location."
        );
        return;
      }
      setLocationPermission(true);
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text style={{ color: "#fff" }}>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
      headerTitle: "Map View",
      headerStyle: {
        backgroundColor: "#282c34",
      },
      headerTintColor: "#fff",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}
        >
          <Image source={Back} style={styles.backButtonIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const focusMap = () => {
    const SRMKTR = {
      latitude: 12.8229,
      longitude: 80.044,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0071,
    };
    mapRef.current?.animateToRegion(SRMKTR, 1000); // Smooth animation to the region
  };
  const onMarkerSelected = (marker: any) => {
    Alert.alert(marker.name);
  };

  const calloutPressed = (ev: any) => {
    console.log(ev);
  };

  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  return (
    <View style={styles.container}>
      {locationPermission ? (
        <MapView
          ref={mapRef} // Attach the ref to the MapView
          style={styles.map}
          region={mapRegion}
          showsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={(region) => setMapRegion(region)}
        />
      ) : (
        <View style={styles.permissionDenied}>
          <Text style={{ color: "#fff" }}>Location permission denied.</Text>
        </View>
      )}
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
  backButtonContainer: {
    padding: 10,
  },
  backButtonIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  permissionDenied: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282c34",
  },
});
