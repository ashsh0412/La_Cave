import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { fetchWinesByType } from "../api/wineAPI";
import { Wine } from "../types/wine";
import WineCard from "../components/WineCard";
import { Ionicons } from "@expo/vector-icons";

const wineTypes: {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: "reds", name: "레드", icon: "wine" },
  { id: "whites", name: "화이트", icon: "wine-outline" },
  { id: "sparkling", name: "스파클링", icon: "sparkles" },
  { id: "rose", name: "로제", icon: "flower" },
  { id: "dessert", name: "디저트", icon: "ice-cream" },
  { id: "port", name: "포트", icon: "boat" },
];

const sortOptions: {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: "rating", name: "평점순", icon: "star" },
  { id: "reviews", name: "리뷰순", icon: "chatbubbles" },
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [wineType, setWineType] = useState("reds");
  const [sortBy, setSortBy] = useState("rating");
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchWinesByType(wineType)
      .then((data) => {
        setWines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("와인 정보를 불러오는데 실패했습니다");
        setLoading(false);
      });
  }, [wineType]);

  const filtered = wines
    .filter((w) =>
      `${w.wine} ${w.winery} ${w.location}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .sort((a, b) => {
      const aVal =
        sortBy === "rating"
          ? parseFloat(a.rating.average)
          : parseInt(a.rating.reviews);
      const bVal =
        sortBy === "rating"
          ? parseFloat(b.rating.average)
          : parseInt(b.rating.reviews);
      return bVal - aVal;
    });

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchWinesByType(wineType)
      .then(setWines)
      .catch((err) => {
        console.error(err);
        setError("와인 정보를 불러오는데 실패했습니다");
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      {/* 검색창 */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="#8b0000"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="와인, 와이너리, 지역 검색"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          placeholderTextColor="#999"
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => setQuery("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* 와인 종류 선택 */}
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>와인 종류</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBar}
        >
          {wineTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setWineType(type.id)}
              style={[
                styles.filterButton,
                wineType === type.id && styles.activeFilterButton,
              ]}
            >
              <Ionicons
                name={type.icon}
                size={16}
                color={wineType === type.id ? "#fff" : "#666"}
                style={styles.buttonIcon}
              />
              <Text
                style={[
                  styles.filterText,
                  wineType === type.id && styles.activeFilterText,
                ]}
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 정렬 버튼 */}
      <View style={styles.sortBar}>
        <Text style={styles.sortLabel}>정렬:</Text>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => setSortBy(option.id)}
            style={[
              styles.sortButton,
              sortBy === option.id && styles.activeSortButton,
            ]}
          >
            <Ionicons
              name={option.icon}
              size={14}
              color={sortBy === option.id ? "#fff" : "#666"}
              style={styles.buttonIcon}
            />
            <Text
              style={[
                styles.sortText,
                sortBy === option.id && styles.activeSortText,
              ]}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 로딩 또는 에러 또는 리스트 */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#8b0000" />
          <Text style={styles.loaderText}>
            와인 목록을 불러오는 중입니다...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#8b0000" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {filtered.length > 0 ? `${filtered.length}개의 와인 찾음` : ""}
            </Text>
          </View>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <WineCard wine={item} />}
            ListEmptyComponent={
              query.length > 0 ? (
                <View style={styles.noResultsContainer}>
                  <Ionicons name="search" size={48} color="#ccc" />
                  <Text style={styles.noResults}>검색 결과가 없습니다.</Text>
                  <Text style={styles.noResultsSubtext}>
                    다른 검색어로 시도해보세요.
                  </Text>
                </View>
              ) : (
                <View style={styles.noResultsContainer}>
                  <Ionicons name="wine" size={48} color="#ccc" />
                  <Text style={styles.noResults}>
                    이 카테고리에는 와인이 없습니다.
                  </Text>
                </View>
              )
            }
            contentContainerStyle={[
              styles.listContent,
              filtered.length === 0 && styles.emptyListContent,
            ]}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  categoryContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  filterBar: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 1,
  },
  activeFilterButton: {
    backgroundColor: "#8b0000",
    borderColor: "#8b0000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 6,
  },
  filterText: {
    color: "#666",
    fontWeight: "500",
    fontSize: 14,
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sortBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 4,
  },
  sortLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
    fontWeight: "500",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 1,
  },
  activeSortButton: {
    backgroundColor: "#8b0000",
    borderColor: "#8b0000",
  },
  sortText: {
    color: "#666",
    fontSize: 14,
  },
  activeSortText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultsCount: {
    color: "#666",
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, // 네비게이션 바 높이만큼 여백 추가
  },
  emptyListContent: {
    flex: 1,
    justifyContent: "center",
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  noResults: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  noResultsSubtext: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 14,
    color: "#999",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#8b0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
