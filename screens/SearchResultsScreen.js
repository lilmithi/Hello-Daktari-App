import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { AuthContext } from "../store/auth-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../constants/globalcss";
import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import SearchInput from "../components/FormElements/SearchInput";
import BannerBlock from "../components/Blocks/BannerBlock";
import FeaturesBlock from "../components/Blocks/FeaturesBlock";
import AdBlock from "../components/Blocks/AdBlock";
import LabCard from "../components/Cards/LabCard";
import SearchShopCard from "../components/Cards/SearchShopCard";
import SearchDoctorCard from "../components/Cards/SearchDoctorCard";
import NormalText from "../components/ui/NormalText";

export default function SearchResultsScreen({ route, navigation }) {
  const [labs, setLabs] = useState([]);
  const [products, setProducts] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (route.params) {
      if (route.params.doctor) {
        setDoctors(route.params.doctor);
      }
      if (route.params.labs) {
        setLabs(route.params.labs);
      }
      if (route.params.products) {
        setProducts(route.params.products);
      }
    }
  }, [route.params]);

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <SearchInput />
      <View style={{ marginBottom: 100 }}>
        {labs.length > 0 ? (
          <View>
            <HeaderText
              styleProp={styles.headerText}
              fontProp="poppins-semibold"
            >
              Lab Results
            </HeaderText>

            <FlatList
              data={labs}
              keyExtractor={(item) => item.lab_id}
              renderItem={({ item }) => (
                <LabCard
                  name={item.lab_care_name}
                  code={item.lab_care_code}
                  price={item.lab_amount}
                  onPress={() => navigateToSingleProduct(item)}
                />
              )}
            />
          </View>
        ) : null}

        {products.length > 0 ? (
          <View>
            <HeaderText
              styleProp={styles.headerText}
              fontProp="poppins-semibold"
            >
              Lab Results
            </HeaderText>
            <FlatList
              data={products}
              keyExtractor={(item) => item.product_id}
              renderItem={({ item }) => (
                <SearchShopCard
                  name={item.product_name}
                  price={item.product_price}
                  onPress={() => navigateToSingleProduct(item)}
                />
              )}
            />
          </View>
        ) : null}

        {doctors.length > 0 ? (
          <View>
            <HeaderText
              styleProp={styles.headerText}
              fontProp="poppins-semibold"
            >
              Lab Results
            </HeaderText>
            <FlatList
              data={doctors}
              keyExtractor={(item) => item.doctor_id}
              renderItem={({ item }) => (
                <SearchDoctorCard
                  name={item.doctor_name}
                  price={item.doctor_rate}
                  onPress={() => navigateToSingleProduct(item)}
                />
              )}
            />
          </View>
        ) : null}

        {labs.length === 0 && products.length === 0 && doctors.length === 0 && (
          <NormalText>Nothing found</NormalText>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});
