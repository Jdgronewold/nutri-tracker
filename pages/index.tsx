// @generated: @expo/next-adapter@2.1.5
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DetailPage from "./details";
import AuthCreate from "./signup";
import AuthLogin from "./login";
import Link from "../components/Link";
import fbDatabase from "../components/firebase";
import { getUser } from "../utils/userUtils";
import firebase from "firebase";
import { UserContext, UserProvider } from "../state/userState";
import { loginUser } from "../actions/userActions";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const openJobDetails = () => navigation.navigate("Details");


  return (
    <View style={styles.container}>
      <Link href="details" onPress={openJobDetails}>
        <Text>Details</Text>
      </Link>
      {/* <Link href="/login" onPress={openAuth}>
        <Text> Login </Text>
      </Link> */}
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
    </View>
  );
}

function NavigationWrapper() {
  const { user, userDispatch } = useContext(UserContext)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const userRef = fbDatabase.ref('user')
    firebase.auth().onAuthStateChanged(user => {
      if (user && isLoading) {
        getUser().then((savedUser) => {
          if (savedUser) {
            userDispatch(loginUser(savedUser))
          }
          setLoading(false)
        })
      }
      else {
        setLoading(false)
      }
    })

    
    
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user ?
          (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Details" component={DetailPage} />
            </>
          ) :
          (
            <>
              <Stack.Screen name="Signup" component={AuthCreate} />
              <Stack.Screen name="Login" component={AuthLogin} />

            </>
          )
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  // useEffect(() => {
  //   const currentUser = firebase.auth().currentUser
  //   const savedUser = getUser()
  //   if (currentUser && savedUser) {
  //     setContext({
  //       ...contextValue,
  //       user: null
  //     })
  //   }
  // }, [])

  return (
    <UserProvider>
      <NavigationWrapper />
    </UserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
