import { Text, View } from "react-native";
import React from "react";

export const ListItem = ({ title, ticker }) => (
  <View style={{backgroundColor: 'yellow', width: 150, height: 100, borderRadius: 10, padding: 12}}>
    <Text>{ticker}</Text>
    <Text>{title}</Text>
  </View>
);