import React, { useEffect, useRef } from "react";
import firebase from "firebase";
import { Button, TextInput, View, StyleSheet } from 'react-native';

export default () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const onPress = () => {
    const email = emailRef.current.value
    const password = passwordRef.current.value

    console.log(email, '   ', password)

  }

  return (
    <View style={styles.container}>
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
        title={"Login"}
        // style={styles.input}
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
});
