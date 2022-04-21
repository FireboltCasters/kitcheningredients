import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply, TextWithIcon } from 'kitcheningredients';
import {NativeBaseProvider} from 'native-base';
import {ConfigHolderTest} from "kitcheningredients";

const config = {
  dependencies: {
// For Expo projects (Bare or managed workflow)
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
// For non expo projects
// 'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <ConfigHolderTest><Text>Hi</Text></ConfigHolderTest>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
