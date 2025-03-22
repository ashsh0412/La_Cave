import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Wine } from "../types/wine";

export default function WineCard({
  wine,
  onPress,
}: {
  wine: Wine;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: wine.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {wine.wine}
        </Text>
        <Text style={styles.winery}>{wine.winery}</Text>
        <Text style={styles.location}>{wine.location}</Text>
        <Text style={styles.rating}>
          ⭐ {Number(wine.rating.average).toFixed(1)} ({wine.rating.reviews})
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 65,
    height: 95,
    borderRadius: 6,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: "#222222",
  },
  winery: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: "#777777",
    marginBottom: 6,
  },
  rating: {
    fontSize: 13,
    color: "#222222",
  },
});
