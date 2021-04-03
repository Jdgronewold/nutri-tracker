// @generated: @expo/next-adapter@2.1.5
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from './details'

// import Link from '../components/Link'

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const openJobDetails = () => navigation.navigate("JobDetails");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
    </View>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
})
