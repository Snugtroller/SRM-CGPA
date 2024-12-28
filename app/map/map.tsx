import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import MapView, { Marker, Region, Polyline } from "react-native-maps";
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
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
  };

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
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log("Focus button pressed");
            focusMap();
          }}
          style={{
            padding: 10,
          }}
        >
          <Text style={{ color: "white" }}>Focus</Text>
        </TouchableOpacity>
      ),
      headerTitle: "Map View",
      headerStyle: {
        backgroundColor: "#282c34",
      },
      headerTintColor: "#fff",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            console.log("Back button pressed");
            try {
              navigation.goBack();
            } catch (err) {
              console.error("Navigation error:", err);
            }
          }}
          style={styles.backButtonContainer}
        >
          <Image source={Back} style={styles.backButtonIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const focusMap = () => {
    if (!mapRef.current) {
      console.error("Map reference is not initialized");
      return;
    }

    const SRMKTR = {
      latitude: 12.8229,
      longitude: 80.044,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0071,
    };
    mapRef.current?.animateToRegion(SRMKTR, 1000);
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
          ref={mapRef}
          style={styles.map}
          region={mapRegion}
          showsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsMyLocationButton={true}
          onPress={handlePress}
          onRegionChangeComplete={(region) => setMapRegion(region)}
        >
          {marker && (
            <>
              <Marker
                coordinate={marker}
                title="Selected Location"
                description="This is your chosen spot"
              />
              <Polyline
                coordinates={[userLocation, marker]}
                strokeColor="yellow"
                strokeWidth={3}
              />
            </>
          )}
        </MapView>
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
