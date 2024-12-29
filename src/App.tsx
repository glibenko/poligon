/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
} from 'react-native';
import { AnimatedBootSplash } from './AnimatedBootSplash';
import { Stocks } from './Stocks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import BootSplash from "react-native-bootsplash";

const pr = new Promise((resolve => setTimeout(() => resolve('done'), 3000)));
const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [visible, setVisible] = React.useState(true);

  console.log('isDarkMode', isDarkMode);

  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //     await pr;
  //   };

  //   init().finally(async () => {
  //     await BootSplash.hide({ fade: true });
  //     console.log("BootSplash has been hidden successfully");
  //   });
  // }, []);

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
        <SafeAreaView style={{flex: 1}}>
        {visible ? <AnimatedBootSplash
          onAnimationEnd={() => {
            setVisible(false);
          }}
        /> : null}
          <Text>lol work</Text>
          <Stocks />
        </SafeAreaView>
        </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

