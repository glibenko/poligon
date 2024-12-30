import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';

export const AnimatedBootSplash = ({
  onAnimationEnd,
}: {
  onAnimationEnd: () => void;
}) => {
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    Animated.timing(opacity, {
      delay: 1000,
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      onAnimationEnd();
    });
  }, [opacity, onAnimationEnd]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
        },
      ]}
    >
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('./imgs/logo.png')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Glibenko Sergei</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'absolute',
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
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
