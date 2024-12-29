import React, { useCallback } from "react";
import { TextInput } from "react-native";

export const SearchBar = ({onChange}) => {
  const [search, setSearch] = React.useState('');

  const onChangeText= useCallback((text) => {
    setSearch(text);
    onChange(text);
  }, [onChange]);
  
  return (
  <TextInput
    value={search}
    onChangeText={onChangeText}
    placeholder="Search..."
    style={{backgroundColor: 'white', padding: 8, margin: 16, borderRadius: 8}}
  />
)
};