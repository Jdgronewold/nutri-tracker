import React, {  useContext, useRef } from "react";
import firebase from "firebase";
import { Text, Button, TextInput, View, StyleSheet } from 'react-native';
import { storeUser } from "../../utils/userUtils";
import fbDatabase from '../firebase'
import { User, UserContext } from "../../state/userState";
import { loginUser } from "../../actions/userActions";


const handleNewUser = async (user: firebase.User, firstName: string, lastName: string) => {
  await user.updateProfile({displayName: firstName + ' ' + lastName})
  // add more data hereee
  const newUser: User = {
    firstName,
    lastName,
    email: user.email
  }
  await fbDatabase.ref('users/' + user.uid).set(newUser)

  return newUser
}

export default () => {
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { userDispatch } = useContext(UserContext)

  const onPress = () => {
    const email = emailRef.current.value
    const password = passwordRef.current.value

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      handleNewUser(userCredential.user, firstNameRef.current.value, lastNameRef.current.value).then((newUser) => {
        userDispatch(loginUser(newUser))
        storeUser(newUser)
      })
      
    })
    .catch((error) => {
     console.log(error);
    });


  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Create an Account </Text>
      <TextInput
        ref={firstNameRef}
        placeholder={"First Name"}
        style={styles.input}
      />
      <TextInput
        ref={lastNameRef}
        placeholder={"Last Name"}
        style={styles.input}
      />
      <TextInput
        ref={emailRef}
        placeholder={"Username"}
        style={styles.input}
      />
      <TextInput
        ref={passwordRef}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button
        title={"Create Account"}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  title: {
    fontSize: 20
  }
});
