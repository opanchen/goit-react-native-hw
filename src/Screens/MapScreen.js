import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

export const MapScreen = () => {
  const [location, setLocation] = useState(null);

  const { params } = useRoute();
  console.log("MAP ==> ROUTE PARAMS: \n", params);

  useEffect(() => {
    if (!params) return;
    setLocation(params.coordinates);
  }, [params]);

  return (
    <>
      {location ? (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            // initialRegion={{
            //   latitude: 37.78825,
            //   longitude: -122.4324,
            //   latitudeDelta: 0.0922,
            //   longitudeDelta: 0.0421,
            region={{
              ...location,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // showsUserLocation={true}
            mapType="standart"
            minZoomLevel={15}
            // onMapReady={() => console.log("Map is ready")}
            // onRegionChange={() => console.log("Region change")}
          >
            <Marker
              title={params.title}
              description={params.locationText}
              coordinate={location}
            />
          </MapView>
        </View>
      ) : (
        <View>
          <Text>Loading....</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
