import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export type WineDiaryEntry = {
  id: string;
  date: string;
  wineName: string;
  content: string;
};

export default function DiaryScreen() {
  const [entries, setEntries] = useState<WineDiaryEntry[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const json = await AsyncStorage.getItem("@wine_diary_entries");
      if (json) setEntries(JSON.parse(json));
    } catch (err) {
      console.error("일기 불러오기 실패", err);
    }
  };

  const renderItem = ({ item }: { item: WineDiaryEntry }) => (
    <View style={styles.diaryItem}>
      <Text style={styles.diaryItemDate}>{item.date}</Text>
      <Text style={styles.diaryItemWine}>{item.wineName}</Text>
      <Text style={styles.diaryItemContent} numberOfLines={2}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <View style={styles.tabContent}>
      <View style={styles.diaryHeader}>
        <Text style={styles.diaryTitle}>와인 일기</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert("작성 기능은 아직 구현되지 않았습니다.")}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {entries.length === 0 ? (
        <View style={styles.emptyDiary}>
          <Ionicons name="book" size={64} color="#ccc" />
          <Text style={styles.emptyDiaryText}>
            아직 작성된 와인 일기가 없습니다
          </Text>
          <Text style={styles.emptyDiarySubtext}>
            오늘 마신 와인에 대한 느낌을 기록해보세요
          </Text>
          <TouchableOpacity style={styles.createDiaryButton}>
            <Ionicons
              name="create"
              size={18}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.createDiaryText}>첫 일기 작성하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  diaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  diaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#8b0000",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  emptyDiary: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyDiaryText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    textAlign: "center",
  },
  emptyDiarySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
    marginBottom: 24,
  },
  createDiaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8b0000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    elevation: 2,
  },
  createDiaryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  diaryItem: {
    backgroundColor: "#fdf0f0",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderColor: "#eee",
    borderWidth: 1,
  },
  diaryItemDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  diaryItemWine: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8b0000",
  },
  diaryItemContent: {
    fontSize: 14,
    color: "#444",
    marginTop: 6,
  },
});
