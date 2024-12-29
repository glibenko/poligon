import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const ListItem = ({
  title,
  ticker,
}: {
  title: string;
  ticker: string;
}) => (
  <View style={styles.container}>
    <Text style={styles.ticker}>{ticker}</Text>
    <Text style={styles.title} numberOfLines={3}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    width: 150,
    height: 100,
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  ticker: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});
