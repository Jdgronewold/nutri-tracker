// @generated: @expo/next-adapter@2.1.5
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from './details'
import AuthenticationPage from './authenticate'
import Link from '../components/Link'
import fbDatabase from '../components/firebase'
import { getUser } from '../utils/userUtils';

const Stack = createStackNavigator();

const loadUsers = async () => {
  const userRef = fbDatabase.ref('users')
    
  try {
    
    userRef.on('value', (snapshot) => {
      console.log('logging from index');
      
      console.log(snapshot.val())
    }, (error) => {
      console.log(error);
      
    })
  } catch {
    
  }
  
  
}

function HomeScreen({ navigation }) {
  const openJobDetails = () => navigation.navigate("Details");
  const openAuth = () => navigation.navigate("Authenticate");
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
      <Link href="/authenticate" onPress={openAuth}>
        <Text> Login or Sign up </Text>
      </Link>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
    </View>
  )
}


export default function App<User>(props) {
  const { user } = props
  console.log(user);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailPage} />
        <Stack.Screen name="Authenticate" component={AuthenticationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export async function getServerSideProps() {
  const user = await getUser()
  return {
    props: { user }
  }
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
