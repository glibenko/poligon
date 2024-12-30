import React, { useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export const SearchBar = ({
  onChange,
}: {
  onChange: (text: string) => void;
}) => {
  const [search, setSearch] = React.useState('');

  const onChangeText = useCallback(
    (text: string) => {
      setSearch(text);
      onChange(text);
    },
    [onChange],
  );

  return (
    <View style={styles.cotainer}>
      <TextInput
        testID="search"
        value={search}
        onChangeText={onChangeText}
        placeholder="Search..."
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    padding: 16,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    minWidth: 300,
    flexShrink: 0,
  },
});
