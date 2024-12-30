import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { ListItem } from './ListItem';
import { fetchTickers } from '../helpers';
import { Ticker, TickerResponse } from '../types';
import { ListEmpty } from './ListEmpty';

export const List = ({ search }: { search: string }) => {
  const { width } = useWindowDimensions();
  const columns = useMemo(() => Math.floor(width / (150 + 20)), [width]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<TickerResponse, Error, Ticker[]>({
    select: (d) => d?.pages?.flatMap((page) => [...page?.results]),
    queryKey: ['todos', search],
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next_url,
    retry: 2,
    staleTime: 60 * 1000 * 60, // 1 hour
    queryFn: ({ pageParam = '' }: { pageParam: any }) =>
      fetchTickers(pageParam, search),
  });

  if (isFetching && !data) {
    return <ListEmpty />;
  }

  if (error && !data) {
    return (
      <View testID="error" style={styles.error}>
        <Text style={styles.errorText}>
          {error.message || 'Something went wrong'}
        </Text>
      </View>
    );
  }

  return (
    <View
      testID="list"
      style={Platform.OS === 'web' ? styles.containerWeb : styles.container}
    >
      <FlatList
        key={columns}
        contentContainerStyle={styles.listContainer}
        data={data}
        getItemLayout={(_data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        renderItem={({ item }) => (
          <ListItem title={item.name} ticker={item.ticker} />
        )}
        keyExtractor={(item) => item.ticker}
        numColumns={columns}
        columnWrapperStyle={styles.wrapper}
        onEndReachedThreshold={0.5}
        progressViewOffset={0.5}
        windowSize={10}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
      />
      <View style={styles.info}>
        {isFetchingNextPage ? (
          <>
            <ActivityIndicator size="small" color="#ccc" />
            <Text>Loading more...</Text>
          </>
        ) : null}
        {error && !isFetchingNextPage ? (
          <>
            <Text style={styles.errorText}>
              {error?.message || 'Something went wrong'}
            </Text>
            <Pressable style={styles.retry} onPress={() => fetchNextPage()}>
              <Text>Retry</Text>
            </Pressable>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 8, justifyContent: 'center' },
  listContainer: {
    gap: 8,
  },
  containerWeb: {
    height: 'calc(100vh - 90px)',
  },
  container: {
    flex: 1,
  },
  info: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  retry: {
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
