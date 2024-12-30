import React, { useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import BootSplash from 'react-native-bootsplash';

export const AnimatedBootSplash = ({
  onAnimationEnd,
}: {
  onAnimationEnd: () => void;
}) => {
  const [opacity] = useState(() => new Animated.Value(1));

  const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
    manifest: require('../assets/bootsplash/manifest.json'),

    logo: require('../assets/bootsplash/logo.png'),
    // darkLogo: require("../assets/bootsplash/dark-logo.png"),
    // brand: require("../assets/bootsplash/brand.png"),
    // darkBrand: require("../assets/bootsplash/dark-brand.png"),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      // Perform animations and call onAnimationEnd
      Animated.timing(opacity, {
        delay: 1000,
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
      }).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, { opacity }]}>
      <Image {...logo} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Glibenko Sergei</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    bottom: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
