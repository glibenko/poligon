import React, { useCallback, useState } from "react";
import { SearchBar } from "./SearchBar";
import { View } from "react-native";
import { List } from "./List";

const debounce = (fn, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export const Tickers = () => {
  const [search, setSearch] = useState('');

  const db = debounce(setSearch, 300);
  const onChange = useCallback((text) => db(text), [db]);

  console.log('search', search)

  return (
      <View style={{flex:1}}>
        <SearchBar onChange={onChange} />
        <List search={search} />
      </View>
  );
};