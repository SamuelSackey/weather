import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home() {
  const [weatherData, setWeatherData] = useState();

  async function getWeather(city = "Accra") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=xxxx`
    )
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response);
      })
      .catch((e) => console.log(e));
  }

  function FTC(temp) {
    return temp - 273.15;
  }

  useEffect(() => {
    getWeather();
  }, []);

  const cities = ["Accra", "Kumasi", "Abuja", "Lagos"];

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.box}>
        <View style={styles.boxrow}>
          <Text style={styles.boxtext}>Today</Text>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.boxdate}>{new Date().toDateString()}</Text>
            <Text
              style={[
                styles.boxdate,
                { textTransform: "capitalize", color: "lightgrey" },
              ]}
            >
              {weatherData?.weather[0].description}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.boxrow}>
          <Text style={styles.boxtemp}>
            {FTC(weatherData?.main.temp).toFixed(1)}
            <Text style={styles.boxtempc}>c</Text>
          </Text>
          <Image
            source={require("../assets/cloudy-day.png")}
            style={styles.wicon}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location-outline" size={24} color="white" />
          <Text style={styles.boxloc}>{weatherData?.name}</Text>
        </View>
      </View>

      <FlatList
        data={cities}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => getWeather(item)}
            style={{
              backgroundColor: "#332f57",
              padding: 20,
              borderRadius: 10,
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>{item}</Text>
            <Ionicons
              name={
                item === weatherData?.name
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              color="white"
              size={18}
            />
          </TouchableOpacity>
        )}
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#29254a",
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "#332f57",
    height: 200,
    padding: 20,
    borderRadius: 20,
  },
  boxrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxtext: {
    fontSize: 30,
    color: "white",
  },
  boxdate: {
    color: "white",
  },
  boxtemp: {
    fontSize: 60,
    color: "white",
  },
  boxtempc: {
    fontSize: 40,
    color: "orange",
  },
  wicon: {
    width: 90,
    height: 90,
    marginRight: 20,
  },
  boxloc: {
    color: "white",
    paddingLeft: 10,
  },
});
