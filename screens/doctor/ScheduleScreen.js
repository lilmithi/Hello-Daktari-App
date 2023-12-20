import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationBell from "../../components/ui/NotificationBell";
import NormalText from "../../components/ui/NormalText";

import { globalStyles } from "../../constants/globalcss";

export default function ScheduleScreen() {
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <NotificationBell />
      <ScrollView>
        <NormalText>Your schedule will appear here</NormalText>
      </ScrollView>
    </SafeAreaView>
  );
}
