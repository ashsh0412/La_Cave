import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const settingsOptions: Array<{
  id: string;
  icon:
    | "person"
    | "notifications"
    | "color-palette"
    | "language"
    | "shield"
    | "help-circle"
    | "information-circle";
  title: string;
  subtitle: string;
}> = [
  {
    id: "profile",
    icon: "person",
    title: "프로필 관리",
    subtitle: "개인 정보 및 취향 설정",
  },
  {
    id: "notifications",
    icon: "notifications",
    title: "알림 설정",
    subtitle: "앱 알림 관리",
  },
  {
    id: "appearance",
    icon: "color-palette",
    title: "테마 설정",
    subtitle: "앱 디자인 및 색상",
  },
  {
    id: "language",
    icon: "language",
    title: "언어",
    subtitle: "한국어",
  },
  {
    id: "privacy",
    icon: "shield",
    title: "개인정보 보호",
    subtitle: "개인정보 및 데이터 설정",
  },
  {
    id: "help",
    icon: "help-circle",
    title: "도움말",
    subtitle: "FAQ 및 문의하기",
  },
  {
    id: "about",
    icon: "information-circle",
    title: "앱 정보",
    subtitle: "버전 1.0.0",
  },
];

export default function SettingsScreen() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.settingsTitle}>설정</Text>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsIconContainer}>
              <Ionicons name={item.icon} size={22} color="#8b0000" />
            </View>
            <View style={styles.settingsTextContainer}>
              <Text style={styles.settingsItemTitle}>{item.title}</Text>
              <Text style={styles.settingsItemSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});
