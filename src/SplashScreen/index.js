import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Image,
  SafeAreaView,
  Dimensions,
  Easing,
  Text,
} from "react-native";
import styles from "./style";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Animated.View
          style={[
            styles.centerContent,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Image
            source={require("../../assets/images/logoo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Animated.Text style={[styles.footerText, { opacity: opacityAnim }]}>
          © {new Date().getFullYear()} - All rights reserved by Team 3 -{" "}
          <Text style={styles.bold}>Continental</Text>
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
