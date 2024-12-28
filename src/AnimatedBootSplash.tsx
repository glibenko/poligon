import React, { useRef, useState } from "react";
import { Animated, Image, Text, useAnimatedValue, View } from "react-native";
import BootSplash from "react-native-bootsplash";


export const AnimatedBootSplash = ({ onAnimationEnd }) => {
  const opacity = useAnimatedValue(1);

  const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
    manifest: require("../assets/bootsplash/manifest.json"),

    logo: require("../assets/bootsplash/logo.png"),
    // darkLogo: require("../assets/bootsplash/dark-logo.png"),
    // brand: require("../assets/bootsplash/brand.png"),
    // darkBrand: require("../assets/bootsplash/dark-brand.png"),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      // Perform animations and call onAnimationEnd
      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 1000,
      }).start(() => {
        onAnimationEnd();
      });
    },
  });

  console.log('container.style', container.style)

  return (
    <Animated.View {...container} style={[container.style, { opacity: opacity}]}>
      <Image {...logo} />
      <View style={{position: "absolute", bottom: 30}}>
        <Text>Glibenko Sergei</Text>
      </View>
    </Animated.View>
  );
};