import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../state/userState'

export const storeUser = async (user: User) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  } catch (e) {
    // saving error
  }
}

export const getUser = async (): Promise<User> => {
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