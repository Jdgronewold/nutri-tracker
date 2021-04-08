import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from 'firebase'
import { User } from '../state/userState'

export const storeUser = async (user: User) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  } catch (e) {
    // saving error
  }
}

export const getUser = async () => {
  const firebaseUser = firebase.auth().currentUser
  console.log('from utils: ', firebaseUser);
  
  if (!firebaseUser) {
    return null
  }

  try {
    const user = await AsyncStorage.getItem('user')
    if(user !== null) {
      return JSON.parse(user)
    }
    return null
  } catch(e) {
    console.log('Could not retrieve user');
    return null
  }
}