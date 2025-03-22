import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import SearchScreen from "./SearchScreen";
import DiaryScreen from "./DiaryScreen";
import SettingsScreen from "./SettingsScreen";
import BottomNavBar from "../components/BottomNavBar";

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState("search");

  const renderTabContent = () => {
    switch (activeTab) {
      case "search":
        return <SearchScreen />;
      case "diary":
        return <DiaryScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <SearchScreen />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" backgroundColor="#8b0000" />
      <View style={{ flex: 1 }}>{renderTabContent()}</View>
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  activeNavText: {
    color: "#8b0000",
    fontWeight: "bold",
  },
});
