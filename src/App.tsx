import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { AnimatedBootSplash } from './Splash';
import { QueryClientProvider } from '@tanstack/react-query';
import { Tickers } from './Tickers';
import { queryClient } from './helpers';

function App(): React.JSX.Element {
  const [visible, setVisible] = React.useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        <Tickers />
      </SafeAreaView>
      {visible ? (
        <AnimatedBootSplash
          onAnimationEnd={() => {
            setVisible(false);
          }}
        />
      ) : null}
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
