// @generated: @expo/next-adapter@2.1.5
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from './details'
import Link from '../components/Link'
import fbDatabase from '../components/firebase'

const Stack = createStackNavigator();

const loadUsers = async () => {
  const userRef = fbDatabase.ref('users')
  console.log(userRef)
    
  try {
    console.log('trying to fetch');
    
    userRef.on('value', (snapshot) => {
      console.log('loading users');
    
      console.log('usersss');
      
      console.log(snapshot.val())
    }, (error) => {
      console.log(error);
      
    })
    console.log('loadeddddd');
  } catch {
    console.log('yooo');
    
  }
  
  
}

function HomeScreen({ navigation }) {
  const openJobDetails = () => navigation.navigate("Details");
  const [users, setUsers] = useState()

  useEffect(() => {
    console.log('loading user');
    
    loadUsers()
  }, [])

  return (
    <View style={styles.container}>
      <Link href="details" onPress={openJobDetails}>
        <Text>Details</Text>
      </Link>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
    </View>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailPage} />
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
