import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { API_KEY } from "./keys";

const URL = 'https://api.polygon.io/v3/reference/tickers';


export const Stocks = () => {
  const [search, setSearch] = React.useState('');
  const { data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status} = useInfiniteQuery({
    select: (data) => data?.pages?.flatMap((page) => [...page?.results]),
    queryKey: ['todos', search], initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.next_url,
    queryFn: ({ pageParam }) => {
      console.log('pageParam', pageParam);
      const searchParam = search ? `search=${search}&` : '';
      return axios(`${pageParam ? pageParam + '&' : URL + '?'}${searchParam}&limit=30&active=true&apiKey=${API_KEY}`).then(res => res.data)
    } });

  console.log('data', hasNextPage, error, isFetchingNextPage, isFetching);

  if (isFetching && !data) {
    return <View><Text>Loading...</Text></View>
  }

  if (error && !data) {
    return <View><Text>{error.message || 'Something went wrong'}</Text></View>
  }

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={{backgroundColor: 'white', padding: 8, margin: 16, borderRadius: 8}}
      />
      <FlatList
        style={{backgroundColor: 'green'}}
        contentContainerStyle={{gap: 16}}
        data={data}
        renderItem={({ item }) => <Item title={item.name} ticker={item.ticker} />}
        keyExtractor={(item) => item.ticker}
        numColumns={2}
        columnWrapperStyle={{gap: 16, justifyContent: 'center'}}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          console.log('onEndReached');
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
      {isFetchingNextPage && <Text>Loading more...</Text>}
      {error && <Text>{error.message}</Text>}
    </View>
  );
};


const Item = ({ title, ticker }) => (
  <View style={{backgroundColor: 'yellow', width: 150, height: 100, borderRadius: 10, padding: 12}}>
    <Text>{ticker}</Text>
    <Text>{title}</Text>
  </View>
);