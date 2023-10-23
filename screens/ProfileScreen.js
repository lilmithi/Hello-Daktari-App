import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { globalStyles } from "../constants/globalcss";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/styles";
import NotificationBell from "../components/ui/NotificationBell";
import HeaderText from "../components/ui/HeaderText";
import NormalText from "../components/ui/NormalText";

import { useNavigation } from "@react-navigation/native";
import ProfileCard from "../components/Cards/ProfileCard";
import AuthContextProvider, { AuthContext } from "../store/auth-context";

export default function ProfileScreen() {
  const authCtx = useContext(AuthContext);
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <HeaderText>Profile</HeaderText>
        <View style={styles.profileMain}>
          <View style={styles.profileMainInner}>
            <Pressable style={styles.imageContainer}>
              <Image source={require("../assets/images/yvonne.png")} />
            </Pressable>
            <View style={{ marginLeft: 10 }}>
              <NormalText styleProp={globalStyles.whiteText}>
                Yvonne Katama
              </NormalText>
              <NormalText styleProp={globalStyles.whiteText}>
                katama@gmail.com
              </NormalText>
            </View>
          </View>
        </View>
        <NormalText>General</NormalText>
        <ProfileCard
          src={require("../assets/images/pro_user.png")}
          header="Account Information"
          info="Change your account information"
        />
        <ProfileCard
          src={require("../assets/images/pro_user.png")}
          header="Account Information"
          info="Change your account information"
        />
        <ProfileCard
          src={require("../assets/images/pro_user.png")}
          header="Account Information"
          info="Change your account information"
        />
        <ProfileCard
          src={require("../assets/images/pro_user.png")}
          header="Account Information"
          info="Change your account information"
        />
        <ProfileCard
          src={require("../assets/images/pro_user.png")}
          header="Logout"
          info="Logout of your account"
          onPress={authCtx.logout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileMain: {
    backgroundColor: Colors.darkBlue,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    // IOS
    shadowColor: Colors.darkBlue,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  profileMainInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {},
  image: {
    width: 70,
    height: 70,
  },
});
