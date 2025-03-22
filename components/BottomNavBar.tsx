// components/BottomNavBar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = [
  { key: "search", icon: "search", label: "탐색" },
  { key: "diary", icon: "book", label: "일기" },
  { key: "settings", icon: "settings", label: "설정" },
];

export default function BottomNavBar({ activeTab, onTabChange }: Props) {
  return (
    <View style={styles.navbar}>
      {tabs.map(({ key, icon, label }) => (
        <TouchableOpacity
          key={key}
          style={styles.navItem}
          onPress={() => onTabChange(key)}
        >
          <Ionicons
            name={
              activeTab === key ? (icon as any) : (`${icon}-outline` as any)
            }
            size={24}
            color={activeTab === key ? "#8b0000" : "#666"}
          />
          <Text
            style={[styles.navText, activeTab === key && styles.activeNavText]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
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
