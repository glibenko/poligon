import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ItemEmpty = () => (
  <View style={styles.item}>
    <View style={styles.line1} />
    <View style={styles.line2} />
  </View>
);

export const ListEmpty = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#ccc" />
    <Text style={styles.title} testID="loadingEmpty">
      Loading...
    </Text>
    <View style={styles.items}>
      <ItemEmpty />
      <ItemEmpty />
      <ItemEmpty />
      <ItemEmpty />
      <ItemEmpty />
      <ItemEmpty />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 14,
    color: '#ccc',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    width: 150,
    height: 100,
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  line1: {
    backgroundColor: '#ccc',
    width: '40%',
    height: 10,
    borderRadius: 10,
  },
  line2: {
    backgroundColor: '#ccc',
    opacity: 0.5,
    width: '80%',
    height: 10,
    borderRadius: 10,
    marginTop: 8,
  },
});
