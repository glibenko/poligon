import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { Dimensions, FlatList, Text, TextInput, useWindowDimensions, View } from "react-native";
import { API_KEY } from "../keys";
import { ListItem } from "./ListItem";

const URL = 'https://api.polygon.io/v3/reference/tickers';


export const List = ({search}) => {
  // const {width} = Dimensions.get('window');
  const {height, width, scale, fontScale} = useWindowDimensions();
  const columns = useMemo(() => Math.floor(width / (150 + 20)), [width]);

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
    retry: 2,
    staleTime: 60 * 1000 * 60, // 1 hour
    queryFn: ({ pageParam }) => {
      console.log('pageParam', pageParam);
      const searchParam = search ? `search=${search}&` : '';
      return axios(`${pageParam ? pageParam + '&' : URL + '?'}${searchParam}&limit=100&active=true&apiKey=${API_KEY}`).then(res => res.data)
    } });

  if (isFetching && !data) {
    return <View><Text>Loading...</Text></View>
  }

  if (error && !data) {
    return <View><Text>{error.message || 'Something went wrong'}</Text></View>
  }


  return (
    <View style={{backgroundColor: 'red', height: 400}}>
      <FlatList
        key={columns}
        style={{backgroundColor: 'green'}}
        contentContainerStyle={{gap: 8}}
        data={data}
        getItemLayout={(_data, index) => (
          {length: 100, offset: 100 * index, index}
        )}
        // initialNumToRender={10}
        // windowSize={10}
        renderItem={({ item }) => <ListItem title={item.name} ticker={item.ticker} />}
        keyExtractor={(item) => item.ticker}
        numColumns={columns}
        columnWrapperStyle={{gap: 8, justifyContent: 'center'}}
        onEndReachedThreshold={0.5}
        progressViewOffset={0.5}
        windowSize={2}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
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


