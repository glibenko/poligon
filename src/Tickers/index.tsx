import React, { useCallback, useState } from 'react';
import { SearchBar } from './SearchBar';
import { StyleSheet, View } from 'react-native';
import { List } from './List';
import { debounce } from '../helpers';

export const Tickers = () => {
  const [search, setSearch] = useState('');

  const db = debounce(setSearch, 300);
  const onChange = useCallback((text: string) => db(text), [db]);

  return (
    <View style={styles.container}>
      <SearchBar onChange={onChange} />
      <List search={search} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});
